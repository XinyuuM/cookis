// src/data/diskFiles.js
const diskFiles = [
  {
    id: 'FILE001',
    name: 'Photoshop CC 2024',
    description: '数字图像处理与设计的行业标准',
    size: '4.62GB',
    uploadDate: '2025.9.18',
    extractPassword: '', //传递解压密码
    downloadPassword: 'vj2u', //提取码
    status: 'available', //状态分为可用 available 过期 expired 和 失效 linkFailed
    downloadLink: 'https://pan.baidu.com/s/1By5BiDv7dtiE4McQUoCaGQ',
   // backupLink: '', backupLink用于传递备用链接
    category: 'Adobe',
    tags: ['摄影后期', '平面设计', '游戏美术']
  },
  {
    id: 'FILE002',
    name: 'Vegas Pro13',
    description: '专业视频剪辑与后期制作软件',
    size: '429.40MB',
    uploadDate: '2019.1.2',
    extractPassword: '', //传递解压密码
    downloadPassword: 'iedb', //提取码
    status: 'available', //状态分为可用 available 过期 expired 和 失效 linkFailed
    downloadLink: 'https://pan.baidu.com/s/1lLeH6Vp7Z3S47ZeX7oc27w',
   // backupLink: '', backupLink用于传递备用链接
    category: 'Sony',
    tags: ['影视制作', '多媒体创作', '教育培训']
  },
  {
    id: 'FILE003',
    name: 'eNSP',
    description: '华为网络设备仿真平台',
    size: '1.48GB',
    uploadDate: '2024.4.20',
    extractPassword: '', //传递解压密码
    downloadPassword: 'x3mp', //提取码
    status: 'available', //状态分为可用 available 过期 expired 和 失效 linkFailed
    downloadLink: 'https://pan.baidu.com/s/1OvAzLHvWRE3-4kuLEPkOHA',
   // backupLink: '', backupLink用于传递备用链接
    category: '华为数通',
    tags: ['教育实验', '通信培训', '企业网络']
  },
  {
    id: 'FILE004',
    name: '如何走进富婆的内心',
    description: '如何走进富婆的内心1.pdf',
    size: '226.68KB',
    uploadDate: '2024.10.19',
    extractPassword: '', //传递解压密码
    downloadPassword: 'ttne', //提取码
    status: 'available', //状态分为可用 available 过期 expired 和 失效 linkFailed
    downloadLink: 'https://pan.baidu.com/s/1a42nH7wWmuhoEfh4hklLNg',
   // backupLink: '', backupLink用于传递备用链接
    category: 'pdf',
    tags: []
  },

  
];

export default diskFiles;

