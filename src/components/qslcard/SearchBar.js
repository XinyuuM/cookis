import React, { useState } from 'react';
import styles from './styles.module.css';

function SearchBar({ onSearch, onFilterChange, totalCards }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [modeFilter, setModeFilter] = useState('all');
  const [bandFilter, setBandFilter] = useState('all');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleModeChange = (e) => {
    const value = e.target.value;
    setModeFilter(value);
    onFilterChange('mode', value);
  };

  const handleBandChange = (e) => {
    const value = e.target.value;
    setBandFilter(value);
    onFilterChange('band', value);
  };

  const handleQuickSearch = (callSign) => {
    setSearchTerm(callSign);
    onSearch(callSign);
    // 滚动到对应卡片
    const element = document.getElementById(`card-${callSign}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      element.classList.add(styles.highlight);
      setTimeout(() => {
        element.classList.remove(styles.highlight);
      }, 2000);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchHeader}>
        <h2>曦语卡片查询</h2>
        <span className={styles.totalCards}>共 {totalCards} 张卡片</span>
      </div>
      
      <div className={styles.searchBar}>
        <div className={styles.searchInputGroup}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="输入呼号进行搜索 (例如: BH1ABC)"
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.filterGroup}>
          <select 
            value={modeFilter} 
            onChange={handleModeChange}
            className={styles.filterSelect}
          >
            <option value="all">所有模式</option>
            <option value="SSB">SSB</option>
            <option value="CW">CW</option>
            <option value="FM">FM</option>
          </select>
          
          <select 
            value={bandFilter} 
            onChange={handleBandChange}
            className={styles.filterSelect}
          >
            <option value="all">所有波段</option>
            <option value="70cm">70cm</option>
            <option value="2m">2m</option>
          </select>
        </div>
      </div>
      
      
    </div>
  );
}

export default SearchBar;