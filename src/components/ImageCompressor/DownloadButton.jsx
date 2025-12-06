import React from 'react';
import styles from './styles.module.css';

const DownloadButton = ({
  compressedImage,
  fileName,
  compressedSize,
  originalSize,
  compressionRatio
}) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = compressedImage;
    
    // 获取文件扩展名
    const extension = compressedImage.split(';')[0].split('/')[1];
    const baseName = fileName.split('.')[0];
    link.download = `${baseName}_compressed.${extension}`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.downloadContainer}>
      <div className={styles.downloadInfo}>
        <div className={styles.infoRow}>
          <span>压缩完成！</span>
          <span className={styles.ratioBadge}>节省 {compressionRatio}%</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.sizeInfo}>
            原始: {(originalSize / 1024).toFixed(1)}KB → 
            压缩后: {(compressedSize / 1024).toFixed(1)}KB
          </span>
        </div>
      </div>
      <button onClick={handleDownload} className={styles.downloadButton}>
        <svg viewBox="0 0 24 24" width="20" height="20" className={styles.downloadIcon}>
          <path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
        </svg>
        下载图片
      </button>
    </div>
  );
};

export default DownloadButton;