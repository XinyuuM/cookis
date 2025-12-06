import React, { useState, useEffect } from 'react';
import QSLCard from './QSLCard';
import SearchBar from './SearchBar';
import qslCardsData from '../../data/qslcards';
import styles from './styles.module.css';

function QSLList() {
  const [filteredCards, setFilteredCards] = useState(qslCardsData);
  const [filters, setFilters] = useState({
    search: '',
    mode: 'all',
    band: 'all'
  });

  useEffect(() => {
    filterCards();
  }, [filters]);

  const filterCards = () => {
    let result = [...qslCardsData];

    // 搜索过滤
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(card => 
        card.callSign.toLowerCase().includes(searchLower) ||
        card.myCallSign.toLowerCase().includes(searchLower) ||
        card.theirAddress.toLowerCase().includes(searchLower)
      );
    }

    // 模式过滤
    if (filters.mode !== 'all') {
      result = result.filter(card => card.mode === filters.mode);
    }

    // 波段过滤
    if (filters.band !== 'all') {
      result = result.filter(card => card.band === filters.band);
    }

    setFilteredCards(result);
  };

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  return (
    <div className={styles.qslContainer}>
      <SearchBar 
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        totalCards={filteredCards.length}
      />
      
      <div className={styles.resultsInfo}>
        <span>找到 {filteredCards.length} 张卡片</span>
        {filters.search && (
          <span className={styles.searchTerm}>
            搜索: "{filters.search}"
          </span>
        )}
      </div>
      
      {filteredCards.length === 0 ? (
        <div className={styles.noResults}>
          <div className={styles.noResultsIcon}>📭</div>
          <h3>未找到匹配的QSL卡片</h3>
          <p>请尝试不同的搜索词或筛选条件</p>
        </div>
      ) : (
        <div className={styles.qslGrid}>
          {filteredCards.map((card) => (
            <QSLCard key={card.id} card={card} />
          ))}
        </div>
      )}
      
      <div className={styles.summarySection}>
        <h4>统计数据</h4>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{qslCardsData.length}</span>
            <span className={styles.statLabel}>总卡片数</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>
              {[...new Set(qslCardsData.map(card => card.mode))].length}
            </span>
            <span className={styles.statLabel}>不同模式</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>
              {[...new Set(qslCardsData.map(card => card.band))].length}
            </span>
            <span className={styles.statLabel}>不同波段</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>
              {[...new Set(qslCardsData.map(card => card.theirAddress.split(',')[0]))].length}
            </span>
            <span className={styles.statLabel}>国家/地区</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QSLList;