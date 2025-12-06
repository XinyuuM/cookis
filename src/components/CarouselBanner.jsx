import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CarouselBanner.css'; // 引入更新后的CSS

const CarouselBanner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true, // 大横幅可以显示两侧箭头
    pauseOnHover: true,
    adaptiveHeight: false
  };

  // 幻灯片数据：同时包含颜色和图片字段
  const slides = [
    {
      id: 1,
      title: "重磅功能发布",
      desc: "探索全新AI驱动的文档助手，提升开发效率。",
      link: "/docs/new-features",
      bgColor: "#1e40af", // 备用颜色
      bgImage: "/img/banners/ai-release.jpg" // 优先显示的图片
    },
    {
      id: 2,
      title: "开发者大会2024",
      desc: "立即报名参与年度盛会，与专家面对面交流。",
      link: "/events/conference-2024",
      bgColor: "#059669", // 备用颜色
      // 无 bgImage 字段，将仅显示纯色背景
    },
    {
      id: 3,
      title: "社区贡献者计划",
      desc: "提交优质内容，赢取限定纪念品与荣誉勋章。",
      link: "/community/contributors",
      bgColor: "#7c3aed",
      bgImage: "/img/banners/community-banner.jpg"
    }
  ];

  return (
    <div className="carousel-banner-container">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="carousel-banner-slide">
            {/* 使用 a 标签包裹整个幻灯片 */}
            <a 
              href={slide.link} 
              className="banner-slide-link"
              style={slide.bgImage ? 
                { backgroundImage: `url(${slide.bgImage})` } : 
                { backgroundColor: slide.bgColor }
              }
              aria-label={`前往：${slide.title}`}
            >
              {/* 半透明黑色蒙版，确保文字在各种背景上都清晰 */}
              <div className="banner-content-overlay">
                <div className="banner-slide-content">
                  <h3 className="banner-slide-title">{slide.title}</h3>
                  <p className="banner-slide-desc">{slide.desc}</p>
                  <span className="banner-slide-cta">查看详情 →</span>
                </div>
              </div>
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselBanner;