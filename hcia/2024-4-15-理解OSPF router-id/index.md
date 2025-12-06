---
title: 理解OSPF router-id
slug: hu2gmp0suxo2y6rw
authors: [jianlang,xinyu]
tags: [OSPF]
---



## 实验介绍

**router-id**

一些动态路由协议要求使用 Router-ID 作为路由器的身份标示，如果在启动这些路由协议时没有指定Router-ID，则默认使用路由器全局下的路由管理Router-ID。

Router-ID 选举规则为，如果通过Router-ID命令配置了Router-ID，则按照配置结果设置。在没有配置Router-ID的情况下，如果存在配置了IP地址的Loopback接口，则选择Loopback接口地址中最大的地址作为 Router-ID;如果没有已配置IP 地址的Loopback接口，则从其他接口的IP地址中选择最大的地址作为Router-ID(不考虑接口的Up/Down状态)

当且仅当被选为Router-ID的接口IP地址被删除/修改，才触发重新选择过程，其他情况(例如接口处于DOWN状态;已经选取了一个非Loopback接口地址后又配置了一个Loopback接口地址;配置了一个更大的接口地址等)不触发重新选择的过程。

<!--truncate-->

Router-ID 改变之后，各协议需要通过手工执行reset命令才会重新选取新的Router-ID。

路由器ID可以有以下几种方式确定：

1. 手动配置：管理员可以手动配置路由器ID，通常使用IPv4地址作为路由器ID。在OSPF配置中，可以使用命令 "router-id x.x.x.x" 来指定路由器ID。
2. 默认方式：如果没有手动配置路由器ID，OSPF会自动选择一个路由器ID。通常，路由器ID会根据以下顺序选择：最高的回环接口IP地址，如果没有回环接口，则选择最高的物理接口IP地址。

### 实验目的

- 理解Router-ID 的选举规则
- 掌握OSPF 手动配置Router-ID的方法
- 理解OSPF 中Router-ID 必须唯一的意义

### 实验内容

本实验模拟企业网络环境。

R1为部门A的网关设备，R3为部门B的网关设备，R4为部门C的网关设备，R2为企业核心路由器。

现网络中运行OSPF协议实现全网互通，所有路由器运行在区域0内，网络管理员需要正确配置 Router-ID 以避免产生不必要的问题。

### 实验拓扑

