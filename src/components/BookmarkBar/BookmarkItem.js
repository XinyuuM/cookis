import React from 'react';
import styles from './styles.module.css';

export default function BookmarkItem({ item, iconComponents, compact = false }) {
  const IconComponent = iconComponents[item.icon];
  
  const handleClick = (e) => {
    console.log(`打开书签: ${item.title}`);
  };

  return (
    <a
      href={item.url}
      className={styles.bookmarkItem}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      title={item.description}
    >
      <div className={styles.itemIcon}>
        {IconComponent ? (
          <IconComponent size={compact ? 16 : 20} />
        ) : (
          <span className={styles.defaultIcon}>🔗</span>
        )}
      </div>
      <div className={styles.itemContent}>
        <h4 className={styles.itemTitle}>{item.title}</h4>
        {item.description && !compact && (
          <p className={styles.itemDescription}>{item.description}</p>
        )}
      </div>
    </a>
  );
}