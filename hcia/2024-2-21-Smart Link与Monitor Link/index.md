---
title: Smart Link与Monitor Link
slug: smart-link-and-monitor-link
authors: [jianlang]
tags: [Monitor Link,Smart Link]
---

## 实验介绍

**Smart Link与Monitor Link**

Smart Link（智能链路）和 Monitor Link（监视链路）是网络中常见的两种链路冗余技术，用于提高网络的可靠性和冗余性。

1. Smart Link（智能链路）：Smart Link 是一种链路冗余技术，通过在网络设备之间建立备用链路，以实现故障时的快速切换和恢复。在 Smart Link 中，设备会通过心跳包或链路状态检测来监测主链路的可用性。当主链路发生故障或不可用时，备用链路会立即接管数据流量，实现对网络服务的无感知切换，以确保网络的连通性和稳定性。

   

2. Monitor Link（监视链路）：Monitor Link 是一种链路监测技术，用于监视特定链路的状态和性能。它通常用于监测和收集链路的带宽利用率、延迟、丢包率等性能指标。通过监视链路，网络管理员可以及时了解链路的运行情况，并根据监测结果做出相应的优化和决策，以提高网络的性能和可靠性。

需要注意的是，Smart Link 和 Monitor Link 是不同的概念，用途和实现方式也不同。Smart Link 主要用于链路冗余和故障切换，以提高网络的可靠性；而 Monitor Link 主要用于链路状态监测和性能监测，以优化网络的性能和运行状况。

总之，Smart Link 和 Monitor Link 是两种常见的网络链路技术，用于提高网络的可靠性和性能。Smart Link 实现链路冗余和快速故障切换，而 Monitor Link 实现链路状态和性能的监测。

<!--truncate-->

### 实验目的

- 理解Smart Link 的应用场景
- 掌握Smant Link 组的基本配置
- 掌握Smart Link 回切功能的配置
- 掌握Monitor Link 的基本配置

### 实验内容

本实验模拟公司网络场景。交换机S4作为公司出口设备连接外网:交换机S1是接入层交换机，负责员工终端接入，接入交换机通过两台交换机S2和S3双上行连接到S4。针对此双上行组网，为了实现主备链路冗余备份及故障后的快速迁移，部署使用 Smart Link 技术，且为了进一步扩展Smart Link 的备份范围，使用Monitor Link联动方式监控上游设备的上行链路来完善Smart Link。

### 实验拓扑

