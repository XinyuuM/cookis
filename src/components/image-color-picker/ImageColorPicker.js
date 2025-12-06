import React, { useState, useRef, useEffect } from 'react';
import { colorPickerTheme } from '@site/src/data/color-picker-theme';
import UploadZone from './UploadZone';
import ColorDisplay from './ColorDisplay';
import ColorPalette from './ColorPalette';
import styles from './styles.module.css';

// localStorage 键名
const STORAGE_KEY = 'image-color-picker-history';

export default function ImageColorPicker() {
  const [imageSrc, setImageSrc] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [colorHistory, setColorHistory] = useState([]);
  const [error, setError] = useState(null);
  
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  // 初始化：加载保存的颜色历史
  useEffect(() => {
    const savedHistory = localStorage.getItem(STORAGE_KEY);
    if (savedHistory) {
      try {
        setColorHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('加载颜色历史失败:', e);
      }
    }
  }, []);

  // 加载Material 3 CSS变量
  useEffect(() => {
    import('@site/src/css/material3-vars.css');
  }, []);

  const handleImageUpload = (src) => {
    setImageSrc(src);
    setError(null);
    setSelectedColor(null);
  };

  const handleImageClick = (e) => {
    if (!imageSrc || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = e.currentTarget.getBoundingClientRect();
    
    // 计算点击位置
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // 确保canvas尺寸与显示图片一致
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // 绘制图片到canvas
    const img = imageRef.current;
    if (!img) return;
    
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    // 获取像素颜色
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hexColor = rgbToHex(pixel[0], pixel[1], pixel[2]);
    
    setSelectedColor(hexColor);
    addToHistory(hexColor);
  };

  const rgbToHex = (r, g, b) => {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  // 添加到历史记录并保存到localStorage
  const addToHistory = (color) => {
    setColorHistory(prev => {
      // 移除重复项，新颜色放在最前面，限制最多10个
      const newHistory = [color, ...prev.filter(c => c !== color)].slice(0, 10);
      // 保存到localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    addToHistory(color);
  };

  const handleImageError = () => {
    setError('图片加载失败，请重新上传');
  };

  return (
    <div 
      className={styles.container}
      style={{
        backgroundColor: colorPickerTheme.colors.surface,
        color: colorPickerTheme.colors.onSurface,
      }}
    >
      <div className={styles.header}>
        <h3 
          className={styles.title}
          style={colorPickerTheme.typography.titleLarge}
        >
          图片拾色器
        </h3>
        <p 
          className={styles.subtitle}
          style={{ color: colorPickerTheme.colors.onSurfaceVariant }}
        >
          上传图片，点击任意位置获取颜色代码
        </p>
      </div>

      {!imageSrc ? (
        <UploadZone 
          onImageUpload={handleImageUpload} 
          theme={colorPickerTheme}
        />
      ) : (
        <div className={styles.imageSection}>
          <div 
            className={styles.imageWrapper}
            style={{
              borderRadius: colorPickerTheme.shape.large,
              overflow: 'hidden',
              boxShadow: colorPickerTheme.elevation.level2,
            }}
            onClick={handleImageClick}
          >
            <img
              ref={imageRef}
              src={imageSrc}
              alt="拾色图片"
              className={styles.image}
              onError={handleImageError}
              crossOrigin="anonymous"
            />
            <div className={styles.imageOverlay}></div>
            <canvas 
              ref={canvasRef} 
              style={{ display: 'none' }}
            />
          </div>
          
          {/* 图片外部提示文字 */}
          {imageSrc && (
            <div 
              className={styles.imageTip}
              style={{ color: colorPickerTheme.colors.onSurfaceVariant }}
            >
              点击图片任意位置拾取颜色
            </div>
          )}
          
          {error && (
            <div 
              className={styles.error}
              style={{
                backgroundColor: colorPickerTheme.colors.error + '20',
                borderColor: colorPickerTheme.colors.error,
                color: colorPickerTheme.colors.error,
                borderRadius: colorPickerTheme.shape.medium,
              }}
            >
              {error}
            </div>
          )}
        </div>
      )}

      <div className={styles.controls}>
        {selectedColor && (
          <ColorDisplay 
            color={selectedColor} 
            theme={colorPickerTheme}
          />
        )}
        
        <ColorPalette 
          colors={colorHistory}
          onColorSelect={handleColorSelect}
          theme={colorPickerTheme}
        />
        
        {imageSrc && (
          <button
            onClick={() => {
              setImageSrc(null);
              setSelectedColor(null);
            }}
            className={styles.resetButton}
            style={{
              backgroundColor: colorPickerTheme.colors.surfaceVariant,
              color: colorPickerTheme.colors.onSurface,
              borderRadius: colorPickerTheme.shape.extraLarge,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
            上传新图片
          </button>
        )}
      </div>
    </div>
  );
}