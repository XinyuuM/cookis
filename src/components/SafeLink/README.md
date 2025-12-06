# SafeLink 组件使用与维护指南

## 📋 概述

SafeLink 是一个用于 Docusaurus 的外部链接安全组件。当用户点击外部链接时，它会显示一个 Material 3 风格的警告对话框，提醒用户即将离开当前站点。该组件完全集成 Docusaurus 的主题系统，并遵循 Material 3 设计规范。

------

## 🏗️ 项目结构

text

```
components/SafeLink/
├── SafeLink.jsx          # 主组件逻辑
├── SafeLink.module.css   # Material 3 样式文件
└── index.js             # 组件导出文件
```



------

## 🎨 设计系统

### Material 3 变量系统

组件使用以下 CSS 变量，这些变量自动继承自 Docusaurus 配置：

css

```css
/* 颜色变量 */
--md-sys-color-primary: var(--ifm-color-primary);          /* 主要颜色 */
--md-sys-color-primary-container: var(--ifm-color-primary-dark);
--md-sys-color-secondary: var(--ifm-color-secondary);
--md-sys-color-surface: var(--ifm-background-color);       /* 表面颜色 */
--md-sys-color-on-surface: var(--ifm-font-color-base);     /* 表面上的文本 */

/* 间距系统 (8px 基准) */
--md-sys-spacing-xs: 4px;   /* 超小间距 */
--md-sys-spacing-sm: 8px;   /* 小间距 */
--md-sys-spacing-md: 16px;  /* 中间距 */
--md-sys-spacing-lg: 24px;  /* 大间距 */
--md-sys-spacing-xl: 32px;  /* 超大间距 */

/* 圆角系统 */
--md-sys-shape-corner-xs: 4px;
--md-sys-shape-corner-sm: 8px;
--md-sys-shape-corner-md: 12px;  /* 默认圆角 */
--md-sys-shape-corner-lg: 16px;
--md-sys-shape-corner-xl: 28px;

/* 动画 */
--md-sys-motion-duration-short: 200ms;
--md-sys-motion-duration-medium: 300ms;
--md-sys-motion-easing-standard: cubic-bezier(0.2, 0, 0, 1);
```



### 颜色映射关系

| Material 3 变量             | Docusaurus 变量            | 用途         |
| :-------------------------- | :------------------------- | :----------- |
| `--md-sys-color-primary`    | `--ifm-color-primary`      | 主要品牌色   |
| `--md-sys-color-surface`    | `--ifm-background-color`   | 背景颜色     |
| `--md-sys-color-on-surface` | `--ifm-font-color-base`    | 主要文本颜色 |
| `--md-sys-color-outline`    | `--ifm-color-emphasis-300` | 边框和分隔线 |

------

## 📖 使用方法

### 基本使用

jsx

```
import SafeLink from '@site/components/SafeLink';

// 在 MDX 文件中使用
<SafeLink href="https://example.com">
  访问示例网站
</SafeLink>
```



### 高级属性

jsx

```
<SafeLink
  href="https://external-site.com"
  showIcon={true}                    // 是否显示图标，默认 true
  className="custom-class"           // 自定义 CSS 类
  warningMessage="自定义警告消息..."   // 自定义警告内容
  // 其他标准的 <a> 标签属性
>
  带自定义警告的外部链接
</SafeLink>
```



### 内部链接

内部链接会自动识别，不会触发警告：

jsx

```
<SafeLink href="/docs/introduction">
  内部链接 - 直接跳转
</SafeLink>
```



------

## 🔧 配置与自定义

### 1. 全局样式自定义

在项目的自定义 CSS 文件中覆盖变量：

css

```
/* src/css/custom.css */
:root {
  /* 调整圆角 */
  --md-sys-shape-corner-md: 16px;
  
  /* 自定义警告颜色 */
  --md-sys-color-error: #dc2626;
  
  /* 调整动画速度 */
  --md-sys-motion-duration-medium: 400ms;
}

[data-theme='dark'] {
  /* 暗色模式调整 */
  --md-sys-color-surface-variant: #2d2d2d;
}
```



### 2. 修改默认警告消息

在组件级别自定义：

jsx

```
<SafeLink
  href="https://example.com"
  warningMessage="您即将离开安全区域，请注意保护个人信息..."
>
  安全警告链接
</SafeLink>
```



或者在 `SafeLink.jsx` 中修改默认消息：

jsx

```
// 第 150 行附近
const defaultWarningMessage = `您即将离开本站，访问外部网站...`;
```



### 3. 禁用特定链接的警告

如果某些外部链接不需要警告（如受信任的合作伙伴），可以在组件中添加例外逻辑：

jsx

```
// 在 SafeLink.jsx 的 isExternal 检查后添加
const trustedDomains = ['trusted-site.com', 'partner.com'];
const isTrusted = trustedDomains.some(domain => href.includes(domain));

if (isTrusted) {
  // 直接渲染为普通外部链接
}
```



------

## 🚀 功能特性详解

### 1. 智能链接检测

组件自动检测链接类型：

