---
title: 配置Eth-Trunk 链路聚合
slug: eth-trunk
authors: [jianlang,xinyu]
tags: [Eth-Trunk]
---

## 实验介绍

Eth-Trunk（以太网聚合）是一种将多个物理以太网链路（例如，Ethernet 接口）捆绑成一个逻辑链路的技术，以提高链路的带宽和冗余性。通过 Eth-Trunk，多个物理链路可以同时工作，形成一个高带宽的逻辑链路，提供更高的数据传输能力和可靠性。

Eth-Trunk 通过将数据流量在物理链路之间进行分发和负载均衡，以实现链路的聚合。它可以在交换机之间或交换机与服务器之间创建，通常使用一种聚合协议（如 LACP，即链路聚合控制协议）来实现链路的捆绑和管理。

<!--truncate-->

通过 Eth-Trunk，可以实现以下功能：

  1. 增加总带宽：将多个物理链路聚合成一个逻辑链路，增加了可用带宽，提高了数据传输能力。
  2. 负载均衡：在多个物理链路之间均衡分配数据流量，提高了网络的性能和效率。
  3. 冗余备份：当某个物理链路出现故障时，Eth-Trunk 可以自动切换到其他可用链路，提供冗余备份，提高网络的可靠性。

需要注意的是，Eth-Trunk 的配置需要在网络设备（如交换机）上进行，具体的配置方法和命令可能因厂商和设备型号而有所不同。在配置 Eth-Trunk 之前，需要确保网络设备支持该功能，并按照设备的文档和指导进行操作。

**Eth-Trunk 链路聚合的配置模式**

1. 静态链路聚合：静态链路聚合是通过手动配置成员链路来创建 Eth-Trunk。管理员需要明确指定哪些物理链路被绑定到 Eth-Trunk 接口上。静态链路聚合不依赖于任何协议来管理链路的状态，因此它适用于不支持动态链路聚合协议的设备或环境。静态链路聚合的优点是配置简单，不需要额外的协议支持。但缺点是手动配置成员链路，不具备动态监测链路状态和自动恢复故障链路的能力。
2. 动态链路聚合：动态链路聚合使用链路聚合控制协议（Link Aggregation Control Protocol，LACP）来管理 Eth-Trunk 接口的成员链路。LACP 协议允许设备自动检测可用链路，并与对端设备进行通信以协商和管理链路的状态。

动态链路聚合的优点是具备自动检测链路状态、自动恢复故障链路以及动态负载均衡的能力。它能够根据链路的可用性和设备间的协商来动态调整链路的状态和带宽分配。

需要注意的是，具体支持的链路聚合模式可能因厂商和设备型号而有所不同。在进行链路聚合配置时，建议参考设备的文档和指南，或者联系设备厂商以获取更具体的配置信息。

### 实验目的

- 理解使用Eth-Trunk 的应用场景
- 掌握配置Eth-Trunk 链路聚合的方法(手工负载分担模式)
- 掌握配置Eth-Trunk 链路聚合的方法(静态LACP模式)

### 实验内容

本实验模拟企业网络环境。S1和S2为企业核心交换机，PC-1属于A部门终端设备，PC-2属于B部门终端设备。根据企业规划，S1和S2之间线路原由一条光纤线路相连，但出于带宽和冗余角度考虑需要对其进行升级，可使用Eth-Trunk实现此需求。

### 实验拓扑

