import React from 'react';
import Link from '@docusaurus/Link';

export default function Card({ logo-title, logo-description, logo-link, logo-icon }) { // 新增 icon 属性
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
       {/* 使用 Simple Icons CDN */}
        {brand && (
          <img 
            src={`https://cdn.simpleicons.org/${brand}/black`} 
            alt={`${brand} logo-icon`} 
            style={{ width: '24px', marginRight: '10px' }}
          />
        )}
        <h3 style={{ margin: 0 }}>{logo-title}</h3> {/* 调整标题边距使布局更紧凑 */}
      </div>
      <p>{logo-description}</p>
      <Link to={logo-link}>浏览{logo-title}</Link>
    </div>
  );
}