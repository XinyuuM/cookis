import React, { useState } from 'react';
import styles from './styles.module.css';
import BookmarkItem from './BookmarkItem';
import bookmarkData from '@site/src/data/bookmarks';

// 图标映射（使用react-icons）
import { 
   FaChrome,
   FaVideo,
   
   
} from 'react-icons/fa';

const iconComponents = {
   FaChrome,
   FaVideo,
};

export default function BookmarkBar({ compact = false }) {
  const [activeCategory, setActiveCategory] = useState(bookmarkData[0]?.id);

  return (
    <div className={`${styles.bookmarkBar} ${compact ? styles.compact : ''}`}>
      {/* 分类标签 */}
      <div className={styles.categoryTabs}>
        {bookmarkData.map(category => {
          const IconComponent = iconComponents[category.icon];
          return (
            <button
              key={category.id}
              className={`${styles.categoryTab} ${
                activeCategory === category.id ? styles.active : ''
              }`}
              onClick={() => setActiveCategory(category.id)}
              title={category.title}
            >
              {IconComponent && <IconComponent />}
              {!compact && <span>{category.title}</span>}
            </button>
          );
        })}
      </div>

      {/* 书签列表 */}
      <div className={styles.bookmarkGrid}>
        {bookmarkData
          .find(cat => cat.id === activeCategory)
          ?.items.map(item => (
            <BookmarkItem 
              key={item.title} 
              item={item} 
              iconComponents={iconComponents}
              compact={compact}
            />
          ))}
      </div>
    </div>
  );
}