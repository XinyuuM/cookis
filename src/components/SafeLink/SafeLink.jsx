import React, { useState, useEffect } from 'react';
import styles from './SafeLink.module.css';

/**
 * 安全链接组件 - 点击外部链接时显示警告
 * @param {Object} props - 组件属性
 * @param {string} props.href - 链接地址
 * @param {React.ReactNode} props.children - 子元素
 * @param {string} [props.className] - 额外的CSS类名
 * @param {boolean} [props.showIcon=true] - 是否显示外部链接图标
 * @param {string} [props.warningMessage] - 自定义警告消息
 * @param {Object} [props.rest] - 其他HTML属性
 */
export default function SafeLink({
  href,
  children,
  className = '',
  showIcon = true,
  warningMessage,
  ...rest
}) {
  const [showModal, setShowModal] = useState(false);
  const [rememberChoice, setRememberChoice] = useState(false);
  const [hasConfirmed, setHasConfirmed] = useState(false);

  // 检查是否为外部链接
  const isExternal = React.useMemo(() => {
    if (!href) return false;
    
    // 检查是否以 http:// 或 https:// 开头
    const isAbsolute = href.startsWith('http://') || href.startsWith('https://');
    
    if (!isAbsolute) return false;
    
    try {
      const url = new URL(href);
      const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
      
      // 检查是否为相同域名的链接
      return url.origin !== currentOrigin;
    } catch {
      return true;
    }
  }, [href]);

  // 检查是否已经记住选择
  useEffect(() => {
    if (typeof window !== 'undefined' && href) {
      const savedChoice = localStorage.getItem(`safe-link-confirmed:${href}`);
      if (savedChoice === 'true') {
        setHasConfirmed(true);
      }
    }
  }, [href]);

  const handleClick = (e) => {
    if (!isExternal || hasConfirmed) {
      return; // 允许跳转
    }
    
    e.preventDefault();
    setShowModal(true);
  };

  const handleConfirm = () => {
    if (rememberChoice && href) {
      localStorage.setItem(`safe-link-confirmed:${href}`, 'true');
    }
    setHasConfirmed(true);
    setShowModal(false);
    
    // 延迟跳转以确保状态更新
    setTimeout(() => {
      if (href) {
        window.open(href, '_blank', 'noopener,noreferrer');
      }
    }, 100);
  };

  const handleCancel = () => {
    setShowModal(false);
    setRememberChoice(false);
  };

  // 如果没有href或不是外部链接，直接渲染普通链接
  if (!href || !isExternal) {
    return (
      <a href={href} className={`${styles.safeLink} ${className}`} {...rest}>
        {children}
      </a>
    );
  }

  // 如果已经确认过，直接渲染链接
  if (hasConfirmed) {
    return (
      <a
        href={href}
        className={`${styles.safeLink} ${className}`}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
        {showIcon && <span className={styles.safeLinkIcon} aria-hidden="true">↗</span>}
      </a>
    );
  }

  const defaultWarningMessage = `您即将离开本站，切勿在不受信任的网站上透露您的个人信息。`;
  const finalWarningMessage = warningMessage || defaultWarningMessage;

  return (
    <>
      <button
        className={`${styles.safeLink} ${styles.withWarning} ${className}`}
        onClick={handleClick}
        type="button"
        {...rest}
      >
        {children}
        {showIcon && <span className={styles.safeLinkIcon} aria-hidden="true">⚠</span>}
        <span className={styles.visuallyHidden}>（外部链接，点击查看警告）</span>
      </button>

      {showModal && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className={styles.modalDialog}>
            <h2 id="modal-title" className={styles.modalTitle}>
              ⚠️注意：
            </h2>
            
            <div className={styles.modalContent}>
              <p>{finalWarningMessage}</p>
              
              <div className={styles.modalLink}>
                <strong>目标链接：</strong>
                <span>{href}</span>
              </div>

              <label className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  className={styles.checkboxInput}
                  checked={rememberChoice}
                  onChange={(e) => setRememberChoice(e.target.checked)}
                />
                <span className={styles.checkboxLabel}>
                  记住我的选择，不再显示此警告
                </span>
              </label>
            </div>

            <div className={styles.modalActions}>
              <button
                className={`${styles.button} ${styles.buttonSecondary}`}
                onClick={handleCancel}
                autoFocus
              >
                取消
              </button>
              <button
                className={`${styles.button} ${styles.buttonPrimary}`}
                onClick={handleConfirm}
              >
                继续访问
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}