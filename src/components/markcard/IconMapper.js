import React from 'react';
import {
  FaReact,
  FaJsSquare,
  FaNodeJs,
  FaCss3Alt,
  FaDatabase,
  FaGitAlt,
  FaPython,
  FaJava,
  FaHtml5,
  FaDocker,
  FaAws,
  FaLinux,
  FaMusic,
  FaGuitar,
  FaMicrophoneAlt,
  FaHeadphones,
  FaDrum,
  FaCompactDisc,
  FaBook,
  FaVideo,
  FaFileAlt,
  FaLink,
  FaStar,
  FaRocket,
  FaLightbulb,
  FaGraduationCap,
  FaChartLine,
  FaUsers,
  FaGlobe,
  FaSearch,
  FaTimes,
  FaCode,
  FaArrowRight,
  FaProjectDiagram
} from 'react-icons/fa';

// 图标映射配置
export const iconMap = {
  // 技术相关
  'react': <FaReact />,
  'javascript': <FaJsSquare />,
  'typescript': <FaCode />,
  'nextjs': <FaArrowRight />,
  'nodejs': <FaNodeJs />,
  'css': <FaCss3Alt />,
  'html': <FaHtml5 />,
  'database': <FaDatabase />,
  'graphql': <FaProjectDiagram />,
  'git': <FaGitAlt />,
  'python': <FaPython />,
  'java': <FaJava />,
  'docker': <FaDocker />,
  'aws': <FaAws />,
  'linux': <FaLinux />,
  
  // 音乐相关
  'music': <FaMusic />,
  'guitar': <FaGuitar />,
  'microphone': <FaMicrophoneAlt />,
  'headphones': <FaHeadphones />,
  'drum': <FaDrum />,
  'cd': <FaCompactDisc />,
  
  // 通用
  'default': <FaBook />,
  'video': <FaVideo />,
  'document': <FaFileAlt />,
  'link': <FaLink />,
  'star': <FaStar />,
  'rocket': <FaRocket />,
  'idea': <FaLightbulb />,
  'education': <FaGraduationCap />,
  'analytics': <FaChartLine />,
  'community': <FaUsers />,
  'global': <FaGlobe />,
  'search': <FaSearch />,
  'close': <FaTimes />,
};

// 根据标题关键字自动匹配图标
export const getIconByTitle = (title) => {
  if (!title) return 'default';
  
  const lowerTitle = title.toLowerCase();
  
  // 技术相关关键词
  if (/react|前端|ui|界面/.test(lowerTitle)) return 'react';
  if (/javascript|js|脚本/.test(lowerTitle)) return 'javascript';
  if (/typescript|ts/.test(lowerTitle)) return 'typescript';
  if (/next\.?js|nextjs/.test(lowerTitle)) return 'nextjs';
  if (/node\.?js|nodejs|后端/.test(lowerTitle)) return 'nodejs';
  if (/css|样式|布局/.test(lowerTitle)) return 'css';
  if (/html|网页/.test(lowerTitle)) return 'html';
  if (/database|数据库|mysql|mongodb/.test(lowerTitle)) return 'database';
  if (/graphql/.test(lowerTitle)) return 'graphql';
  if (/git|版本控制/.test(lowerTitle)) return 'git';
  if (/python/.test(lowerTitle)) return 'python';
  if (/java/.test(lowerTitle)) return 'java';
  if (/docker|容器/.test(lowerTitle)) return 'docker';
  if (/aws|亚马逊/.test(lowerTitle)) return 'aws';
  if (/linux/.test(lowerTitle)) return 'linux';
  
  // 音乐相关关键词
  if (/钢琴|piano/.test(lowerTitle)) return 'music';
  if (/吉他|guitar/.test(lowerTitle)) return 'guitar';
  if (/音乐|music/.test(lowerTitle)) return 'music';
  if (/声乐|唱歌|vocal/.test(lowerTitle)) return 'microphone';
  if (/爵士|jazz/.test(lowerTitle)) return 'microphone';
  if (/电子音乐|edm/.test(lowerTitle)) return 'music';
  if (/耳机|headphone/.test(lowerTitle)) return 'headphones';
  if (/鼓|drum/.test(lowerTitle)) return 'drum';
  if (/光盘|cd/.test(lowerTitle)) return 'cd';
  
  // 其他关键词
  if (/教程|学习|course/.test(lowerTitle)) return 'education';
  if (/视频|video/.test(lowerTitle)) return 'video';
  if (/文档|document/.test(lowerTitle)) return 'document';
  if (/链接|link/.test(lowerTitle)) return 'link';
  if (/重要|star|精选/.test(lowerTitle)) return 'star';
  if (/快速|快速开始|rocket/.test(lowerTitle)) return 'rocket';
  if (/想法|创意|idea/.test(lowerTitle)) return 'idea';
  if (/分析|数据|analytics/.test(lowerTitle)) return 'analytics';
  if (/社区|community/.test(lowerTitle)) return 'community';
  if (/国际|全球|global/.test(lowerTitle)) return 'global';
  if (/搜索|search/.test(lowerTitle)) return 'search';
  if (/关闭|close/.test(lowerTitle)) return 'close';
  
  return 'default';
};

// 图标组件
export const IconComponent = ({ iconType, title, className = '', size = '1.5em' }) => {
  const iconKey = iconType || getIconByTitle(title || '');
  const IconElement = iconMap[iconKey] || iconMap.default;
  
  return React.cloneElement(IconElement, { 
    className: `${IconElement.props.className || ''} ${className}`.trim(),
    size: size
  });
};

export default IconComponent;