![1](https://static.cocomoe.cn/static/hcialab/2024221/1.webp)

## 实验配置

### 配置Smart Link

公司接入层交换机S1通过S2和S3双上行链路连接到出口交换机S4,为了实现主备链路冗余备份及快速迁移，需要在S1上配置SmartLinke

在S1 上创建Smart Link 组1，并开启Smart Link 组功能。

```
[S1]smart-link group 1

[S1-smlk-group1]smart-link enable
```

配置Smart Link 时，需要在相关运行Smart Link 的接口下关闭生成树协议。由于华为交换机默认开启了生成树协议，因此需要关闭S1交换机上E0/0/3 和E 0/0/4 接口下的生成树协议。

```
[S1]interface Ethernet 0/0/3

[S1-Ethemet0/0/3]stp disable

[S1-Ethernet0/0/3]interface Etheret 0/0/4

[S1-Ethernet0/0/4]stp disable
```

注意，如果相应接口下生成树协议未关闭，在配置SmantLink 组功能时会报错，将会出现提示信息。

STP进入到Smart Link 组1下，配置E0/0/3 为主接口，E0/0/4为备份接口。

```
[S1]smart-link group 1

[S1-smlk-group1]port Ethemet 0/0/3 master

[S1-smlk-group1]port Ethemet 0/0/4 slave
```

配置完成后，使用display smart-link group1命令查看主备状态。

```
[S1]display smart-link group 1
```

![2](https://static.cocomoe.cn/static/hcialab/2024221/2.webp)

可以观察到，S1交换机的E0/0/3为主接口，且状态为Active;E0/0/4 为备份接口，状态为Inactive。

### 配置回切功能

当S1 上主接口E0/0/3 出现故障关闭时，备份接口会立刻切换为Active状态。并且默认情况下，当原主接口恢复时，主接口不会自动回切到Active状态，需要手工配置回切功能。

将S2 交换机E0/0/3 接口关闭，模拟故障发生，在S1上观察SmartLink 组1的主备状态。

```
[S2]interface Ethernet 0/0/3

[S2-Ethernet0/0/3]shutdown

[S1]display smart-link group 1
```

![3](https://static.cocomoe.cn/static/hcialab/2024221/3.webp)

可以观察到，接口的状态没有发生变化，E0/0/3 接口仍然处于Inactive 状态，并没有抢占原来的Active状态。即当主链路出现故障后会自动切换到备份链路;而当原主链路故障恢复后，为了保持网络稳定，它将维持在阻塞状态，不进行抢占。如果需要原主链路恢复为Active 状态，可以通过配置Smant Link 组回切功能，在回切定时器超时后会自动切换到主链路。

在S1 上使用restore enable 命令开启回切功能，并将回切时间设置为30s(默认为60s)

```
[S1]smart-link group 1

[S1-smlk-group1]restore enable

[S1-smlk-group1]timer wtr 30
```

再次在S1上观察SmartLink 组1的主备状态。

![4](https://static.cocomoe.cn/static/hcialab/2024221/4.webp)

可以观察到，S1的E 0/0/3 接口状态又重新恢复到Active 状态，而E0/0/4 接口回到了Inactive状态。

### 配置Monitor Link

正常情况下，S1与S2之间的链路为主链路，但是当S2 的上行接口GE 0/0/1 故障时，Smart Link 无法感知故障，不会发生切换，导致网络中断。为了解决这一问题，需要在S2上配置Monitor Link 监控上行接口，当GE 0/0/1 故障时，使S1 的Smart Link 组切换。

为了模拟该场景，现将S2的GE O/0/1接口关闭，并查看Smart Link组1的主备状态

```
[S2]interface GigabitEthernet 0/0/1

[S2-GigabitEthernet0/0/1]shutdown

[S1]display smart-link group 1
```

![5](https://static.cocomoe.cn/static/hcialab/2024221/5.webp)

可以观察到，当S2 的上行GE 0/0/1接口出现故障以后，连接到下行链路的S1 交换机无法感知到该故障，导致S1交换机的 Smart Link 无法进行切换，这样会导致连接到S1交换机仍然选择E0/0/3 接口转发数据，无法正常通信。

在S2 上启用Monitor Link 组1，配置上行接口为GE0/0/1，下行接口为E 0/0/3。

```
[S2]monitor-link group 1

[S2-mtlk-group1]port GigabitEthemet 0/0/1 uplink

[S2-mtlk-group1]port Ethernet 0/0/3 downlink
```

配置完成后，再次查看S1的Smart Link组1的主备状态。

```
[S1]display smart-link group 1
```

![6](https://static.cocomoe.cn/static/hcialab/2024221/6.webp)

观察发现E 0/0/3 接口状态已经变为Inactive，E0/0/4接口状态成为了Active，流量已经被切换到E 0/0/4接口，保证了用户流量的正常转发。

修改Monitor Link组的回切时间为10秒(默认为3s)。当S2的上行接口GE 0/0/1重新恢复以后，下行链路SmartLink 组将在时间到期后重新回切到主链路。

```
[S2-mtlk-group1]timer recover-time 10
```

重新开启S2 的GE 0/0/1 接口。

```
[S2]interface GigabitEthernet 0/0/1

[S2-GigabitEtheret0/0/1]undo shutdown
```

等待40s 左右(加上步骤2中配置的Smart Link回切时间)，查看S1的Smart Link组1的主备状态。

```
[S1]display smart-link group 1
```

![7](https://static.cocomoe.cn/static/hcialab/2024221/7.webp)

可以观察到，此时S1的E0/0/3 接口重新恢复到了Active 状态。

## End.
