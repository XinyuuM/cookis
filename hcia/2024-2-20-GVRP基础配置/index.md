---
slug: gvrp
title: GVRP基础配置
authors: [jianlang]
tags: [GVRP,实验,交换机,三层交换机]
---



## 实验介绍

### GVRP

GVRP（GARP VLAN Registration Protocol）是一种通信协议，用于在局域网（LAN）中自动注册和管理虚拟局域网（VLAN）的成员关系。

GVRP 是基于 IEEE 802.1Q VLAN 标准的一部分，旨在简化和自动化 VLAN 的配置和管理。它使用了 GARP（Generic Attribute Registration Protocol）作为底层协议，在网络中的交换机之间传输 VLAN 成员关系的信息。

通过 GVRP，交换机可以自动学习和维护 VLAN 成员关系。当设备（如计算机或网络设备）加入或离开特定的 VLAN 时，GVRP 会在网络中的交换机之间传递成员关系的更新信息，从而保持各交换机的 VLAN 成员表的一致性。

<!--truncate-->

**GVRP 的主要功能包括：**

1. VLAN 成员关系的自动学习和维护：当设备加入或离开 VLAN 时，GVRP 会自动更新交换机的 VLAN 成员表。
2. 动态 VLAN 成员关系的传递：GVRP 会在网络中的交换机之间动态传递 VLAN 成员关系的更新信息，以保持各交换机的 VLAN 成员表的同步。
3. VLAN 成员关系的控制：GVRP 允许管理员通过配置交换机的 GVRP 参数来控制哪些 VLAN 的成员关系应该被传递和学习。

需要注意的是，GVRP 只在支持 GVRP 协议的交换机之间进行通信，并且需要在交换机上进行相应的配置。

总之，GVRP 是一种用于自动注册和管理 VLAN 成员关系的协议，通过在交换机之间传递更新信息，保持各交换机的 VLAN 成员表的一致性。

### **GVRP的配置模式**

手工配置的 VLAN 称为静态 VLAN，通过 GVRP 协议创建的VLAN 称为动态VLAN。GVRP有3种注册模式，不同的式对静态VLAN和动态VLAN的处理方式也不同。

Normal模式:允许该接口动态注册、注销VLAN，传播动态VLAN以及静态VLAN信息;

Fixed 模式:禁止该接口动态注册、注销VLAN，只传播静态VLAN 信息。即被设置成为该模式下的Trunk接口，即使允许所有VLAN通过，实际通过的VLAN也只能是手动配置的那部分;

Forbidden模式:禁止该接口动态注册、注销VLAN，不传播任何除VLAN1以外的任何VLAN信息。即被设置成为该模式下的Trunk接口，即使允许所有VLAN通过，实际通过的VLAN 也只能是VLAN 1。

## 实验目的

- 理解GVRP 的应用场景
- 掌握GVRP 的配置
- 理解GVRP 不同注册模式的区别
- 掌握GVRP 配置不同注册模式的方法

## 实验内容

本实验模拟企业网络场景。S1和S4是接入层交换机，分别连接到汇聚层交换机S2和 S3，公司不同部门员工通过接入层交换机连接到网络。现在需要在交换机上划分VLAN隔离不同部门，但考虑到部门较多，且随着发展，网络情况可能会越来越复杂，采用手工配置 VLAN的方式工作量会非常大，而且容易导致配置错误。此时可以通过GVRP的VLAN自动注册功能完成VLAN的配置。

## 实验拓扑

