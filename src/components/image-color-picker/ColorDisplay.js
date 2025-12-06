import React, { useState } from 'react';
import styles from './styles.module.css';

export default function ColorDisplay({ color, theme }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(color);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  if (!color) return null;

  return (
    <div 
      className={styles.colorDisplay}
      style={{
        backgroundColor: theme.colors.surfaceContainer,
        borderRadius: theme.shape.large,
        boxShadow: theme.elevation.level1,
      }}
    >
      <div className={styles.colorPreviewSection}>
        <div 
          className={styles.colorPreview}
          style={{
            backgroundColor: color,
            borderRadius: theme.shape.medium,
            boxShadow: theme.elevation.level1,
          }}
        />
        <div className={styles.colorInfo}>
          <span 
            className={styles.colorHex}
            style={{ color: theme.colors.onSurface }}
          >
            {color.toUpperCase()}
          </span>
          <span 
            className={styles.colorLabel}
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            十六进制颜色
          </span>
        </div>
      </div>
      
      <button
        onClick={copyToClipboard}
        className={styles.copyButton}
        style={{
          backgroundColor: copied ? theme.colors.primaryContainer : theme.colors.surfaceVariant,
          color: copied ? theme.colors.onPrimaryContainer : theme.colors.onSurface,
          borderRadius: theme.shape.extraLarge,
          transition: theme.transition,
        }}
      >
        {copied ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            已复制
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
            </svg>
            复制
          </>
        )}
      </button>
    </div>
  );
}