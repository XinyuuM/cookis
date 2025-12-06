import React, { useState, useMemo } from 'react';
import MarkCard from './MarkCard';
import { IconComponent } from './IconMapper';
import styles from './styles.module.css';

const MarkCardGrid = ({ 
  cards = [], 
  title = "资源卡片",
  emptyMessage = "暂无数据",
  searchPlaceholder = "搜索卡片...",
  showSearch = true,
  gridClassName = '',
  cardClassName = ''
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // 过滤卡片
  const filteredCards = useMemo(() => {
    if (!searchQuery.trim()) return cards;
    
    const query = searchQuery.toLowerCase();
    return cards.filter(card => 
      card.title.toLowerCase().includes(query) ||
      (card.description && card.description.toLowerCase().includes(query)) ||
      (card.tags && card.tags.some(tag => tag.toLowerCase().includes(query)))
    );
  }, [cards, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className={styles.markCardContainer}>
      {showSearch && (
        <div className={styles.searchContainer}>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="搜索卡片"
            />
            {searchQuery && (
              <button 
                className={styles.clearButton}
                onClick={clearSearch}
                aria-label="清除搜索"
              >
                <IconComponent 
                  iconType="close" 
                  size="1rem"
                />
              </button>
            )}
          </div>
        </div>
      )}

      {filteredCards.length > 0 ? (
        <div className={`${styles.cardsGrid} ${gridClassName}`}>
          {filteredCards.map((card) => (
            <MarkCard
              key={card.id || `${card.title}-${card.link}`}
              title={card.title}
              link={card.link}
              iconType={card.iconType}
              description={card.description}
              className={cardClassName}
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>
            <IconComponent 
              iconType="search" 
              size="3rem"
            />
          </div>
          <h3>{emptyMessage}</h3>
          {cards.length > 0 && searchQuery && (
            <p>没有找到匹配 "{searchQuery}" 的内容，请尝试其他关键词</p>
          )}
          {cards.length === 0 && (
            <p>暂时没有可用的卡片数据</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MarkCardGrid;