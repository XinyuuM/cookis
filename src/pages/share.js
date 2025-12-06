// 例如在 src/pages/disk-share.js
import React from 'react';
import Layout from '@theme/Layout';
import DiskShare from '@site/src/components/DiskShare';
import CarouselBanner from '@site/src/components/CarouselBanner'

function DiskSharePage() {
  return (
    <Layout
      title="公开文件"
      description="高质量学习资源和工具分享"
    >
      <main>
        <DiskShare />
      </main>
    </Layout>
  );
}

export default DiskSharePage;