import React from 'react';
import Layout from '@theme/Layout';
import Hero from '@site/src/components/Hero';
import ContentPortals from '@site/src/components/ContentPortals';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="一个汇集技术文档、博客与兴趣收藏的数字空间">
      {/* 主内容区 */}
      <main className="homepage-main">
        <Hero />
        <ContentPortals />
      </main>
    </Layout>
  );
}
// 注意：这里没有 import './index.css'，样式将通过全局或CSS Modules管理