![](https://static.cocomoe.cn/static/hcialab/2024415/1.webp)

### 实验编址

![](https://static.cocomoe.cn/static/hcialab/2024415/table.png)

## 实验配置

### 验证router-id

在进行基本配置之前，在 R1上使用 display route id 命令来查看当前设备上的Router-ID。

```
[R1]display Router ID
Router-ID:0.0.0.0
```

可以观察到，在设备没有配置任何接口时，Router-ID为0.0.0.0。

根据实验编址表，在R1的GE 0/0/1接口上配置IP地址10.0.12.1，GE 0/0/0 接口配置IP地址10.0.1.254，配置环回接口0的地址1.1.1.1。

```
[R1]int g0/0/1
[R1-GigabitEthernet0/0/1]ip addres 10.0.12.1 24
[R1-GigabitEthernet0/0/1]int g0/0/0
[R1-GigabitEthernet0/0/0]ip addres 10.0.1.254 24
[R1-GigabitEthernet0/0/0]int l0
[R1-LoopBack0]ip addres1.1.1.1 32
```

配置完成后，在R1上查看所有接口信息

![](https://static.cocomoe.cn/static/hcialab/2024415/2.webp)

可以观察到，目前所配置的接口及IP地址信息。查看当前设备上的Router-ID。

```
[R1]display Router ID
Router-ID:10.0.12.1
```

可以观察到当前设备上的全局Router-ID为10.0.12.1，而不是环回接口地址1.1.1.1，这是为什么?

原因是接口配置顺序会影响 Router-ID 的选举，因为设备上第一次配置的是物理接口的地址，该动作便会触发Router-D的选举。而此刻，设备上也有且仅有该物理地址，所以该地址便会被 Router-ID 所使用，后续即使再配置了环回接口地址也不会使用。同理，如果第一次配置的是其他物理接口的地址，或者是环回接口的地址，都会被Router-ID所使用。

在R1上删除接口GE 0/0/1的IP地址，并再次查看此时设备的Router-ID。

```
[R1]interface gigabitethernet 0/0/1
[R1-GigabitEthernet0/0/1]undo ip address
[R1]display Router-ID
Router-ID:1.1.1.1
```

可以观察到，当删除当前Router-ID所使用的IP地址时，便会触发重新选举，按照环回接口优先的规则选择使用1.1.1.1作为Router-ID。

采用手动配置的方式强制指定R1的Router-ID为1.1.1.1。

这样配置的优点是，即使该地址现在已经不是R1的任何接口的地址，也可以修改成为Router-ID(删除该环回接口也不会触发重新选举，验证省略)。

```
[R1]Router-ID 1.1.1.1
```

配置完成后，马上会弹出以下信息:

```
Info: Router-ID has been modified, please reset the relative protocols
manually to update the Router-ID
```

该信息表示 Router-ID 已经被修改，请重启相应的路由协议进行更新。

即当前全局配置的Router-ID已经被更新，如果目前设备上已经运行了OSPF协议，需要重置OSPF协议进程或者重启整台路由器才可以使得OSPF协议中的Router-ID也同步更新使用该新的全局Router-ID。

需要使用reset ospf process 命令来重置OSPF 协议进程。

### 基本配置

根据实验编址表进行相应的基本配置，并使用ping命令检测各直连链路的连通性。

```
[R1]int g0/0/0
[R1-GigabitEthernet0/0/0]ip add 10.0.1.254 24
[R1]int g0/0/1
[R1-GigabitEthernet0/0/1]ip add 10.0.12.1 24
[R1]int l 0
[R1-LoopBack0]ip add 1.1.1.1 32

[R2]int g0/0/0
[R2-GigabitEthernet0/0/0]ip add 10.0.12.2 24
[R2]int g0/0/1
[R2-GigabitEthernet0/0/1]ip add 10.0.23.2 24
[R2]int g0/0/2
[R2-GigabitEthernet0/0/2]ip add 10.0.24.2 24
[R2]int l 0
[R2-LoopBack0]ip add 2.2.2.2 32

[R3]int g0/0/0
[R3-GigabitEthernet0/0/0]ip add 10.0.23.3 24
[R3]int g0/0/1
[R3-GigabitEthernet0/0/1]ip add 10.0.2.254 24
[R3]int l 0
[R3-LoopBack0]ip add 3.3.3.3 32

[R4]int g0/0/0
[R4-GigabitEthernet0/0/0]ip add 10.0.24.4 24
[R4]int g0/0/1
[R4-GigabitEthernet0/0/1]ip add 10.0.3.254 24
[R4]int l 0
[R4-LoopBack0]ip add 4.4.4.4 32
```

### 理解OSPF的ruoter-id

在所有路由器上配置OSPF 协议，并都运行在区域0内。使用ospf router-id 命令来配置OSPF协议的私有Router-ID，如果不配置，则默认使用全局下的Router-ID。

注意区分设备全局下的Router-ID和路由协议的Router-ID的概念。如果在路由协议中没有配置 Router-ID，就会默认使用路由器的全局Router-ID。如果配置，则可以和全局Router-ID不一致。

一般建议采用环回接口地址作为路由协议的Router-ID，因为环回接口是逻辑接口，比物理接口更加稳定。在对网络操作时，网络管理员有可能误操作导致物理接口地址删除，或者改动，而环回接口则一般不会去改动。

```
[R1]ospf 1 router-id 1.1.1.1
[R1-ospf-1]area 0
[R1-ospf-1-area-0.0.0.0]network 10.0.12.0 0.0.0.255
[R1-ospf-1-area-0.0.0.0]network 10.0.1.0 0.0.0.255

[R2]ospf 1 router-id 2.2.2.2
[R2-ospf-1]area 0
[R2-ospf-1-area-0.0.0.0]network 10.0.12.0 0.0.0.255
[R2-ospf-1-area-0.0.0.0]network 10.0.23.0 0.0.0.255
[R2-ospf-1-area-0.0.0.0]network 10.0.24.0 0.0.0.255

[R3]ospf 1 router-id 3.3.3.3
[R3-ospf-1]area 0
[R3-ospf-1-area-0.0.0.0]network 10.0.23.0 0.0.0.255
[R3-ospf-1-area-0.0.0.0]network 10.0.2.0 0.0.0.255

[R4]ospf 1 router-id 4.4.4.4
[R4-ospf-1]area 0
[R4-ospf-1-area-0.0.0.0]network 10.0.24.0 0.0.0.255
[R4-ospf-1-area-0.0.0.0]network 10.0.3.0 0.0.0.255
```

配置完成后测试PC-1和PC-2间的连通性。

![](https://static.cocomoe.cn/static/hcialab/2024415/3.webp)

现在修改R2的Router-ID为3.3.3.3，即R3的Router-ID，使R3和R2的Router-ID重叠，并重置协议进程使该配置生效。

```
<R2>ospf 1 router-id 3.3.3.3
<R2>reset ospf process
```

![](https://static.cocomoe.cn/static/hcialab/2024415/4.webp)

可以观察到到R2与R3的邻居关系消失。

此时测试PC-1与PC-2的连通性。

![](https://static.cocomoe.cn/static/hcialab/2024415/5.webp)

网络已经发生故障，无法正常通信。验证了OSPF建立直连邻居关系时，Router-ID一定不能重叠。那么如果OSPF非直连邻居的Router-ID重叠会产生什么现象?

还原R2之前的配置，调整R4的Router-ID为3.3.3.3，与R3重叠。网络已经发生故障，无法正常通信。验证了OSPF建立直连邻居关系时，Router-ID一定不能重叠。那么如果OSPF非直连邻居的Router-ID重叠会产生什么现象?

还原R2之前的配置，调整R4的Router-ID为3.3.3.3，与R3重叠。

```
<R2>ospf 1 router-id 2.2.2.2
<R2>reset ospf process
<R4>ospf 1 router-id 3.3.3.3
<R4>reset ospf process
```

配置完成后，查看R2的OSPF邻居状态。

```
<R2>display ospf peer brief
```

![](https://static.cocomoe.cn/static/hcialab/2024415/6.webp)

发现R2有两个3.3.3.3的邻居，查看R2的路由表。

```
<R2>display ip routing-table protocol ospf
```

![](https://static.cocomoe.cn/static/hcialab/2024415/7.webp)

可以观察到，此时R2没有接收到R3上10.0.2.0/24网段的路由条目即使路由器邻居关系建立正常，但也无法正常获取路由条目。测试PC-1与PC-2间的连通性。

![](https://static.cocomoe.cn/static/hcialab/2024415/8.webp)

通信无法正常进行。这是因为R2认为是同一个OSPF邻居，但是LSA又不一致，造成链路状态数据库发送错误，无法计算出正确的路由信息。

综上所述，OSPF协议的Router-ID务必要在整个路由选择域内保持唯一。

## END