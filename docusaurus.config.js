// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';
const path = require('path'); 
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '曦语',
  tagline: '万物皆「可萌」(⑅˃◡˂⑅)',
  favicon: 'img/favicon.ico',
  trailingSlash: false,


  url: 'https://xinyuu.cn',
  baseUrl: '/',
  organizationName: 'facebook',
  projectName: 'docusaurus',
  onBrokenLinks: 'throw',
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  // ======================= 核心改动部分：预设 + 插件 =======================
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        // 关键：禁用预设内的默认 docs 插件，为自定义让路
        docs: false,
		sitemap: false,
      blog: {
        path: 'blog',
        routeBasePath: 'blog',
        showReadingTime: true,
      }, // 暂时也禁用博客，使用我们自定义的
      pages: false,
      theme: {customCss: ['./src/css/custom.css', './src/components/HomepageStyles.css'],}, 
        
      }),
    ],
  ],

  plugins: [
    
    // ===== 1. 内容插件定义 (按你需要的顺序) =====
    // 1.1 默认文档插件 (ID必须为"default"，解决构建错误)
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'default',
        path: 'docs',
        routeBasePath: 'docs',
        sidebarPath: './sidebars.js',
      },
    ],
    // 1.2 你的其他自定义文档插件
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'jobpal',
        path: './jobpal',
        routeBasePath: 'jobpal',
        sidebarPath: './sidebarsjobpal.js',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'nintendoswitch',
        path: './nintendoswitch',
        routeBasePath: 'nintendoswitch',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'datacom',
        path: './datacom',
        routeBasePath: 'datacom/docs',
      },
    ],
    // 1.3 你的第二个博客实例 (HCIA)
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'hcia',
        path: 'hcia',
        routeBasePath: 'datacom/hcia',
        blogTitle: 'HCIA 笔记',
        blogDescription: '关于华为认证HCIA的学习笔记与分享',
        postsPerPage: 10,
        blogSidebarTitle: '所有HCIA文章',
      },
    ],

    // ===== 2. 主题与工具插件 =====
    // 2.1 主题插件 (已通过 preset 引入，此处无需重复，但可覆盖配置)
    // 2.2 本地搜索插件 (必须在所有内容插件之后)
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        blogRouteBasePath: ['/blog', '/datacom/hcia'],
        docsRouteBasePath: ['/docs', '/nintendoswitch', '/jobpal', '/datacom/docs'],
        indexBlog: true,
        indexDocs: true,
        language: ["zh", "en"],
      },
    ],
    [
      '@docusaurus/plugin-content-pages',
      {
        path: 'src/pages',
        routeBasePath: '/',
        include: ['**/*.{js,jsx,ts,tsx,md,mdx}'],
        exclude: [
          '**/_*.{js,jsx,ts,tsx,md,mdx}',
          '**/_*/**',
          '**/*.test.{js,jsx,ts,tsx}',
          '**/__tests__/**',
        ],
      },
    ],
    [
      '@docusaurus/plugin-sitemap',
      {
        changefreq: 'weekly',
        priority: 0.5,
        ignorePatterns: ['/blackboard/**','/jobpal/**'], // 忽略不需要生成sitemap的页面
        filename: 'sitemap.xml', // 默认是'sitemap.xml'
        // 其他可选配置
      },
    ],
    [
      // 指向你本地的插件目录如果后期升级，由于404页面导致的编译失败请修改这里
      './src/plugins/docusaurus-plugin-my404',
      {
        // 这里可以传递插件选项，例如是否启用某些功能
        // enableDynamicRedirect: true,
      }
    ],
  ],

  // ======================= 主题配置 (保持不变) =======================
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      onBrokenLinks: 'ignore',
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: '曦语',
        logo: {
          alt: 'Auroral',
          src: 'img/logo.svg',
        },
        items: [],
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Powered by',
            items: [
              {
                html: `
    <div>
  <img src="/img/badge-netlify.svg" alt="Deploys by Netlify" width="114" height="51"><br />
      <a href="https://icp.xnet.ren/id.php?keyword=20250005" target="_blank" rel="noopener noreferrer">
        <img src="https://shields.wudu.ltd/gen.php?part1=信网联盟&style=coral&part2=20250005" alt="信网联盟备案图标" style="vertical-align: middle; margin-right: 0.5rem;" />
      </a>
      <br />
        <a href="https://icp.gov.moe/?keyword=20250737" target="_blank" rel="noopener noreferrer" style="color: #8bb9fe;">
        萌ICP备20250737号
      </a>
    </div>
  `,
              },
            ],
          },
        ],
        copyright: `©2021-${new Date().getFullYear()}  星辰曦语 | version.26`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;