import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './CarouselAd.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

// 广告数据配置 (已移除 backgroundColor，背景完全由图片决定)
const adSlides = [
  {
    id: 1,
    title: '说说Crystal',
    description: '关注说说喵！关注说说谢谢喵！',
    imageUrl: '/img/ads/ad1.jpg', // 请替换为您的1280x500图片路径
    link: 'https://www.bilibili.com/video/BV1BF41117ss/',
  },
  {
    id: 2,
    title: '阿梓从小就很可爱',
    description: '顶级美声',
    imageUrl: '/img/ads/ad2.jpg',
    link: 'https://www.bilibili.com/video/BV15e4y197ws/',
  },
  {
    id: 3,
    title: '一慧眼镜',
    description: '林克用了都说好',
    imageUrl: '/img/ads/ad3.jpg',
    link: 'https://ditu.amap.com/place/B0G3SSXO2M',
  },
  // 您可以继续添加更多广告项
];

export default function CarouselAd() {
  return (
    <section className="carousel-ad-section">
      <div className="container">
        
        <div className="carousel-container">
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="carousel-swiper"
          >
            {adSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                
				<a 
                  href={slide.link} 
                  className="carousel-slide-link"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {/* 单个广告卡片容器 */}
                  <div className="carousel-slide">
                    {/* 背景图片层 */}
                    <div className="slide-background">
                      <img 
                        src={useBaseUrl(slide.imageUrl)} 
                        alt={slide.title}
                        className="slide-background-image"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* 叠加在图片上的文字内容层 */}
                    <div className="slide-content-overlay">
                      <h3 className="slide-title">{slide.title}</h3>
                      <p className="slide-description">{slide.description}</p>
                      <span className="slide-cta">了解更多 →</span>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}