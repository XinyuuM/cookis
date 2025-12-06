import React, { useState } from 'react';
import styles from './styles.module.css';
import { imagePresets } from '../../data/imagePresets';

const CompressionControls = ({ onCompress, isProcessing }) => {
  const [quality, setQuality] = useState(80);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [format, setFormat] = useState('image/jpeg');
  const [selectedPreset, setSelectedPreset] = useState('web');

  const handlePresetSelect = (presetId) => {
    const preset = imagePresets.find(p => p.id === presetId);
    if (preset) {
      setQuality(preset.quality);
      setMaxWidth(preset.maxWidth);
      setFormat(preset.format);
      setSelectedPreset(presetId);
    }
  };

  const handleCompress = () => {
    onCompress({
      quality,
      maxWidth,
      format
    });
  };

  return (
    <div className={styles.controlsContainer}>
      <h3 className={styles.controlsTitle}>压缩设置</h3>
      
      <div className={styles.presets}>
        <h4 className={styles.sectionTitle}>预设</h4>
        <div className={styles.presetGrid}>
          {imagePresets.map(preset => (
            <button
              key={preset.id}
              className={`${styles.presetButton} ${
                selectedPreset === preset.id ? styles.presetActive : ''
              }`}
              onClick={() => handlePresetSelect(preset.id)}
            >
              <span className={styles.presetName}>{preset.name}</span>
              <span className={styles.presetDesc}>{preset.description}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.settings}>
        <div className={styles.settingGroup}>
          <label className={styles.settingLabel}>
            图片质量：{quality}%
            <input
              type="range"
              min="10"
              max="100"
              value={quality}
              onChange={(e) => setQuality(parseInt(e.target.value))}
              className={styles.slider}
            />
          </label>
          <div className={styles.sliderLabels}>
            <span>低</span>
            <span>高</span>
          </div>
        </div>

        <div className={styles.settingGroup}>
          <label className={styles.settingLabel}>
            最大宽度：{maxWidth}px
            <input
              type="range"
              min="320"
              max="3840"
              step="160"
              value={maxWidth}
              onChange={(e) => setMaxWidth(parseInt(e.target.value))}
              className={styles.slider}
            />
          </label>
          <div className={styles.sliderLabels}>
            <span>320px</span>
            <span>3840px</span>
          </div>
        </div>

        <div className={styles.settingGroup}>
          <label className={styles.settingLabel}>
            输出格式
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className={styles.select}
            >
              <option value="image/jpeg">JPEG</option>
              <option value="image/png">PNG</option>
              <option value="image/webp">WebP</option>
            </select>
          </label>
        </div>
      </div>

      <button
        onClick={handleCompress}
        disabled={isProcessing}
        className={`${styles.compressButton} ${
          isProcessing ? styles.compressButtonLoading : ''
        }`}
      >
        {isProcessing ? (
          <>
            <span className={styles.spinner}></span>
            处理中...
          </>
        ) : (
          '开始压缩'
        )}
      </button>

      <div className={styles.tips}>
        <h4 className={styles.sectionTitle}>使用建议</h4>
        <ul className={styles.tipList}>
          <li>WebP格式压缩率最高，Chrome/Firefox/Edge浏览器支持</li>
          <li>PNG格式适合需要透明背景的图片</li>
          <li>JPEG格式兼容性最好，适合照片类图片</li>
          <li>建议先压缩再上传到网站，可以显著提升加载速度</li>
        </ul>
      </div>
    </div>
  );
};

export default CompressionControls;