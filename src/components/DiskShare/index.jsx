// src/component/DiskShare.js
import React, { useState, useEffect, useRef } from 'react';
import styles from './disk-share.module.css';
import diskFiles from '@site/src/data/diskfiles';

// 图标组件
const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
  </svg>
);

const LinkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z"/>
  </svg>
);

const DiskShare = () => {
  const [files, setFiles] = useState(diskFiles);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [quickJumpId, setQuickJumpId] = useState('');
  const [highlightedFile, setHighlightedFile] = useState(null);
  const fileRefs = useRef({});

  // 处理搜索和过滤
  useEffect(() => {
    let filtered = diskFiles;
    
    // 按搜索词过滤
    if (searchTerm) {
      filtered = filtered.filter(file => 
        file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // 按状态过滤
    if (filterStatus !== 'all') {
      filtered = filtered.filter(file => file.status === filterStatus);
    }
    
    setFiles(filtered);
  }, [searchTerm, filterStatus]);

  // 快速跳转到指定ID
  const handleQuickJump = () => {
    if (!quickJumpId.trim()) return;
    
    const fileId = quickJumpId.trim().toUpperCase();
    const fileElement = fileRefs.current[fileId];
    
    if (fileElement) {
      // 高亮显示
      setHighlightedFile(fileId);
      setTimeout(() => setHighlightedFile(null), 2000);
      
      // 滚动到元素
      fileElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    } else {
      alert(`未找到文件ID: ${fileId}`);
    }
  };

  // 处理键盘事件
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleQuickJump();
    }
  };

  // 复制密码到剪贴板
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('密码已复制到剪贴板');
    }).catch(err => {
      console.error('复制失败: ', err);
    });
  };

  // 打开下载链接
  const openDownloadLink = (link, fileId) => {
    if (link) {
      window.open(link, '_blank');
    } else {
      alert(`文件 ${fileId} 的链接不可用`);
    }
  };

  // 报告链接失效
  const reportLinkFailure = (fileId, fileName) => {
    const confirmReport = window.confirm(`确认报告文件 "${fileName}" 的链接失效吗？`);
    if (confirmReport) {
      alert(`请向report@xinyuu.cn报告· ${fileId} 的文件ID链接失效，管理员会将尽快处理`);
      // 这里可以添加实际的API调用
    }
  };

  // 获取状态显示文本和样式
  const getStatusInfo = (status) => {
    switch(status) {
      case 'available':
        return { text: '可用', className: styles.statusAvailable };
      case 'expired':
        return { text: '已过期', className: styles.statusExpired };
      case 'linkFailed':
        return { text: '链接失效', className: styles.statusLinkFailed };
      default:
        return { text: '未知', className: styles.statusAvailable };
    }
  };

  return (
    <div className={styles.diskShareContainer}>
      {/* 搜索和过滤区域 */}
      <div className={styles.searchSection}>
        <div className={styles.searchHeader}>
          <h1 className={styles.title}>公开文件</h1>
          <div className={styles.totalFiles}>
            共 {files.length} 个文件
          </div>
        </div>
        
        <div className={styles.searchControls}>
          <div className={styles.searchBox}>
            <div className={styles.searchIcon}>
              <SearchIcon />
            </div>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="搜索文件名称、ID、描述或标签..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className={styles.quickJumpBox}>
            <input
              type="text"
              className={styles.quickJumpInput}
              placeholder="输入文件ID跳转"
              value={quickJumpId}
              onChange={(e) => setQuickJumpId(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              className={styles.primaryButton}
              onClick={handleQuickJump}
              style={{ padding: '12px 20px' }}
            >
              快速定位
            </button>
          </div>
        </div>
        
        <div className={styles.filterControls}>
          <button 
            className={`${styles.filterButton} ${filterStatus === 'all' ? styles.active : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            全部文件
          </button>
          <button 
            className={`${styles.filterButton} ${filterStatus === 'available' ? styles.active : ''}`}
            onClick={() => setFilterStatus('available')}
          >
            可用文件
          </button>
          <button 
            className={`${styles.filterButton} ${filterStatus === 'expired' ? styles.active : ''}`}
            onClick={() => setFilterStatus('expired')}
          >
            已过期
          </button>
          <button 
            className={`${styles.filterButton} ${filterStatus === 'linkFailed' ? styles.active : ''}`}
            onClick={() => setFilterStatus('linkFailed')}
          >
            链接失效
          </button>
        </div>
      </div>
      
      {/* 文件卡片网格 */}
      <div className={styles.cardsGrid}>
        {files.length > 0 ? (
          files.map((file) => {
            const statusInfo = getStatusInfo(file.status);
            
            return (
              <div 
                key={file.id}
                ref={el => fileRefs.current[file.id] = el}
                className={`${styles.fileCard} ${highlightedFile === file.id ? styles.highlighted : ''}`}
                id={`file-card-${file.id}`}
              >
                {/* 卡片头部 */}
                <div className={styles.cardHeader}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 className={styles.cardTitle}>{file.name}</h3>
                    <span className={`${styles.statusIndicator} ${statusInfo.className}`}>
                      {statusInfo.text}
                    </span>
                  </div>
                  <div className={styles.fileId}>ID: {file.id}</div>
                  <p className={styles.cardDescription}>{file.description}</p>
                  
                  {/* 标签 */}
                  <div className={styles.tagsContainer}>
                    <span className={styles.tag}>{file.category}</span>
                    {file.tags.map(tag => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                
                {/* 卡片内容 */}
                <div className={styles.cardContent}>
                  <div className={styles.fileInfo}>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>文件大小</span>
                      <span className={styles.infoValue}>{file.size}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>上传日期</span>
                      <span className={styles.infoValue}>{file.uploadDate}</span>
                    </div>
                  </div>
                  
                  <div className={styles.passwordGroup}>
                    <div className={styles.passwordItem}>
                      <div className={styles.passwordLabel}>解压密码</div>
                      <div className={styles.passwordValue}>{file.extractPassword}</div>
                      <button 
                        className={styles.copyButton}
                        onClick={() => copyToClipboard(file.extractPassword)}
                      >
                        <CopyIcon /> 复制
                      </button>
                    </div>
                    
                    <div className={styles.passwordItem}>
                      <div className={styles.passwordLabel}>提取密码</div>
                      <div className={styles.passwordValue}>{file.downloadPassword}</div>
                      <button 
                        className={styles.copyButton}
                        onClick={() => copyToClipboard(file.downloadPassword)}
                      >
                        <CopyIcon /> 复制
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* 卡片底部 - 操作按钮 */}
                <div className={styles.cardFooter}>
                  <div className={styles.actionButtons}>
                    <button 
                      className={styles.primaryButton}
                      onClick={() => openDownloadLink(file.downloadLink, file.id)}
                      disabled={file.status === 'linkFailed'}
                    >
                      <DownloadIcon /> 下载
                    </button>
                    
                    {file.backupLink && (
                      <button 
                        className={styles.secondaryButton}
                        onClick={() => openDownloadLink(file.backupLink, file.id)}
                      >
                        <LinkIcon /> 备用链接
                      </button>
                    )}
                    
                    {file.status === 'linkFailed' && (
                      <button 
                        className={styles.dangerButton}
                        onClick={() => reportLinkFailure(file.id, file.name)}
                      >
                        报告失效
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📁</div>
            <h3>未找到匹配的文件</h3>
            <p>尝试使用不同的搜索词或筛选条件</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiskShare;