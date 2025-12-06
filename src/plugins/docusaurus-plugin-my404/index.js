// plugins/docusaurus-plugin-my404/index.js
module.exports = function (context, options) {
  return {
    name: 'docusaurus-plugin-my404',
    // 1. 注入别名，让系统在解析`@theme/NotFound`时指向你的组件
    configureWebpack(config, isServer, utils) {
      return {
        resolve: {
          alias: {
            '@theme/NotFound': require.resolve('./CustomNotFound.js'),
          },
        },
      };
    },
    // 2. (可选) 在构建后注入自定义逻辑，例如修改生成的404.html
    async postBuild(props) {
      // 你可以在这里分析构建出的路由，或修改静态文件
      console.log('[My404 Plugin] 构建完成，可执行后处理。');
    },
  };
};