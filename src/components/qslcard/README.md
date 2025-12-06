# QSL卡片查询系统 - 维护文档

## 📋 文档概述

本文档为业余无线电QSL卡片查询系统的维护和使用指南。该系统是一个基于React和Docusaurus构建的卡片式数据展示应用，支持呼号查询、过滤和快速定位功能。

## 🏗️ 系统架构

### 技术栈

- **前端框架**: React 17+
- **UI框架**: Docusaurus v2
- **样式方案**: CSS Modules + Material 3设计规范
- **状态管理**: React Hooks (useState, useEffect)

### 目录结构

text

```
src/
├── components/qslcard/          # QSL组件目录
│   ├── QSLCard.js              # 卡片展示组件
│   ├── QSLList.js              # 列表容器组件
│   ├── SearchBar.js            # 搜索过滤组件
│   ├── index.js                # 组件入口文件
│   └── styles.module.css       # 样式文件
├── data/                       # 数据目录
│   └── qslcards.js            # QSL卡片数据
└── pages/qsl/                  # 页面目录
    └── index.js               # QSL页面入口
```



## 🔧 安装与部署

### 环境要求

- Node.js 16.14+
- npm 8.0+ 或 yarn 1.22+
- Docusaurus 2.4.0+

### 安装步骤

1. 克隆项目或确保在Docusaurus项目中

2. 将组件文件复制到对应目录：

   bash

   ```
   cp -r components/qslcard src/components/
   cp -r data/qslcards.js src/data/
   mkdir -p src/pages/qsl
   cp pages/qsl/index.js src/pages/qsl/
   ```

   

3. 添加页面路由（可选）：
   在 `docusaurus.config.js` 的 `navbar.items` 中添加：

   javascript

   ```
   {
     to: 'qsl',
     label: 'QSL查询',
     position: 'left',
   }
   ```

   

4. 启动开发服务器：

   bash

   ```
   npm start
   ```

   

5. 访问页面：

   text

   ```
   http://localhost:3000/qsl
   ```

   

## 📊 数据管理

### 数据结构

QSL卡片数据采用JSON格式，包含以下字段：

| 字段名         | 类型   | 必填 | 说明          | 示例              |
| :------------- | :----- | :--- | :------------ | :---------------- |
| id             | number | 是   | 唯一标识符    | 1                 |
| callSign       | string | 是   | 对方呼号      | "BH1ABC"          |
| myCallSign     | string | 是   | 我方呼号      | "BG5XYZ"          |
| date           | string | 是   | 联系日期      | "2024-01-15"      |
| time           | string | 是   | 联系时间(UTC) | "14:30"           |
| theirAddress   | string | 是   | 对方地址      | "Beijing, China"  |
| myAddress      | string | 是   | 我方地址      | "Shanghai, China" |
| theirEquipment | string | 是   | 对方设备      | "Yaesu FT-991A"   |
| myEquipment    | string | 是   | 我方设备      | "ICOM IC-7300"    |
| band           | string | 是   | 波段          | "20m"             |
| mode           | string | 是   | 通信模式      | "SSB"             |
| rst            | string | 是   | 信号报告      | "59"              |
| frequency      | string | 是   | 频率          | "14.200 MHz"      |
| comments       | string | 否   | 备注信息      | "Nice signal"     |

### 数据添加示例

在 `src/data/qslcards.js` 中添加新卡片：

javascript

```
{
  id: 6,
  callSign: "EA5XYZ",
  myCallSign: "BG5XYZ",
  date: "2024-02-10",
  time: "19:45",
  theirAddress: "Madrid, Spain",
  myAddress: "Shanghai, China",
  theirEquipment: "Icom IC-7610, Yagi 5el",
  myEquipment: "ICOM IC-7300, GP Antenna",
  band: "10m",
  mode: "FT8",
  rst: "-12",
  frequency: "28.074 MHz",
  comments: "Good digital contact, weak signal"
}
```



### 数据验证

系统不包含内置数据验证，建议：

1. 保持呼号格式一致性（大写字母+数字）
2. 日期使用ISO格式（YYYY-MM-DD）
3. 时间使用24小时制
4. 频率包含单位（MHz/kHz）

## 🎨 样式定制

### 设计系统

系统基于Material 3设计规范，使用Docusaurus主题变量：

css

```
/* 主题变量映射 */
--md-sys-color-primary: var(--ifm-color-primary);
--md-sys-color-primary-container: var(--ifm-color-primary-lightest);
--md-sys-color-on-primary: #ffffff;
--md-sys-color-surface: var(--ifm-background-color);
```



### 自定义样式