![](https://static.cocomoe.cn/static/hcialab/2024225/1.webp)

### 实验编址

| 设备 | 接口   | 地址        |
| ---- | ------ | ----------- |
| PC1  | E0/0/1 | 10.0.1.1/24 |
| PC2  | E0/0/1 | 10.0.1.2/24 |

## 实验配置

### 基本配置

![](https://static.cocomoe.cn/static/hcialab/2024225/2.webp)

![](https://static.cocomoe.cn/static/hcialab/2024225/3.webp)

其他主机间互相通信测试和上述相同

### 配置链路聚合（手工负载分担模式）

在`S1`和`S2`上配置链路聚合，创建`Eth-Trunk 1`接口，并指定为手工负载分担模式。

```
[Sl]interface Eth-Trunk 1

[S1-Eth-Trunk1]mode manual load-balance
```

```
[S2]interface Eth-Trunk 1

[S2-Eth-Trunk1]mode manual load-balance
```

将`S1`和`S2`的`GE /0/1` 和`GE 0/0/2` 分别加入到`Eth-Trunk 1`接口。

```
[S1]interface GigabitEthernet 0/0/1

[S1-GigabitEthernet0/0/1]eth-trunk 1

[S1-GigabitEthernet0/0/1]interface GigabitEthernet 0/0/2

[S1-GigabitEthernet0/0/2]eth-trunk 1
```

```
[S2]interface GigabitEthernet 0/0/1

[S2-GigabitEthernet0/0/1]eth-trunk 1

[S2-GigabitEthernet0/0/1]interface GigabitEthernet 0/0/2

[S2-GigabitEthernet0/0/2]eth-trunk 1
```

配置完成后，可以使用`display eth-trunk 1` 命令查看`S1`和`S2`的`Eth-Trunk`接口状态。

```
display eth-trunk 1
```

![](https://static.cocomoe.cn/static/hcialab/2024225/4.webp)

![](https://static.cocomoe.cn/static/hcialab/2024225/5.webp)

可以观察到，`S1`与`S2`的工作模式为`NORMAL`(手工负载分担方式)，`GE0/0/1`与`GE0/0/2`接口已经添加到`Eth-Trunk1`中，并且处于`UP` 状态。

使用`display interface eth-trunk`命令查看`S2`的`Eth-Trunk1`接口信息

```
display interface eth-trunk1
```

![](https://static.cocomoe.cn/static/hcialab/2024225/6.webp)

可以观察到，目前该接口的总带宽是`GE 0/0/1`与`GE0/0/2` 接口带宽之和。



### 配置链路聚合（LACP模式）

在`S1`和`S2`上配置链路聚合，创建`Eth-Trunk 1`接口，并指定为静态`LACP`模式。

```
[S1]interface Eth-Trunk 1

[S1-Eth-Trunk1]mode  lacp-static 
```

```
[S2]interface Eth-Trunk 1

[S2-Eth-Trunk1]mode  lacp-static 
```

:::tip

如果在此处出行报错，请将先前已经加入到Eth-Trunk接口下的物理接口删除。

```
[S1]interface GigabitEthernet [id]

[S1-GigabitEthernet[id]]undo eth-trunk [id]
```

:::

开启`S1`与`S2` 上的`GE 0/0/5` 接口模拟增加了一条新链路。将`S1`和`S2`的`GE /0/1` 和`GE 0/0/2` 和`GE0/0/5`分别加入到`Eth-Trunk 1`接口。

```
[S1]interface GigabitEthernet 0/0/1

[S1-GigabitEthernet0/0/1]eth-trunk 1

[S1-GigabitEthernet0/0/1]interface GigabitEthernet 0/0/2

[S1-GigabitEthernet0/0/2]eth-trunk 1

[S1-GigabitEthernet0/0/2]interface GigabitEthernet 0/0/5

[S1-GigabitEthernet0/0/5]eth-trunk 
```

```
[S2]interface GigabitEthernet 0/0/1

[S2-GigabitEthernet0/0/1]eth-trunk 1

[S2-GigabitEthernet0/0/1]interface GigabitEthernet 0/0/2

[S2-GigabitEthernet0/0/2]eth-trunk 1

[S2-GigabitEthernet0/0/2]interface GigabitEthernet 0/0/5

[S2-GigabitEthernet0/0/5]eth-trunk 1
```

配置完成后，使用`display eth-trunk 1` 命令查看`S1`和`S2`的`Eth-Trunk 1`接口状态。

![](https://static.cocomoe.cn/static/hcialab/2024225/7.webp)

![](https://static.cocomoe.cn/static/hcialab/2024225/8.webp)

可以观察到，3个接口默认都处于活动状态(Selected)。

将`S1`的系统优先级从默认的`32768`改为`100`，使其成为主动端(值越低优先级越高)，并按照主动端设备的接口来选择活动接口。

两端设备选出主动端后，两端都会以主动端的接口优先级来选择活动接口。

两端设备选择了一致的活动接口，活动链路组便可以建立起来，设置这些活动链路以负载分担的方式转发数据。

```
[S1]lacp priority 100
```

配置完成后，查看`S1`的`Eth-Trunk1`接口状态。

![](https://static.cocomoe.cn/static/hcialab/2024225/9.webp)

可以观察到，已经将`S1`的`LACP`系统优先级改为`100`，而`S2`没修改:仍为默认值。

在`S1`上配置活动接口上限阈值为`2`。

```
[S1]interface Eth-Trunk 1

[S1-Eth-Trunk1]max active-linknumber 2
```

在`S1`上配置接口的优先级确定活动链路。

```
[S1]interface GigabitEthernet 0/0/1

[S1-GigabitEthernet0/0/1]lacp priority 100

[S1-GigabitEthernet0/0/1]interface GigabitEthernet 0/0/2

[S1-GigabitEthernet0/0/2]lacp priority 100
```

配置接口的活动优先级将默认的`32768` 改为`100`，目的是使`GE0/0/1`和`GE 0/0/2` 接口成为活动状态。

配置完成后，查看`S1`的`Eth-Trunk1`接口状态。

![](https://static.cocomoe.cn/static/hcialab/2024225/10.webp)

可以观察到，由于将接口的阈值改为2(默认活动接口最大阈值为8)。

该Eth-Trunk接口下将只有两个成员处于活动状态，并且具有负载分担能力。

而GE0/0/5接口已处于不活动状态(Unselect)，该链路作为备份链路。

当活动链路出现故障时，备份链路将会替代故障链路，保持数据传输的可靠性。

将`S1`的`GE 0/0/1`接口关闭，验证Eth-Trunk链路聚合信息。

```
[S1]interface GigabitEthernet 0/0/1

[S1-GigabitEthernet0/0/1]shutdown

[S1-GigabitEthernet0/0/1]display eth-trunk 1
```

![](https://static.cocomoe.cn/static/hcialab/2024225/11.webp)

可以观察到，S1的GE0/0/1接口已经处于不活动状态，而GE0/0/5 接口为活动状态。

如果将S1的 GE 0/0/1 接口开启后，又会恢复为活动状态，GE 0/0/5 则为不活动状态。

至此，完成了整个Eth-Trunk的部署。

## End.
