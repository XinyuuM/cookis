# Docusaurus 自定义 404 插件 - 紧急维护指南

## ⚠️ 核心警告与维护须知

**这是什么？**
这是通过深度修改 Docusaurus 内部机制实现的自定义 404 插件。它通过 **Webpack 别名覆盖** 的方式，将系统默认的 404 组件 (`@theme/NotFound`) 替换为自定义实现。

**主要风险：**
此插件与 Docusaurus 内部 API 深度耦合。当 Docusaurus 主版本升级（尤其是涉及主题系统、路由系统或构建流程的变更）时，**几乎必然会导致编译失败**。

------

## 🚨 应急处理：如何快速退回原始 404

当出现因框架升级导致的编译错误时，请按以下优先级进行操作，目标只有一个：**让构建流程先恢复正常**。

### 方案一：临时禁用插件（最快，推荐首选）

在 `docusaurus.config.js` 中临时注释或移除插件引用：

javascript

```
// docusaurus.config.js
module.exports = {
  // ... 其他配置 ...
  plugins: [
    // 临时注释掉以下整个插件配置块以禁用自定义404
    // [
    //   './plugins/docusaurus-plugin-my404',
    //   {
    //     // 插件配置...
    //   }
    // ],
    // ... 其他插件
  ],
  themes: ['@docusaurus/theme-classic'],
};
```



**操作后验证：**

1. 运行 `npm run build`，编译应能成功。
2. 此时站点将使用 Docusaurus **主题自带的原始 404 页面**。

### 方案二：完全移除插件（彻底解决）

如果临时禁用后仍有问题，或决定放弃此自定义功能：

1. **删除插件目录**：

   bash

   ```
   rm -rf plugins/docusaurus-plugin-my404
   ```

   

2. **清理配置文件**：
   确保 `docusaurus.config.js` 的 `plugins` 数组中**完全移除**对 `'./plugins/docusaurus-plugin-my404'` 的引用。

3. **清除构建缓存和重装依赖**（必要时）：

   bash

   ```
   rm -rf node_modules/.cache
   npm install
   # 或使用 yarn
   yarn install
   ```

   

------

## 🔧 插件工作原理与故障点

理解以下机制，有助于在升级后诊断问题：

### 1. **核心修改机制** (`index.js` 中的 `configureWebpack`)

javascript

```
configureWebpack(config, isServer, utils) {
  return {
    resolve: {
      alias: {
        // !!! 高风险操作 !!!
        // 此别名重定向是插件生效的关键
        '@theme/NotFound': require.resolve('./CustomNotFound.js'),
      },
    },
  };
}
```



- **作用**：欺骗 Webpack，让它将所有对 `@theme/NotFound` 的引用指向我们的自定义组件。
- **升级后常见报错**：`Module not found: Can't resolve '@theme/NotFound'` 或相关主题组件错误。
- **意味着**：Docusaurus 主题的内部引用路径或打包方式已改变。

### 2. **后处理钩子** (`postBuild`)

- 此函数在构建完成后执行，用于修改生成的文件（如 `404.html`）。
- 如果 Docusaurus 的 `postBuild` 生命周期参数或输出目录结构发生变化，此逻辑可能失败。

### 3. **自定义组件** (`CustomNotFound.js`)

- 此组件**必须**与 Docusaurus 当前版本的主题组件接收相同的 **Props** 和 **路由上下文**。
- 如果 Docusaurus 的 `useLocation`、`useHistory` 等路由 Hook 或 `@theme/NotFound` 的默认属性发生变更，组件内部逻辑可能报错。

------

## 🛠️ 升级后的适配修复方向

如果你在框架升级后**仍希望保留此自定义功能**，并愿意修复插件，请按以下顺序检查：

1. **检查别名路径**：
   验证 `@theme/NotFound` 这个导出是否在新版本 Docusaurus 的 `@docusaurus/theme-classic` 中依然存在。可以检查 `node_modules/@docusaurus/theme-classic/theme/NotFound` 的路径结构。
2. **检查主题 API**：
   查看官方更新日志，确认 `@theme/NotFound` 组件接收的 **props** 是否有变化。我们的 `CustomNotFound.js` 必须与之匹配。
3. **检查构建 API**：
   检查 `configureWebpack` 和 `postBuild` 等插件 API 的签名或行为在新版本中是否有变更。

------

## 📦 回归标准模式后的建议

一旦通过上述方案退回原始 404，你便恢复了标准的、受官方支持的维护模式。此时，若仍需自定义 404 页面，**强烈建议采用官方标准方案**：

1. **在 `src/pages/` 目录下创建 `404.js` 或 `404.tsx`**。
2. 在此文件中使用 React 组件实现你的自定义 UI。
3. 此方式由 Docusaurus 官方直接支持，升级兼容性最好。

如需帮助将现有 `CustomNotFound.js` 的逻辑迁移到标准页面组件，请参考 Docusaurus 官方文档的 “Creating Pages” 部分。