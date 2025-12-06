---
title: 配置OSPF认证
slug: pvmh27ucn2aw6265
authors: [jianlang]
tags: [OSPF]
---

## 实验介绍
**OSPF协议认证**

OSPF（Open Shortest Path First）协议支持基于认证的安全机制，用于确保 OSPF 消息的完整性和可信性。OSPF 认证可以防止未经授权的路由器加入 OSPF 域或篡改 OSPF 消息，提高网络的安全性。下面是 OSPF 认证的几个关键点：

认证类型：OSPF 支持明文认证和加密认证两种类型。

明文认证：在明文认证中，可以使用简单密码或密钥来进行认证。当路由器之间交换 OSPF 消息时，会使用明文密码进行验证。

加密认证：加密认证使用密钥对 OSPF 消息进行加密和解密。这样可以更好地保护认证信息的安全性。

认证域（Authentication Domain）：认证域是指在 OSPF 域中应用认证的范围。认证域可以是整个自治系统（AS）或特定的区域（Area）。

认证密钥：认证密钥是用于进行认证的密码或密钥。每个 OSPF 路由器在进行认证时需要使用相同的密钥。

认证配置：在 OSPF 配置中，需要指定认证类型和认证密钥。认证配置可以应用于整个自治系统或特定的区域。

需要注意的是，为了使 OSPF 认证生效，所有参与 OSPF 的路由器都必须配置相同的认证类型和密钥。如果认证配置不一致，可能会导致路由器无法建立邻居关系或交换 OSPF 消息。

OSPF 认证提供了一定程度的网络安全，但并不是完全安全的。为了确保网络的安全性，还应考虑其他安全机制，如访问控制列表（ACL）、身份认证协议等。

<!--truncate-->

### 实验目的