1. **修改主题色**：
   在 `docusaurus.config.js` 中修改：

   javascript

   ```
   themeConfig: {
     colorMode: {
       defaultMode: 'light',
     },
     navbar: {
       // ...
     },
   },
   ```

   

2. **调整卡片样式**：
   编辑 `src/components/qslcard/styles.module.css`：

   css

   ```
   /* 修改卡片圆角 */
   .qslCard {
     border-radius: 16px; /* 默认12px */
   }
   
   /* 修改主色调 */
   .qslHeader {
     background: linear-gradient(135deg, #your-color, #your-color-dark);
   }
   ```

   

3. **响应式调整**：
   在媒体查询部分修改断点：

   css

   ```
   @media (max-width: 768px) {
     .qslGrid {
       grid-template-columns: 1fr;
       gap: 1rem;
     }
   }
   ```

   

## 🔍 搜索与过滤功能

### 搜索功能

- **全文搜索**: 支持呼号、地址模糊匹配
- **快速搜索**: 预设呼号一键定位
- **实时过滤**: 输入时即时更新结果

### 过滤选项

1. **模式过滤**: SSB, CW, FT8
2. **波段过滤**: 10m, 15m, 17m, 20m, 40m
3. **组合过滤**: 可同时应用多个过滤条件

### 快速定位

点击快速搜索按钮或直接访问URL锚点：

text

```
http://localhost:3000/qsl#card-BH1ABC
```



## 🚀 性能优化

### 组件优化

1. **React.memo**: 卡片组件使用默认导出，避免不必要的重渲染
2. **useCallback**: 搜索函数使用稳定引用
3. **虚拟滚动**: 数据量大时考虑添加（当前未实现）

### 加载优化

1. **代码分割**: Docusaurus自动处理
2. **图片懒加载**: 如有图片资源可添加
3. **数据分页**: 超过50条数据建议添加分页

### 缓存策略

当前无持久化缓存，每次刷新重新加载数据。

## 🐛 故障排除

### 常见问题

#### 1. 组件导入失败

**症状**: `Module not found: Error: Can't resolve './QSLCard'`

**解决方案**:

bash

```
# 1. 检查文件命名（Windows大小写问题）
dir src\components\qslcard\

# 2. 清理缓存
npm run clear
# 或
rm -rf .docusaurus node_modules/.cache

# 3. 重启服务器
npm start
```



#### 2. 样式不生效

**症状**: CSS类名未应用

**解决方案**:

1. 检查CSS Modules导入：

   javascript

   ```
   import styles from './styles.module.css'; // 正确
   import './styles.module.css'; // 错误
   ```

   

2. 检查类名使用：

   javascript

   ```
   className={styles.qslCard} // 正确
   className="qslCard" // 错误
   ```

   

#### 3. 搜索功能失效

**症状**: 输入搜索词无反应

**解决方案**:

1. 检查数据文件路径
2. 检查过滤函数逻辑
3. 查看浏览器控制台错误

#### 4. 快速定位不滚动

**症状**: 点击快速搜索按钮未跳转

**解决方案**:

1. 检查卡片ID格式：`id="card-BH1ABC"`
2. 确保卡片已渲染
3. 检查JavaScript控制台错误

### 调试方法

#### 浏览器调试

1. 打开开发者工具（F12）
2. 检查Console标签页的错误信息
3. 使用React Developer Tools检查组件状态
4. 网络标签页查看数据加载

#### 代码调试

javascript

```
// 在QSLList.js中添加调试日志
useEffect(() => {
  console.log('当前过滤条件:', filters);
  console.log('过滤后卡片数:', filteredCards.length);
}, [filters, filteredCards]);
```



## 🔄 版本升级

### 从旧版本迁移

如果系统有更新，迁移步骤：

1. **备份数据**：

   bash

   ```
   cp src/data/qslcards.js qslcards-backup.js
   ```

   

2. **更新组件**：

   bash

   ```
   # 备份旧组件
   mv src/components/qslcard qslcard-old
   
   # 复制新组件
   cp -r new-qslcard src/components/qslcard
   
   # 恢复数据
   cp qslcards-backup.js src/data/qslcards.js
   ```

   

3. **测试功能**：

   - 搜索过滤
   - 快速定位
   - 响应式布局

### 兼容性说明

- 支持React 17+
- 支持现代浏览器（Chrome 90+, Firefox 88+, Safari 14+）
- 移动端支持iOS 13+, Android 10+

## 📈 扩展开发

### 添加新字段

1. 在数据文件中添加新字段
2. 更新QSLCard组件显示新字段
3. 更新SearchBar组件支持新字段过滤

