// src/components/CustomFooter/index.jsx
import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import SafeLink from '@site/src/components/SafeLink';
import { footerLinks } from '../../data/footerLinks'; // 引入数据
import './styles.css'; // 引入组件专属样式

export default function CustomFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="custom-footer-container">
      {/* 卡片式主体区域 */}
      <div className="custom-footer-card">
        <div className="custom-footer-content">
          {/* 板块一：友情链接 */}
          <div className="footer-section">
            <h3 className="footer-section-title">{footerLinks.friendlyLinks.title}</h3>
            <ul className="footer-links-list">
              {footerLinks.friendlyLinks.links.map((link, index) => (
                <li key={index}>
                  <Link href={link.url} showIcon={false} className="footer-link" >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 板块二：快速导航（示例，可按需修改） */}
          <div className="footer-section">
            <h3 className="footer-section-title">{footerLinks.quickNav.title}</h3>
            <ul className="footer-links-list">
              {footerLinks.quickNav.links.map((link, index) => (
                <li key={index}>
                  <Link to={useBaseUrl(link.url)} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 板块三：版权与备案信息 */}
          <div className="footer-section">
            <h3 className="footer-section-title">{footerLinks.legal.title}</h3>
            <p className="footer-copyright">
              ©2021-{currentYear} {footerLinks.legal.copyright}. All rights reserved.
            </p>
            <p className="footer-beian">
              {footerLinks.legal.beian.text && (
                <Link to={footerLinks.legal.beian.url} className="footer-beian-link">
                  {footerLinks.legal.beian.text}
                </Link>
              )}
            </p>
            <p className="footer-tech">
              Built with❤ <Link href="https://docusaurus.io"  >Docusaurus</Link>.
            </p>
			<img src="/img/badge-netlify.svg" alt="Deploys by Netlify" width="114" height="51"></img>
          </div>

        </div>
      </div>
    </footer>
  );
}