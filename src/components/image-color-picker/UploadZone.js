import React, { useCallback } from 'react';
import styles from './styles.module.css';

export default function UploadZone({ onImageUpload, theme }) {
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      processFile(file);
    }
  }, [onImageUpload]);

  const handleChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  }, [onImageUpload]);

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      onImageUpload(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div 
      className={styles.uploadZone}
      style={{
        backgroundColor: theme.colors.surfaceContainer,
        borderColor: theme.colors.outline,
        borderRadius: theme.shape.large,
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <svg 
        className={styles.uploadIcon}
        style={{ color: theme.colors.onSurfaceVariant }}
        width="48" 
        height="48" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
      
      <div className={styles.uploadText}>
        <span style={{ color: theme.colors.onSurface }}>
          拖放图片或点击上传
        </span>
        <span 
          className={styles.uploadSubtext}
          style={{ color: theme.colors.onSurfaceVariant }}
        >
          支持 JPG、PNG、WebP 格式
        </span>
      </div>
      
      <label className={styles.uploadButton}>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className={styles.fileInput}
        />
        <span 
          className={styles.buttonLabel}
          style={{
            backgroundColor: theme.colors.primary,
            color: 'white',
            borderRadius: theme.shape.extraLarge,
          }}
        >
          选择图片
        </span>
      </label>
    </div>
  );
}