import React from 'react';
import Link from '@docusaurus/Link';

export default function ContentPortals() {
  const portals = [
    {
      title: '收藏',
      description: '工作与学习的私藏',
      link: '/docs/', // 对应你的收藏页路由
      icon: '⭐',
      color: '#ffc107',
    },
    {
      title: '卡片',
      description: '输入呼号进行搜索',
      link: '/bg7lgx',
      icon: '📡',
      color: '#dc3545',
    },
    {
      title: '博客',
      description: '记录生活感悟的主要阵地',
      link: '/blog', // Docusaurus 博客默认路由
      icon: '✍️',
      color: '#0d6efd',
    },
    {
      title: '网盘',
      description: '访问公开文件',
      link: '/share',
      icon: '💾',
      color: '#6f42c1',
    },
    {
      title: '压缩',
      description: '简洁易用的图片压缩工具',
      link: '/ImageCompressor',
      icon: '🌄',
      color: '#3d30f3',
    },
    {
      title: '调色板',
      description: '简洁易用的取色工具',
      link: '/ColorPicker',
      icon: '🎨',
      color: '#f39f30',
    },
    {
      title: 'Time is...',
      description: '标准时间查看',
      link: '/time',
      icon: '🕜️',
      color: '#2e2957',
    },
    
  ];

  return (
    <section className="portals-section">
      <div className="container">
        <h2 className="section-title">分类内容</h2>
        <p className="section-subtitle">探索不同的角落</p>
        <div className="portals-grid">
          {portals.map((portal) => (
            <Link to={portal.link} className="portal-card" key={portal.title}>
              <div className="portal-icon" style={{ backgroundColor: portal.color + '20', color: portal.color }}>
                <span className="icon">{portal.icon}</span>
              </div>
              <h3>{portal.title}</h3>
              <p>{portal.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}