示例：添加QSL接收状态字段

javascript

```
// 1. 数据文件
{
  // ... 其他字段
  qslReceived: true,
  qslDate: "2024-02-20"
}

// 2. QSLCard组件中显示
<div className={styles.infoRow}>
  <span className={styles.label}>QSL状态:</span>
  <span className={styles.value}>
    {card.qslReceived ? '已收到' : '未收到'}
  </span>
</div>

// 3. SearchBar中添加过滤
<select value={qslFilter} onChange={handleQSLChange}>
  <option value="all">所有状态</option>
  <option value="received">已收到</option>
  <option value="pending">待接收</option>
</select>
```



### 添加新功能

#### 1. 数据导出

javascript

```
// 添加导出按钮
const handleExport = () => {
  const dataStr = JSON.stringify(qslCardsData, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  const link = document.createElement('a');
  link.setAttribute('href', dataUri);
  link.setAttribute('download', 'qsl-cards.json');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
```



#### 2. 数据导入

javascript

```
// 添加文件上传功能
const handleImport = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const importedData = JSON.parse(e.target.result);
      // 验证并设置数据
    } catch (error) {
      console.error('导入失败:', error);
    }
  };
  reader.readAsText(file);
};
```



#### 3. 分页功能

javascript

```
// 在QSLList中添加分页状态
const [currentPage, setCurrentPage] = useState(1);
const cardsPerPage = 10;

// 计算分页数据
const indexOfLastCard = currentPage * cardsPerPage;
const indexOfFirstCard = indexOfLastCard - cardsPerPage;
const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

// 分页组件
const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
```



### 国际化支持

1. 创建语言文件：

   javascript

   ```
   // i18n/zh-CN/qsl.json
   {
     "title": "QSL卡片查询",
     "searchPlaceholder": "输入呼号搜索...",
     "callSign": "呼号",
     "date": "日期"
   }
   ```

   

2. 在组件中使用：

   javascript

   ```
   import { translate } from '@docusaurus/Translate';
   
   <h2>{translate({id: 'qsl.title'})}</h2>
   ```

   

## 📚 API参考

### 组件Props

#### QSLCard

| Prop | 类型   | 必填 | 说明         |
| :--- | :----- | :--- | :----------- |
| card | object | 是   | 卡片数据对象 |

#### SearchBar

| Prop           | 类型     | 必填 | 说明         |
| :------------- | :------- | :--- | :----------- |
| onSearch       | function | 是   | 搜索回调函数 |
| onFilterChange | function | 是   | 过滤回调函数 |
| totalCards     | number   | 是   | 卡片总数     |

#### QSLList

无外部Props，内部管理所有状态。

### 回调函数签名

javascript

```
// onSearch
(searchTerm: string) => void

// onFilterChange
(filterType: string, value: string) => void
```



## 🛡️ 安全考虑

1. **XSS防护**: React自动转义HTML内容
2. **数据验证**: 客户端数据展示前验证
3. **文件上传**: 如有导入功能，需验证文件类型和大小
4. **敏感信息**: 避免在卡片中存储敏感个人信息

## 🧪 测试建议

### 单元测试

javascript

```
// 示例测试用例
describe('QSLCard Component', () => {
  it('正确显示呼号', () => {
    const card = { callSign: 'BH1ABC', /* 其他字段 */ };
    render(<QSLCard card={card} />);
    expect(screen.getByText('呼号: BH1ABC')).toBeInTheDocument();
  });
});
```



### 集成测试

1. 搜索功能测试
2. 过滤功能测试
3. 快速定位测试
4. 响应式布局测试

### 手动测试清单

- 页面加载正常
- 搜索框输入响应
- 过滤器切换
- 快速搜索按钮
- 移动端适配
- 浏览器兼容性

## 📞 支持与贡献

### 获取帮助

1. 查看本文档故障排除部分
2. 检查GitHub Issues
3. 联系维护团队

### 提交问题

提供以下信息：

1. Docusaurus版本
2. 浏览器版本
3. 错误截图
4. 复现步骤

### 贡献指南

1. Fork仓库
2. 创建功能分支
3. 提交代码变更
4. 创建Pull Request
5. 等待代码审查

## 📅 维护日志

### 版本记录

- **v1.0.0** (2024-01-15): 初始版本发布
  - 基础QSL卡片展示
  - 搜索过滤功能
  - Material 3设计
- **v1.1.0** (计划中):
  - 数据导入导出
  - 分页功能
  - 主题切换

### 已知问题

1. 大量数据时性能下降（建议添加虚拟滚动）
2. 移动端小屏幕显示优化
3. 离线支持（PWA功能）