import React, { useState, useEffect } from 'react';
import './DailyInspiration.css'; // 确保样式文件存在

const DailyInspiration = ({ customData }) => {
  // 状态：如果传入了自定义数据，则直接使用；否则，状态留空，等待API获取
  const [imageInfo, setImageInfo] = useState(customData ? { url: customData.imageUrl, title: customData.imageTitle } : { url: '', title: '' });
  const [sentence, setSentence] = useState(customData ? customData.sentence : '');

  useEffect(() => {
    // 关键逻辑：如果没有传入自定义数据，才去调用公开API
    if (!customData) {
      const fetchData = async () => {
        try {
          // 1. 获取Bing每日一图
          const imgResponse = await fetch('https://bing.biturl.top/?format=json&index=0&mkt=zh-CN');
          const imgData = await imgResponse.json();
          setImageInfo({
            url: imgData.url,
            title: imgData.copyright
          });
          // 2. 获取每日一言
          const senResponse = await fetch('https://v1.hitokoto.cn?c=i');
          const senData = await senResponse.json();
          setSentence(`${senData.hitokoto} —— ${senData.from}`);
        } catch (error) {
          console.error('获取数据失败:', error);
          // 设置优雅的降级内容
          setImageInfo({
            url: 'https://bing.ee123.net/img/',
            title: '今日美景'
          });
          setSentence('静水流深，沧笙踏歌。');
        }
      };
      fetchData();
    }
    // 如果传入了 customData，则 useEffect 什么也不做，直接使用传入的数据
  }, [customData]); // 依赖项为 customData

  return (
    <div className="daily-inspiration-frame">
      <div className="image-container">
        {imageInfo.url && (
          <img src={imageInfo.url} alt={imageInfo.title || '相框图片'} />
        )}
        <div className="image-title">{imageInfo.title}</div>
      </div>
      <div className="sentence-container">
        <p className="sentence-text">{sentence}</p>
      </div>
    </div>
  );
};

export default DailyInspiration;