- 理解OSPF 认证的应用场景
- 理解OSPF 区域认证和链路认证的区别
- 掌握配置OSPF 区域认证的方法
- 掌握配置OSPF 链路认证的方法
### 实验内容
本实验模拟企业网络环境。R3、R5、R6属于公司总部骨干区域路由器，R2为ABR。公司分部路由器R1和R4都属于区域1，但分属不通部门，R1作为市场部门网关，R4作为财务部门网关。网络管理员在区域0和区域1上配置OSPF区域认证，其中区域0开启密文认证，区域1开启明文认证。为进一步提高该OSPF网络安全性，R2和R4上单独设置密钥，配置OSPF链路认证。
### 实验拓扑
![](https://static.cocomoe.cn/static/hcialab/2024403/1.webp)
<a name="Db3Oa"></a>

###  实验编址

![table](table.png)

## 实验配置
```bash
[r1]int g0/0/0
[r1-GigabitEthernet0/0/0]ip add 10.0.12.1 24
[r1]int l 0
[r1-LoopBack0]ip add 1.1.1.1 32

[r2]int g0/0/0
[r2-GigabitEthernet0/0/0]ip add 10.0.12.2 24
[r2]int g0/0/1
[r2-GigabitEthernet0/0/1]ip add 10.0.24.2 24
[r2]int g0/0/2
[r2-GigabitEthernet0/0/1]ip add 10.0.23.2 24
[r2]int l 0
[r2-LoopBack0]ip add 2.2.2.2 32

[r3]int g0/0/0
[r3-GigabitEthernet0/0/0]ip add 10.0.35.3 24
[r3]int g0/0/1
[r3-GigabitEthernet0/0/1]ip add 10.0.36.3 24
[r3]int g0/0/2
[r3-GigabitEthernet0/0/2]ip add 10.0.23.3 24
[r3]int l 0
[r3-LoopBack0]ip add 3.3.3.3 32

[r4]int g0/0/0
[r4-GigabitEthernet0/0/0]ip add 10.0.24.4 24
[r4]int l 0
[r4-LoopBack0]ip add 4.4.4.4 32

[r5]int g0/0/0
[r5-GigabitEthernet0/0/0]ip add 10.0.35.5 24
[r5]int l 0
[r5-LoopBack0]ip add 5.5.5.5 32

[r6]int g0/0/0
[r6-GigabitEthernet0/0/0]ip add 10.0.36.6 24
[r6]int l 0
[r6-LoopBack0]ip add 6.6.6.6 32
```

### **配置OSPF网络**

### **配置公司分部OSPF区域明文认证**
网络管理员在公司分部的OSPF区域1中配置区域明文认证。在R1上OSPF的区域1视图下使用authentication-mode命令指定该区域使用认证模式为simple，即简单验证模式，配置口令为huawei1，并配置plain参数。

配置 plain 参数后，可以使得在查看配置文件时，口令均以明文方式显示。如果不设置该参数的话，在查看配置文件时，默认会以密文方式显示口令，即无法查看到所配置的口令原文，这可以使非管理员用户在登录设备后无法查看到口令原文，从而提高安全性

```
[r1-ospf-1-area-0.0.0,1]authentication-mode simple huawei1
```
配置完成，等待OSPF网络收敛之后，查看R1与R2的OSPF邻居。

![](https://static.cocomoe.cn/static/hcialab/2024403/2.webp)

可以观察到，现在R1与R2邻居关系中断了，原因是目前仅仅在R1上配置了认证，导致R1和R2间的OSPF认证不匹配。继续配置该区域的另一台设备R2，必须要保证验证模式一致，口令也一致。配置完成后，等待一段时间，再次观察两者的邻居关系。

```
[r2]ospf 1
[r2-ospf-1]area 1
[r2-0spf-1-area-0.0.0.1]authentication-mode simple huawei1
```
![](https://static.cocomoe.cn/static/hcialab/2024403/3.webp)

可以观察到，现在R1与R2的邻居关系状态恢复正常。

同理在R4上也做相同配置。
```bash
[r4]ospf 1
[r4-ospf-1]area 1
[r4-0spf-1-area-0.0.0.1]authentication-mode simple huawei1
```
配置完成后，在R2上查看OSPF邻居关系。

![](https://static.cocomoe.cn/static/hcialab/2024403/4.webp)

可以观察到，现在区域1中的邻居关系都建立正常。

### **配置公司总部OSPF区域密文认证**
根据设计，网络管理员在公司总部OSPF区域0中配置区域密文认证。


在R2上配置OSPF Area0区域认证，使用验证模式为md5，即MD5 验证模式，验证字标识符为1，配置口令为huawei3。

```
[r2]ospf 1
[r2-ospf-1]area 0
[r2-ospf-1-area-0.0.0.0]authentication-mode md5 1 huawei3
```
继续在其他骨干路由器上做相同配置。注意，密文认证必须保证验证字标识符和口令完全一致认证才可以通过。

```
[r3]ospf 1
[r3-ospf-1]area 0
[r3-ospf-1-area-0.0.0.0]authentication-mode md5 1 huawei3

[r5]ospf 1
[r5-ospf-1]area 0
[r5-ospf-1-area-0.0.0.0]authentication-mode md5 1 huawei3

[r6]ospf 1
[r6-ospf-1]area 0
[r6-ospf-1-area-0.0.0.0]authentication-mode md5 1 huawei3
```
![](https://static.cocomoe.cn/static/hcialab/2024403/5.webp)

可以观察到，OSPF邻居状态建立正常，其他设备上的查看过程省略

### **配置OSPF链路认证**
在上面两个步骤中，使用了OSPF的区域认证方式配置了OSPF认证，使用链路认证方式配置可以达到同样的效果。如果采用链路认证的方式，就需要在同一0SPF的链路接口下都配置链路认证的命令，设置验证模式和口令等参数;而采用区域认证的方式时，在同一区域中，仅需在OSPF进程下的相应区域视图下配置一条命令来设置验证模式和口令即可，大大节省了配置量，所以在同一区域中如果有多台OSPF设备需要配置认证，建议选用区域认证的方式进行配置。

目前公司分部的 OSPF 区域中配置了简单模式的区域认证，为了进一步提升 R2 与R4 之间的 OSPF 网络安全性，网络管理员需要在两台设备之间部署 MD5 验证模式的OSPF链路认证。

在R2的GE 0/0/1 接口下使用ospf authentication-mode 命令配置链路认证，配置使用MD5验证模式，验证字标识符为1，口令为huawei5。

```
[r2]interface GigabitEthernet 0/0/1
[r2-GigabitEthernet0/0/1]ospf authentication-mode md5 1 huawei5
```
![](https://static.cocomoe.cn/static/hcialab/2024403/6.webp)

发现R2与R4间的OSPF邻居关系已经消失。虽然已经配置好区域认证，但是如果同时配置了接口认证和区域认证时，会优先使用接口验证建立 OSPF 邻居。所以 R4在没有配置链路认证之前，R2与R4的邻居关系会因认证不匹配而无法建立。

同样在R4上配置链路，注意，验证模式、标识符、口令都需要保持一致。

```
[r4]interface GigabitEthernet 0/0/0
[r4-GigabitEthernet0/0/1]ospf authentication-mode md5 1 huawei5
```
配置完成后，等待一段时间，再次查看R4的OSPF邻居信息。

![](https://static.cocomoe.cn/static/hcialab/2024403/7.webp)

可以观察到，邻居关系已经恢复正常。至此，OSPF链路认证配置完成。
