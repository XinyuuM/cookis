import React from 'react';
import { IconComponent } from './IconMapper';
import styles from './styles.module.css';

const MarkCard = ({ 
  title, 
  link, 
  iconType, 
  description,
  className = '',
  onClick 
}) => {
  const handleCardClick = (e) => {
    // 阻止默认行为，防止<a>标签的跳转
    e.preventDefault();
    e.stopPropagation();

    if (onClick) {
      onClick(e);
    } else if (link) {
      if (link.startsWith('http')) {
        window.open(link, '_blank', 'noopener noreferrer');
      } else {
        window.location.href = link;
      }
    }
  };

  return (
    <div 
      className={`${styles.markCard} ${className}`} 
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCardClick(e);
        }
      }}
    >
      <a 
        href={link} 
        className={styles.cardLink} 
        aria-label={`访问 ${title}`}
        title={description || title}
        onClick={(e) => e.preventDefault()} // 额外防止默认行为
      />
      <div className={styles.cardContent}>
        <div className={styles.cardIcon}>
          <IconComponent 
            iconType={iconType} 
            title={title}
            className={styles.icon}
            size="1.5em"
          />
        </div>
        <div className={styles.cardInfo}>
          <h3 className={styles.cardTitle}>{title}</h3>
          {description && (
            <p className={styles.cardDescription}>{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarkCard;