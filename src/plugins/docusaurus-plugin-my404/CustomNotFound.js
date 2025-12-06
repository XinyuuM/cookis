// src/pages/NotFound.jsx 或 src/pages/404.jsx
import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import './404.css';

export default function NotFound() {
  return (
    <Layout title="页面未找到">
      <div className="anime-404">
        
        {/* 主容器：左图右文 */}
        <div className="error-container">
          
          {/* 左侧图片区域 */}
          <div className="image-column">
            <div className="anime-image-wrapper">
              <img 
                src={require('@site/static/img/404_compressed_.webp').default}
                alt="二次元角色寻找页面"
                className="anime-character"
              />
              <div className="image-decoration">
                <div className="floating-orb pink"></div>
                <div className="floating-orb blue"></div>
                <div className="floating-orb yellow"></div>
              </div>
              <div className="image-caption">「页面好像走丢了」</div>
            </div>
          </div>
          
          {/* 右侧内容区域 */}
          <div className="content-column">
            
            {/* 404数字 */}
            <div className="error-code">
              <span className="number-4">4</span>
              <span className="number-0">0</span>
              <span className="number-4">4</span>
            </div>
            
            {/* 主标题 */}
            <h1 className="page-title">
              页面<span className="highlight">消失</span>了
            </h1>
            
            {/* 描述 */}
            <p className="error-description">
              您访问的页面可能已被移动、删除或暂时不可用。
            </p>
            
            {/* 可能的原因列表 */}
            <div className="reasons-section">
              <h3>可能的原因：</h3>
              <ul className="reasons-list">
                <li>网址输入错误或拼写错误</li>
                <li>页面已被移动到新位置</li>
                <li>页面已被删除或不再可用</li>
                <li>链接已失效或过期</li>
                <li>网站正在维护或更新</li>
              </ul>
            </div>
            
            {/* 操作按钮 */}
            <div className="actions">
               <Link to="/">

               <button className="home-button">
                返回首页
              </button>
              
              </Link>
              
            </div>
            
          </div>
          
        </div>
        
      </div>
    </Layout>
  );
}