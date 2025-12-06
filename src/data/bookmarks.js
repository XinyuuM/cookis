// 收藏夹分类数据
const bookmarkCategories = [
  {
    id: 'media',
    title: '媒体夹',
    icon: 'FaVideo',
    items: [
      {
        title: 'BILI默认收藏夹',
        url: 'https://space.bilibili.com/142202292/favlist?fid=56472092',
        icon: 'FaVideo',
        description: '哔哩哔哩'
      },
      {
        title: '阿梓播放器',
        url: 'https://space.bilibili.com/142202292/favlist?fid=3161246892&',
        icon: 'FaVideo',
        description: '哔哩哔哩'
      },
      {
        title: '好的教程',
        url: 'https://space.bilibili.com/142202292/favlist?fid=280222492',
        icon: 'FaVideo',
        description: '哔哩哔哩'
      }
    ]
  },
  {
    id: 'chrome',
    title: '网站夹',
    icon: 'FaChrome',
    items: [
      {
        title: 'DeepSeek',
        url: 'https://chat.deepseek.com',
        icon: 'FaChrome',
        description: '深度求索'
      },
      {
        title: 'Shields.io',
        url: 'https://shields.io/',
        icon: 'FaChrome',
        description: ''
      },
      {
        title: 'Aliyun',
        url: 'https://aliyun.com/',
        icon: 'FaChrome',
        description: '阿里云计算'
      }
    ]
  }
];

export default bookmarkCategories;