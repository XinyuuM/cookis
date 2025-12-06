# 📚 Docusaurus卡片组件使用与维护指南

本文档详细介绍了项目中使用的Material 3风格卡片组件的使用方法、维护指南和自定义配置。

## 📋 目录

1. 组件概述
2. 快速开始
3. 数据管理
4. 组件使用
5. 样式定制
6. 图标系统
7. 维护指南
8. 故障排除

## 🎯 组件概述

本卡片组件系统是一个基于Material 3设计语言的响应式卡片组件，具有以下特点：

### 核心功能

- ✅ **卡片式布局**：Material 3设计风格，支持悬停效果
- ✅ **搜索过滤**：实时搜索过滤卡片内容
- ✅ **响应式设计**：适配桌面、平板和手机
- ✅ **主题适配**：自动适配Docusaurus的亮色/暗色主题
- ✅ **复用性强**：可在不同页面复用，显示不同数据
- ✅ **图标系统**：使用React Icons的智能图标系统

### 技术栈

- **框架**：React + Docusaurus
- **样式**：CSS Modules + Material 3设计规范
- **图标**：React Icons (FontAwesome)
- **状态管理**：React Hooks (useState, useMemo)

## 🚀 快速开始

### 1. 安装依赖

确保已安装必要的包：

bash

```
npm install react-icons
# 或
yarn add react-icons
```



### 2. 项目结构

text

```
src/
├── components/
│   └── markcard/
│       ├── index.js           # 导出所有组件
│       ├── MarkCard.js        # 单个卡片组件
│       ├── MarkCardGrid.js    # 卡片网格组件（含搜索）
│       ├── IconMapper.js      # 图标映射系统
│       └── styles.module.css  # 组件样式
└── data/
    └── markcard-data.js       # 卡片数据
```



## 📊 数据管理

### 基本数据结构

每张卡片至少需要以下字段：

javascript

```
{
  id: 1,                       // 唯一标识（必填）
  title: "卡片标题",           // 卡片标题（必填）
  link: "/path/to/page",       // 链接地址（必填）
  description: "卡片描述",     // 可选：卡片描述
  iconType: "react",           // 可选：图标类型
  tags: ["react", "前端"]      // 可选：标签（用于搜索）
}
```



### 预定义数据集合

`src/data/markcard-data.js` 中预定义了两组数据：

javascript

```
// 视频教程卡片
const videoCards = [
  { id: 1, title: "React入门教程", link: "/docs/react-intro", iconType: "react" },
  // ... 更多卡片
];

// 音乐教程卡片
const musicCards = [
  { id: 1, title: "钢琴基础教程", link: "/music/piano-basics", iconType: "music" },
  // ... 更多卡片
];

export const cardData = {
  video: videoCards,
  music: musicCards,
  // 可以继续添加更多类型
};
```



### 添加新的数据集合

1. 在 `markcard-data.js` 中添加新数组：

javascript

```
const bookCards = [
  { id: 1, title: "JavaScript权威指南", link: "/books/js-guide", iconType: "javascript" },
  { id: 2, title: "CSS揭秘", link: "/books/css-secrets", iconType: "css" },
];

// 添加到导出对象
export const cardData = {
  video: videoCards,
  music: musicCards,
  books: bookCards,  // 新增
};
```



## 🎨 组件使用

### 基本用法

jsx

```
import React from 'react';
import { MarkCardGrid } from '@site/src/components/markcard';
import { cardData } from '@site/src/data/markcard-data';

function VideoPage() {
  return (
    <div>
      <h1>视频教程</h1>
      <MarkCardGrid 
        cards={cardData.video}
        title="视频教程"
      />
    </div>
  );
}
```



### 自定义数据

jsx

```
import React from 'react';
import { MarkCardGrid } from '@site/src/components/markcard';

function CustomPage() {
  const customCards = [
    {
      id: 1,
      title: "我的教程",
      link: "/my-tutorial",
      description: "这是一个自定义教程",
      iconType: "education",
      tags: ["教程", "学习"]
    },
    // ... 更多自定义卡片
  ];

  return (
    <MarkCardGrid 
      cards={customCards}
      title="我的卡片集"
      searchPlaceholder="搜索我的内容..."
      emptyMessage="暂无内容"
    />
  );
}
```



### 高级配置选项

jsx

```
<MarkCardGrid 
  cards={data}
  title="资源卡片"                    // 可选：标题
  emptyMessage="暂无数据"            // 可选：空状态消息
  searchPlaceholder="搜索卡片..."    // 可选：搜索框占位符
  showSearch={true}                  // 可选：是否显示搜索框（默认true）
  gridClassName="custom-grid"        // 可选：自定义网格类名
  cardClassName="custom-card"        // 可选：自定义卡片类名
/>
```



### 单个卡片使用

jsx

```
import { MarkCard } from '@site/src/components/markcard';

function SingleCardDemo() {
  return (
    <MarkCard 
      title="单独卡片"
      link="/docs/single"
      iconType="star"
      description="这是一个单独的卡片示例"
    />
  );
}
```



## 🎨 样式定制

### 修改主题颜色

在 `styles.module.css` 中修改CSS变量：

css

```
:root {
  /* 主色调 - 修改这些变量改变主题 */
  --md-sys-color-primary: var(--ifm-color-primary); /* 使用Docusaurus主题色 */
  --md-sys-color-primary-container: #E8DEF8;        /* 图标背景色 */
  --md-sys-color-on-primary: #FFFFFF;               /* 悬停时图标颜色 */
}

[data-theme='dark'] {
  /* 暗色模式颜色 */
  --md-sys-color-primary-container: #4A4458;
  --md-sys-color-on-primary: #381E72;
}
```



