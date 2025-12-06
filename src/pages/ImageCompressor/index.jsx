// 在页面中使用
import React from 'react';
import Layout from '@theme/Layout';
import ImageCompressor from '@site/src/components/ImageCompressor';

function ImageCompressorPage() {
  return (
    <Layout title="图片压缩工具">
      <div className="container margin-vert--xl">
        <ImageCompressor />
      </div>
    </Layout>
  );
}

export default ImageCompressorPage;