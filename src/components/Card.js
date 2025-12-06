import React from 'react';
import Link from '@docusaurus/Link';

export default function Card({ title, description, link, icon }) { // 新增 icon 属性
  return (
    <div style={{
      border: '1px solid #eaeaea',
      borderRadius: '8px',
      padding: '20px',
      width: '300px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'box-shadow 0.3s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        {/* 在标题左侧渲染图标 */}
        {icon && <i className={icon} style={{ marginRight: '10px', fontSize: '1.2em' }}></i>}
        <h3 style={{ margin: 0 }}>{title}</h3> {/* 调整标题边距使布局更紧凑 */}
      </div>
      <p>{description}</p>
      <Link to={link}>浏览{title}</Link>
    </div>
  );
}