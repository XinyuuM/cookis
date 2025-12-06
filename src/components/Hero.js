import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Hero() {
  const profile = {
    name: '😇曦语 Xinyuu',
    avatar: '/img/xinyuu-face.jpg',
    bio: '祝你今天也能在纷繁的互联网的矿场里，找到那些触动你内心的金光。'
  };

  // 使用 Simple Icons CDN 的社交平台配置
  // 格式: [‘显示名称’, ‘你的个人主页链接’, ‘Simple Icons 的图标slug’, ‘品牌颜色’]
  const socialPlatforms = [
    ['Bilibili', 'https://space.bilibili.com/142202292', 'bilibili', '#fb7299'],
    ['知乎', 'https://www.zhihu.com/people/xinyuu-nasa', 'zhihu', '#0066ff'],
    ['语雀', 'https://www.yuque.com/atxinyuu', 'notepadplusplus', '#00b96b'],
    ['贴吧', 'https://tieba.baidu.com/home/main?id=tb.1.231d5942.lMBVCs4hOxG6cgS7dh3pRA', 'baidu', '#1e50b8'], // 请替换贴吧ID
    ['抖音', 'https://www.douyin.com/user/MS4wLjABAAAAN40QZcypOO-l_SD0JE24I0JFAz4nJOArhdVd9C_Qh9A', 'tiktok', '#000000'], // 请替换抖音ID，使用TikTok图标
    ['云音乐', 'https://music.163.com/#/user/home?id=594434593', 'neteasecloudmusic', '#c20c0c'],
    ['小红书', 'https://www.xiaohongshu.com/user/profile/yourid', 'xiaohongshu', '#ff2442'], // 请替换小红书ID
    ['500px', 'https://500px.com.cn/atxinyuu', '500px', '#0099e5'], // 请替换500px ID
    ['蒸汽平台', 'https://my.steamchina.com/id/xinyuu', 'steam', '#D12C25'],
	['Email', 'mailto:atxinyu@foxmail', 'gmail', '#EA4335'],
	
  ];

  // 基础链接 (非社交平台或无需图标的链接)
  const basicLinks = [
   // { label: 'Email', url: 'mailto:atxinyu@foxmail.com', icon: '✉️' },
    // 可在此处添加更多基础链接，如GitHub、个人博客等
    // { label: 'GitHub', url: 'https://github.com/yourname', icon: '🐙' },
  ];

  return (
    <header className="hero-section">
      <div className="hero-container">
        <img className="hero-avatar" src={useBaseUrl(profile.avatar)} alt={profile.name} />
        <div className="hero-content">
          <h1 className="hero-title">{profile.name}</h1>
          <p className="hero-subtitle">{profile.bio}</p>
			<h3>与我联系</h3>
          {/* +++ 新增：社交平台图标网格区域 +++ */}
          <div className="social-platforms-section">
            <div className="social-platforms-grid">
              {socialPlatforms.map(([name, url, iconSlug, color]) => (
                <a
                  key={name}
                  href={url}
                  className="social-platform-card"
                  target="_blank"
                  rel="noopener noreferrer"
                  title={name}
                  style={{ '--platform-color': color }} // 将品牌色作为CSS变量
                >
                  <img
                    src={`https://cdn.simpleicons.org/${iconSlug}/${color.replace('#', '')}`}
                    alt={`${name}图标`}
                    className="social-platform-icon"
                  />
                  <span className="social-platform-name">{name}</span>
                </a>
              ))}
            </div>
          </div>
          {/* +++ 社交平台区域结束 +++ */}

          {/* 原有的基础链接区域 */}
          <div className="hero-basic-links">
            {basicLinks.map((link, idx) => (
              <a key={idx} href={link.url} className="hero-basic-link" target="_blank" rel="noopener noreferrer">
                <span className="hero-basic-link-icon">{link.icon}</span> {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}