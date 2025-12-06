import React from 'react';
import DailyInspiration from './DailyInspiration';
import './DailyGallery.css'; // 用于三个相框的布局样式

const DailyGallery = () => {
  // 为你想要自定义的第二、第三个相框准备数据
  const customFrames = [
    // 第一个相框由组件自动获取，所以这里从第二个开始
    {
      imageUrl: '/img/20250325.jpg', // 替换为你的图片URL
      imageTitle: '2023年3月24日,广州市天河区,天河大道北',
      sentence: '怀抱着椅子的少女、青年的背影、门。在前面等着我们的，是如梦似幻的景象。'
    },
    {
      imageUrl: '/img/Picture.jpg', // 替换为你的图片URL
      imageTitle: '2025年5月1日,东莞市',
      sentence: 'BG7LGX'
    }
  ];

  return (
    <section className="daily-gallery-container">
      <div className="gallery-grid">
        {/* 第一个相框：不传参数，使用默认的每日API */}
        <DailyInspiration />
        {/* 第二、三个相框：传入自定义数据 */}
        <DailyInspiration customData={customFrames[0]} />
        <DailyInspiration customData={customFrames[1]} />
      </div>
    </section>
  );
};

export default DailyGallery;