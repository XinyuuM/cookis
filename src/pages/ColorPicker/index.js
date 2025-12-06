// 在页面中使用
import React from 'react';
import Layout from '@theme/Layout';
import ImageColorPicker from '@site/src/components/image-color-picker/ImageColorPicker';

function ImageCompressorPage() {
  return (
    <Layout title="曦语取色器">
      <div className="container margin-vert--xl">
        <ImageColorPicker />
      </div>
    </Layout>
  );
}

export default ImageCompressorPage;