/**
 * 图片压缩预设配置
 */

export const imagePresets = [
  {
    id: 'web',
    name: '网页优化',
    description: '适合网页使用，平衡质量和大小',
    quality: 80,
    maxWidth: 1920,
    format: 'image/webp'
  },
  {
    id: 'social',
    name: '社交媒体',
    description: '适合社交媒体分享',
    quality: 85,
    maxWidth: 1080,
    format: 'image/jpeg'
  },
  {
    id: 'mobile',
    name: '移动端优化',
    description: '适合移动设备加载',
    quality: 75,
    maxWidth: 750,
    format: 'image/jpeg'
  },
  {
    id: 'archive',
    name: '高质量存档',
    description: '保留最高质量',
    quality: 95,
    maxWidth: 3840,
    format: 'image/png'
  },
  {
    id: 'email',
    name: '邮件附件',
    description: '适合邮件发送，文件小',
    quality: 70,
    maxWidth: 1024,
    format: 'image/jpeg'
  }
];

/**
 * 获取指定预设
 * @param {string} presetId - 预设ID
 * @returns {Object} 预设配置
 */
export const getPreset = (presetId) => {
  return imagePresets.find(preset => preset.id === presetId) || imagePresets[0];
};

/**
 * 获取所有预设的格式列表
 * @returns {Array} 格式数组
 */
export const getAllFormats = () => {
  return [...new Set(imagePresets.map(preset => preset.format))];
};

export default imagePresets;