### 自定义卡片样式

1. **修改卡片圆角**：

css

```
.markCard {
  border-radius: 20px; /* 默认16px */
}
```



1. **修改阴影效果**：

css

```
.markCard:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2); /* 增强阴影 */
}
```



1. **修改动画速度**：

css

```
.markCard {
  transition: all 0.5s ease; /* 默认0.3s */
}
```



### 响应式断点

组件的响应式断点：

- `768px`：平板设备，网格变为2列
- `480px`：手机设备，网格变为1列

要修改断点，更新以下CSS：

css

```
@media (max-width: 768px) {
  .cardsGrid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (max-width: 480px) {
  .cardsGrid {
    grid-template-columns: 1fr;
  }
}
```



## 🎯 图标系统

### 内置图标类型

系统内置了多种图标类型，根据关键词自动匹配：

| 图标类型     | 对应关键词           | 示例图标            |
| :----------- | :------------------- | :------------------ |
| `react`      | react, 前端, ui      | <FaReact />         |
| `javascript` | javascript, js, 脚本 | <FaJsSquare />      |
| `music`      | 音乐, music, 钢琴    | <FaMusic />         |
| `education`  | 教程, 学习, course   | <FaGraduationCap /> |
| `video`      | 视频, video          | <FaVideo />         |

完整列表见 `IconMapper.js` 中的 `iconMap` 对象。

### 添加新图标类型

1. **导入图标**（在 `IconMapper.js` 中）：

javascript

```
import { FaNewIcon } from 'react-icons/fa'; // 或其他图标包

// 添加到映射表
export const iconMap = {
  // ... 现有图标
  'newtype': <FaNewIcon />,
};
```



1. **添加匹配规则**：

javascript

```
export const getIconByTitle = (title) => {
  const lowerTitle = title.toLowerCase();
  
  // 添加新的匹配规则
  if (/新关键词|newkeyword/.test(lowerTitle)) return 'newtype';
  
  return 'default';
};
```



### 手动指定图标

在数据中直接指定 `iconType`：

javascript

```
const cards = [
  {
    id: 1,
    title: "React教程",
    link: "/react",
    iconType: "react" // 手动指定
  }
];
```



### 图标颜色修改

图标颜色主要设置在：

1. **正常状态**：`.cardIcon` 中的 `color` 属性
2. **悬停状态**：`.markCard:hover .cardIcon` 中的 `color` 属性

快速修改方法：

css

```
/* 修改正常状态图标颜色 */
.cardIcon {
  color: #007acc; /* 改为蓝色 */
}

/* 修改悬停状态图标颜色 */
.markCard:hover .cardIcon {
  color: #ffffff; /* 改为白色 */
}
```



## 🔧 维护指南

### 添加新页面使用卡片

1. **创建页面文件**：如 `docs/books.mdx`
2. **导入组件**：

jsx

```
import React from 'react';
import { MarkCardGrid } from '@site/src/components/markcard';
import { cardData } from '@site/src/data/markcard-data';

export default function BooksPage() {
  return (
    <div>
      <h1>书籍推荐</h1>
      <MarkCardGrid 
        cards={cardData.books} 
        title="技术书籍"
        searchPlaceholder="搜索书籍..."
      />
    </div>
  );
}
```



### 更新数据

1. **添加新卡片**：

javascript

```
// 在 markcard-data.js 中添加
const videoCards = [
  // ... 现有卡片
  {
    id: 7, // 确保ID唯一
    title: "新教程",
    link: "/docs/new-tutorial",
    description: "这是新增的教程",
    iconType: "react"
  }
];
```



1. **更新现有卡片**：

javascript

```
// 修改对应卡片的属性
const videoCards = [
  {
    id: 1,
    title: "更新后的标题", // 修改标题
    link: "/new-path",     // 修改链接
    // ... 其他属性
  }
];
```



### 处理链接类型

- **内部链接**：直接使用相对路径 `/docs/path`
- **外部链接**：使用完整URL `https://example.com`
- **锚点链接**：使用 `#section-id`

### 性能优化建议

1. **大数据集**：如果卡片数量很多（>50），考虑分页
2. **图标加载**：所有图标已按需加载
3. **搜索性能**：使用 `useMemo` 优化搜索过滤

## 🐛 故障排除

### 常见问题及解决方案

#### 问题1：图标不显示

text

```
错误：icon is not defined
```



**解决方案**：

1. 确保在 `IconMapper.js` 中正确导入了图标
2. 检查图标名称是否正确
3. 使用安全版本：`SafeIconComponent`

#### 问题2：卡片点击无反应

**解决方案**：

1. 检查链接地址是否正确
2. 确保链接以 `/` 或 `http` 开头
3. 查看浏览器控制台是否有错误

#### 问题3：搜索功能不工作

**解决方案**：

1. 确保卡片数据有 `title` 字段
2. 检查搜索框是否被正确渲染
3. 查看控制台是否有JavaScript错误

#### 问题4：样式异常

**解决方案**：

1. 检查CSS类名是否正确
2. 确保CSS模块正确导入
3. 查看是否与其他样式冲突

### 调试步骤

1. **检查控制台**：查看是否有JavaScript错误
2. **检查网络**：确保所有文件正确加载
3. **检查数据**：确保卡片数据格式正确
4. **检查导入**：确保组件正确导入

### 开发命令

bash

```
# 启动开发服务器
npm start

# 构建项目
npm build

# 清除缓存
npm clear
```