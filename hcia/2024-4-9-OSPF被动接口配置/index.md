---
title: OSPF被动接口配置
slug: tc9berlqph998yhg
authors: [jianlang,xinyu]
tags: [OSPF]
---



## 实验介绍

### OSPF被动接口

OSPF 被动接口的主要作用是减少网络中的 OSPF 消息洪泛，提高网络的性能和稳定性。具体来说，OSPF 被动接口的作用有以下几点：

1. 节省带宽：OSPF 被动接口不发送任何 OSPF 消息，只接收其他路由器发送的 OSPF 消息。这样可以避免在被动接口上发送大量的 OSPF 更新，节省了带宽资源。
2. 减少 CPU 消耗：被动接口不需要处理和生成 OSPF 消息，因此可以减轻路由器的 CPU 负载，使其可以更好地处理其他重要的任务。
3. 提高网络稳定性：通过减少洪泛的 OSPF 消息，可以减少网络中的拓扑变化通告，从而降低网络中的震荡和不稳定性。

OSPF 被动接口也称抑制接口，成为被动接口后，将不会接收和发送 OSPF 报文。

<!--truncate-->

其作用是优化网络性能、降低网络负载，并提高网络的稳定性和可靠性。

如果要使 OSPF 路由信息不被某一网络中的路由器获得且使本地路由器不接收网络中其他路由器发布的路由更新信息，即已运行在 OSPF 协议进程中的接口不与本链路上其余路由器建立邻居关系时，可通过配置被动接口来禁止此接口接收和发送 OSPF 报文。

### 实验目标

- 理解OSPF 被动接口的应用场景
- 掌握OSPF 被动接口的配置方法
- 理解OSPF 被动接口的作用原理

### 实验内容

本实验模拟企业网络场景。有路由器R1、R2、R4与R5分属不同部门的网关设备，每台设备都连接着各部门的员工终端，公司整网运行OSPF协议，并都处于区域0中。

员工终端上经常收到路由器发送的OSPF数据报文，而该报文对终端而言毫无用处，还占用了一定的链路带宽资源，并有可能引起安全风险，比如非法接入路由器做路由欺骗。实现通告配置被动接口来实现阻隔OSPF报文，优化公司网络。

### 实验拓扑

![](https://static.cocomoe.cn/static/hcialab/2024409/1.webp)

### 实验编址

![](https://static.cocomoe.cn/static/hcialab/2024409/table.png)

## 实验配置

### 基本配置

**根据实验编址表进行相应的基本配置，并使用ping命令检测各直连链路的连通性。**

```
[r1]int g0/0/0
[r1-GigabitEthernet0/0/0]ip add 10.0.3.254 24
[r1]int g0/0/1
[r1-GigabitEthernet0/0/1]ip add 10.0.13.1 24

[r2]int g0/0/0
[r2-GigabitEthernet0/0/0]ip add 10.0.23.2 24
[r2]int g0/0/1
[r2-GigabitEthernet0/0/1]ip add 10.0.4.254 24

[r3]int g0/0/0
[r3-GigabitEthernet0/0/0]ip add 10.0.13.3 24
[r3]int g0/0/1
[r3-GigabitEthernet0/0/1]ip add 10.0.23.3 24
[r3]int g0/0/2
[r3-GigabitEthernet0/0/2]ip add 10.0.30.3 24

[r4]int g0/0/0
[r4-GigabitEthernet0/0/0]ip add 10.0.30.4 24
[r4]int g0/0/1
[r4-GigabitEthernet0/0/1]ip add 10.0.1.254 24

[r5]int g0/0/0
[r5-GigabitEthernet0/0/0]ip add 10.0.30.5 24
[r5]int g0/0/1
[r5-GigabitEthernet0/0/1]ip add 10.0.2.254 24
```

测试联通性

![](https://static.cocomoe.cn/static/hcialab/2024409/2.webp)

### 搭建OSPF网络

```

[r1]ospf 1
[r1-ospf-1]area 0
[r1-ospf-1-area-0.0.0.0]network 10.0.13.0 0.0.0.255
[r1-ospf-1-area-0.0.0.0]network 10.0.3.0 0.0.0.255

[r2]ospf 1
[r2-ospf-1]area 0
[r2-ospf-1-area-0.0.0.0]network 10.0.4.0 0.0.0.255
[r2-ospf-1-area-0.0.0.0]network 10.0.23.0 0.0.0.255

[r3]ospf 1
[r3-ospf-1]area 0
[r3-ospf-1-area-0.0.0.0]network 10.0.13.0 0.0.0.255
[r3-ospf-1-area-0.0.0.0]network 10.0.23.0 0.0.0.255
[r3-ospf-1-area-0.0.0.0]network 10.0.30.0 0.0.0.255

[r4]ospf 1
[r4-ospf-1]area 0
[r4-ospf-1-area-0.0.0.0]network 10.0.30.0 0.0.0.255
[r4-ospf-1-area-0.0.0.0]network 10.0.1.0 0.0.0.255

[r5]ospf 1
[r5-ospf-1]area 0
[r5-ospf-1-area-0.0.0.0]network 10.0.30.0 0.0.0.255
[r5-ospf-1-area-0.0.0.0]network 10.0.2.0 0.0.0.255
```

![](https://static.cocomoe.cn/static/hcialab/2024409/3.webp)

通信正常建立。

### 配置被动端口

现在网络管理员通过配置被动接口来优化连接终端的网络，使终端不再收到任何OSPF报文。

在r4的OSPF进程中，使用silent-interface命令禁止接口接收和发送OSPF报文。

```
[r4]ospf 1
[r4-ospf-1]silent-interface GigabitEthernet 0/0/1
```

如果r4 上有多个接口需要设置为被动接口，只有GE 0/0/1接口保持活动状态，可以通过以下命令简化配置。

```

[r4]ospf 1
[r4-ospf-1]silent-interface all
[r4-ospf-1]undo silent-interface GigabitEthernet 0/0/1
```

这两种方法都可以将GE 0/0/1 接口设置为被动接口，区别在于第一种方法只是单独对某一个接口进行被动操作;

而第二种是在对所有接口配置为被动接口后，再排除不需要配置为被动接口的接口。

同样在其他部门的网关路由器上进行相应配置，使得所有部门的终端都不再收到无关的OSPF报文。

```
[r1]ospf 1
[r1-0spf-1]silent-interface GigabitEthernet 0/0/0
[r2]ospf 1
[r2-ospf-1]silent-interface GigabitEthernet 0/0/1
[r5]ospf 1
[r5-ospf-1]silent-interface GigabitEthernet 0/0/1
```

### 验证被动端口

配置被动接口，该接口会禁止接收和发送OSPF报文，故假使在两台路由器间OSPF链路的接口上也做该配置，会导致OSPF邻居的无法建立。

以r5 为例，将其GE 0/0/0 接口配置为被动接口。

```
[r5]ospf 1
[r5-ospf-1]silent-interface GigabitEthernet 0/0/0
```

配置完成后，查看R5的OSPF邻居关系状态。

```
<r5>display ospf peer
```

可以观察到，此时r5的OSPF邻居全部消失。

![](https://static.cocomoe.cn/static/hcialab/2024409/4.webp)

查看r5上的OSPF路由条目。

```
<r5>display ip routing-table protocol ospf
```

可以观察到，所有的 OSPF 路由条目都丢失。

即验证了配置了被动接口后，OSPF报文不再转发，包括建立邻居和维护邻居的Hello报文。

## END.