- **内部链接**：相对路径或同域名链接 → 直接跳转
- **外部链接**：不同域名的绝对 URL → 触发警告
- **特殊协议**：`mailto:`, `tel:` → 直接跳转

### 2. 用户偏好记忆

使用 localStorage 存储用户选择：

- **键名格式**：`safe-link-confirmed:[URL]`
- **存储内容**：`true`（已确认）
- **作用范围**：每个链接独立记忆

### 3. 安全特性

- **自动添加安全属性**：外部链接添加 `rel="noopener noreferrer"`
- **防钓鱼保护**：明确显示目标 URL
- **防误操作**：二次确认机制

### 4. 无障碍支持

- **ARIA 标签**：完整的对话框 ARIA 属性
- **键盘导航**：支持 Tab 键和 Enter 键操作
- **屏幕阅读器**：隐藏文本提示
- **焦点管理**：自动聚焦到取消按钮

------

## 🔄 维护指南

### 常见问题排查

#### 问题1：警告框不显示

- ✅ 检查链接是否为绝对 URL（http:// 或 https://）
- ✅ 确认不是同域名链接
- ✅ 检查控制台是否有错误

#### 问题2：样式不正常

- ✅ 确认 Docusaurus 主题变量已正确定义
- ✅ 检查自定义 CSS 是否冲突
- ✅ 验证 CSS 模块导入是否正确

#### 问题3：记住选择功能失效

- ✅ 检查 localStorage 是否可用
- ✅ 确认域名没有特殊字符影响键名
- ✅ 检查浏览器隐私设置

### 更新 Material 3 样式

如果需要更新到新的 Material 3 规范：

1. **颜色系统更新**：

css

```
/* 最新 Material 3 颜色变量 */
--md-ref-palette-primary40: var(--ifm-color-primary);
--md-sys-color-primary: var(--md-ref-palette-primary40);
```



1. **间距系统更新**：
   使用 4dp 的倍数：4、8、12、16、20、24、28、32、36、40、44、48、52、56、60、64
2. **类型缩放更新**：

css

```
/* 可添加字体变量 */
--md-sys-typescale-body-large: 400 16px/24px 'Inter';
```



### 浏览器兼容性

组件支持：

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

需要 polyfill 的功能：

- `color-mix()` 函数（CSS Color Level 5）
- `:focus-visible` 伪类

------

## 🧪 测试指南

### 单元测试建议

创建测试文件 `SafeLink.test.jsx`：

jsx

```
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SafeLink from './SafeLink';

describe('SafeLink', () => {
  test('内部链接直接渲染', () => {
    render(<SafeLink href="/docs">内部</SafeLink>);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/docs');
  });

  test('外部链接显示警告按钮', () => {
    render(<SafeLink href="https://external.com">外部</SafeLink>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('点击外部链接打开对话框', () => {
    render(<SafeLink href="https://external.com">测试</SafeLink>);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
```



### 手动测试清单

测试场景：

- 内部链接点击直接跳转
- 外部链接点击显示警告
- 记住选择功能正常工作
- 暗色模式样式正确
- 移动端响应式布局
- 键盘导航正常
- 屏幕阅读器可访问

------

## 📈 性能优化

### 1. 懒加载优化

如果组件较大，可以考虑懒加载：

jsx

```
// 在需要使用的页面中
const SafeLink = React.lazy(() => import('@site/components/SafeLink'));

function Page() {
  return (
    <React.Suspense fallback={<div>加载中...</div>}>
      <SafeLink href="...">链接</SafeLink>
    </React.Suspense>
  );
}
```



### 2. 记忆化优化

组件已使用 `React.useMemo` 缓存外部链接检测结果，避免重复计算。

### 3. 包大小分析

使用以下命令分析组件大小：

bash

```
npx source-map-explorer 'build/**/*.js'
```



------

## 🔗 相关文档

- [Material 3 设计系统](https://m3.material.io/)
- [Docusaurus 主题配置](https://docusaurus.io/docs/styling-layout)
- [CSS 模块文档](https://github.com/css-modules/css-modules)
- [React 无障碍指南](https://zh-hans.reactjs.org/docs/accessibility.html)

------

## 📞 支持与贡献

### 遇到问题？

1. **查看控制台错误**
2. **检查 Docusaurus 版本兼容性**
3. **验证 CSS 变量是否正确定义**
4. **清除浏览器缓存和 localStorage**

### 想要贡献？

欢迎提交 Pull Request：

1. Fork 仓库
2. 创建功能分支
3. 添加测试
4. 提交更改
5. 创建 Pull Request

------

## 📝 更新日志模板

markdown

```
## [版本号] - YYYY-MM-DD

### 新增
- 新功能描述

### 更改
- 功能改进描述

### 修复
- 问题修复描述

### 弃用
- 即将移除的功能

### 破坏性变更
- 可能影响现有使用的变更
```



------

## 🎯 最佳实践

1. **始终提供有意义的警告消息**：帮助用户理解风险
2. **保持一致性**：全站使用相同的 SafeLink 组件
3. **定期审查例外列表**：确保受信任域名仍然可信
4. **测试所有链接**：发布前验证所有外部链接
5. **监控用户反馈**：收集用户对警告体验的反馈