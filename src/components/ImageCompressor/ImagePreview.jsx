import React from 'react';
import styles from './styles.module.css';

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const ImagePreview = ({
  originalImage,
  compressedImage,
  originalSize,
  compressedSize,
  compressionRatio,
  fileName
}) => {
  return (
    <div className={styles.previewContainer}>
      <div className={styles.previewHeader}>
        <h3 className={styles.previewTitle}>图片预览</h3>
        {fileName && (
          <span className={styles.fileName}>{fileName}</span>
        )}
      </div>

      <div className={styles.imageGrid}>
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapper}>
            {originalImage ? (
              <img
                src={originalImage}
                alt="原始图片"
                className={styles.image}
              />
            ) : (
              <div className={styles.placeholder}>
                <span>原始图片</span>
              </div>
            )}
          </div>
          <div className={styles.imageInfo}>
            <span className={styles.infoLabel}>原始大小：</span>
            <span className={styles.infoValue}>
              {originalSize ? formatFileSize(originalSize) : '--'}
            </span>
          </div>
        </div>

        <div className={styles.separator}>
          <div className={styles.arrow}>→</div>
        </div>

        <div className={styles.imageColumn}>
          <div className={styles.imageWrapper}>
            {compressedImage ? (
              <img
                src={compressedImage}
                alt="压缩后图片"
                className={styles.image}
              />
            ) : (
              <div className={styles.placeholder}>
                <span>压缩后图片</span>
              </div>
            )}
          </div>
          <div className={styles.imageInfo}>
            <span className={styles.infoLabel}>压缩后：</span>
            <span className={styles.infoValue}>
              {compressedSize ? formatFileSize(compressedSize) : '--'}
            </span>
            {compressionRatio > 0 && (
              <span className={styles.ratio}>
                （减少 {compressionRatio}%）
              </span>
            )}
          </div>
        </div>
      </div>

      {compressionRatio > 0 && (
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>压缩率</span>
            <span className={styles.statValue}>{compressionRatio}%</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>节省空间</span>
            <span className={styles.statValue}>
              {formatFileSize(originalSize - compressedSize)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;