import React, { useState, useCallback, useRef } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './styles.module.css';
import ImagePreview from './ImagePreview';
import CompressionControls from './CompressionControls';
import DownloadButton from './DownloadButton';

const ImageCompressor = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [compressionRatio, setCompressionRatio] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  
  const { colorMode } = useColorMode();
  const canvasRef = useRef(null);

  const compressImage = useCallback(async (file, quality, maxWidth, format) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = canvasRef.current || document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // 调整尺寸
          if (maxWidth && width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // 转换为指定格式和质量
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve({
                  blob,
                  width,
                  height,
                  url: URL.createObjectURL(blob)
                });
              } else {
                reject(new Error('压缩失败'));
              }
            },
            format || 'image/jpeg',
            quality
          );
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }, []);

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      setError('请上传图片文件');
      return;
    }

    setError('');
    setFileName(file.name);
    setOriginalSize(file.size);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCompress = async (settings) => {
    if (!originalImage) {
      setError('请先上传图片');
      return;
    }

    setIsProcessing(true);
    try {
      const fileInput = document.createElement('input');
      const file = await new Promise((resolve) => {
        const blob = dataURLtoBlob(originalImage);
        resolve(new File([blob], fileName, { type: 'image/jpeg' }));
      });

      const result = await compressImage(
        file,
        settings.quality / 100,
        settings.maxWidth,
        settings.format
      );

      setCompressedImage(result.url);
      setCompressedSize(result.blob.size);
      
      const ratio = ((1 - result.blob.size / originalSize) * 100).toFixed(1);
      setCompressionRatio(ratio);
    } catch (err) {
      setError(`压缩失败: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const dataURLtoBlob = (dataURL) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const event = { target: { files } };
      handleFileUpload(event);
    }
  };

  return (
    <div className={`${styles.container} ${styles[colorMode]}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>图片压缩</h2>
        <p className={styles.subtitle}>本地处理，安全快速</p>
      </div>

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      <div className={styles.uploadArea}>
        <div
          className={styles.dropzone}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className={styles.fileInput}
            id="image-upload"
          />
          <label htmlFor="image-upload" className={styles.uploadLabel}>
            <div className={styles.uploadIcon}>
              <svg viewBox="0 0 24 24" width="48" height="48">
                <path fill="currentColor" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
              </svg>
            </div>
            <p className={styles.uploadText}>拖拽图片到这里，或点击选择文件</p>
            <p className={styles.uploadHint}>支持 JPG, PNG, GIF, WebP 格式</p>
          </label>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.previewSection}>
          <ImagePreview
            originalImage={originalImage}
            compressedImage={compressedImage}
            originalSize={originalSize}
            compressedSize={compressedSize}
            compressionRatio={compressionRatio}
            fileName={fileName}
          />
        </div>

        <div className={styles.controlsSection}>
          <CompressionControls
            onCompress={handleCompress}
            isProcessing={isProcessing}
          />
          
          {compressedImage && (
            <DownloadButton
              compressedImage={compressedImage}
              fileName={fileName}
              compressedSize={compressedSize}
              originalSize={originalSize}
              compressionRatio={compressionRatio}
            />
          )}
        </div>
      </div>

      {/* 隐藏的Canvas用于处理图片 */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default ImageCompressor;