![1](https://static.cocomoe.cn/static/hcialab/2024220/1.webp)

## 实验编址

| 设备 | 接口   | 地址/掩码   | 所属vlan |
| ---- | ------ | ----------- | -------- |
| PC1  | E0/0/1 | 10.1.1.1/24 | VLAN10   |
| PC2  | E0/0/1 | 10.1.1.2/24 | VLAN20   |
| PC3  | E0/0/1 | 10.1.1.3/24 | VLAN10   |
| PC4  | E0/0/1 | 10.1.1.4/24 | VLAN20   |

## 实验配置

### 基本配置

![2](https://static.cocomoe.cn/static/hcialab/2024220/2.webp)

![3](https://static.cocomoe.cn/static/hcialab/2024220/3.webp)

其他主机间互相通信测试和上述相同。

### **配置GVRP单向注册**

在公司的二层网络中，有IT和HR两个不同的部门，需要将它们划分到不同的VLAN中去。如果按照常规配置方法，要手工在所有交换机上都创建相应的VLAN。后续如果有新的部门需要新增VLAN，或者层网络整改，都要随之修改VLAN配置，配置量非常大且易出错，现网络管理员采用GVRP来完成VLAN配置。

将4台交换机之间所互连的接口(连接PC的接口除外)的接口类型都配置为Trunk，并允许所有VLAN通过。

#### S1

```

[S1]interface GigabitEthernet 0/0/1

[S1-GigabitEthernet0/0/1]port link-type trunk

[S1-GigabitEthernet0/0/1]port trunk allow-pass vlan all

```

#### S2 

```

[S2]interface GigabitEthernet 0/0/1

[S2-GigabitEthernet0/0/1]port link-type trunk

[S2-GigabitEthernet0/0/1]port trunk allow-pass vlan all

[S2-GigabitEthernet0/0/1]interface GigabitEthernet 0/0/2

[S2-GigabitEthernet0/0/2]port link-type trunk

[S2-GigabitEthernet0/0/2]port trunk allow-pass vlan all

```

#### S3

```

[S3]interface GigabitEthernet 0/0/1

[S3-GigabitEthernet0/0/1]port link-type trunk

[S3-GigabitEthernet0/0/1]port trunk allow-pass vlan all

[S3-GigabitEthernet0/0/1]interface GigabitEthernet 0/0/2

[S3-GigabitEthernet0/0/2]port link-type trunk

[S3-GigabitEthernet0/0/2]port trunk allow-pass vlan all

```

#### S4

```

[S4]interface GigabitEthernet 0/0/1

[S4-GigabitEthernet0/0/1]port link-type trunk

[S4-GigabitEthernet0/0/1]port trunk allow-pass vlan all
```

在S1 上创建VLAN 10和VLAN20，并把连接PC的接口类型配置为Access，划入到相应的VLAN中。

```

[S1]vlan 10

[S1-Vlan10]vlan 20

[S1-Vlan20]interface Ethernet0/0/1

[S1-Ethernet0/0/1]port link-type access

[S1-Ethernet0/0/1]port default vlan 10

[S1-Ethernet0/0/1]interface Ethernet0/0/2

[S1-Ethernet0/0/2]port link-type access

[S1-Ethernet0/0/2]port default vlan 20
```

在所有交换机上都开启 GVRP 功能，并在所有交换机两两互连的接口下也开启GVRP功能。GVRP注册模式默认为Normal模式。

```
[s1]gvrp

[S1]interface GigabitEthernet 0/0/1

[S1-GigabitEthernet0/0/1]gvrp

```

```

[S2]gvrp

[S2]interface GigabitEthernet 0/0/1

[S2-GigabitEthernet0/0/1]gvrp

[S2-GigabitEthernet0/0/1]interface GigabitEthernet 0/0/2

[S2-GigabitEthernet0/0/2]gvrp

```

```

[S3]gvrp

[S3]interface GigabitEthernet 0/0/1

[S3-GigabitEthernet0/0/1]gvrp

[S3-GigabitEthernet0/0/1]interface GigabitEthernet 0/0/2

[S3-GigabitEthernet0/0/2]gvrp

```

```
[S4]gvrp

[S4]interface GigabitEthernet 0/0/1

[S4-GigabitEthernet0/0/1]gvrp
```

配置完成后，在S2、S3、S4 上使用display vlan命令查看所有VLAN的相关信息。

```
display vlan
```

![4](https://static.cocomoe.cn/static/hcialab/2024220/4.webp)

![5](https://static.cocomoe.cn/static/hcialab/2024220/5.webp)

![6](https://static.cocomoe.cn/static/hcialab/2024220/6.webp)

可以观察到，S2、S3、S4都动态获得了VLAN 10和VLAN 20。但是在S2上只有GE 0/0/2 加入了这两个VLAN，同样在S3上只有GE 0/0/1加入这两个VLAN，在S4上只有GE 0/0/1加入了这两个VLAN。这是因为此时在S2、S3、S4 上只有左侧的端口收到GVRP的注册消息，此时只完成了单向注册。

由于PC-1 与PC-3 同属于I 部门，即VLAN 10 内，现验证它们之间的连通性。

![7](https://static.cocomoe.cn/static/hcialab/2024220/7.webp)

发现无法通信，再次验证了此时只完成了单向注册。

### 配置GVRP双向注册

现需要在S4上也手工创建VLAN 10和VLAN20，把连接PC的接口的模式配置为Access，划入相应VLAN中。

```
<S4>system-view

[S4]vlan 10

[S4-Vlan10]vlan 20

[S4-Vlan20]interface Ethernet0/0/1

[S4-Ethernet0/0/1]port link-type access

[S4-Ethernet0/0/1]port default vlan 10

[S4-Ethernet0/0/1]interface Ethernet0/0/2

[S4-Ethernet0/0/2]port link-type access

[S4-Ethernet0/0/2]port default vlan 20
```

配置完成后，在S2、S3 上再次使用display vlan命令查看。

![8](https://static.cocomoe.cn/static/hcialab/2024220/8.webp)

![9](https://static.cocomoe.cn/static/hcialab/2024220/9.webp)

可以观察到此时两台汇聚交换机的右侧接口也加入了VLAN 10 和VLAN 20。因为从右侧收到了S4的GVRP注册消息，此时完成了双向注册。

在PC-1上验证与PC-3之间的连通性

![10](https://static.cocomoe.cn/static/hcialab/2024220/10.webp)

如果现在公司网络整改，需要添加新的汇聚交换机，或者替换新款设备，或者增删VLAN配置，都可以通过GVRP动态实现自动配置，不再需要手工配置。

### 配置GVRP的Fixed模式

现在S3 的GE 0/0/1接口下将GVRP 的注册模式修改为Fixed 模式。

```
[S3]interface GigabitEthernet 0/0/1

[S3-GigabitEthernet0/0/1]gvrp registration fixed
```

在S3 上使用display vlan 命令查看。

![11](https://static.cocomoe.cn/static/hcialab/2024220/11.webp)

发现在GE 0/0/1 接口已经无法动态学习到VLAN信息，这是由于Fixed 模式下不允许动态VLAN在接口上注册，相应同部门内跨交换机的两台PC就无法通信。

这时的解决办法有两种，一种是在S3上手工创建VLAN10 和VLAN20，另一种是恢复GE 0/0/1接口下GVRP 注册模式为Normal 模式，做相应配置即可。

### 配置GVRP的Forbidden模式

在S2 的GE 0/0/1接口下将GVRP 的注册模式修改为Forbidden 模式。

```

[S2]interface GigabitEthernet 0/0/1

[S2-GigabitEthernet0/0/1]gvrp registration forbidden

```

在S2 上使用display vlan 命令查看

![12](https://static.cocomoe.cn/static/hcialab/2024220/12.webp)

可以观察到此时VLAN 10、VLAN20 中都没有GE 0/0/1 接口加入这是因为GE 0/0/1 接口下注册模式配置成了Forbidden 模式后，将只允许VLAN1通过。可以观察到，所有交换机上的 MST域名都为 huawei，修订版本号都为 1，且VLAN 与实例间的映射关系相同，其中除 VLAN 10 与20之外，其余 VLAN 都属于实例0中。