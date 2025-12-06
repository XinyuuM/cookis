import React from 'react';
import styles from './styles.module.css';

function QSLCard({ card }) {
  return (
    <div id={`card-${card.callSign}`} className={styles.qslCard}>
      <div className={styles.qslHeader}>
        <h3 className={styles.callSign}>呼号: {card.callSign}</h3>
        <span className={styles.qslBadge}>QSL Card</span>
      </div>
      
      <div className={styles.qslBody}>
        <div className={styles.gridContainer}>
          <div className={styles.infoSection}>
            <h4 className={styles.sectionTitle}>联系信息</h4>
            <div className={styles.infoRow}>
              <span className={styles.label}>日期:</span>
              <span className={styles.value}>{card.date}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>时间 (UTC+8):</span>
              <span className={styles.value}>{card.time}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>频率:</span>
              <span className={styles.value}>{card.frequency}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>波段:</span>
              <span className={styles.value}>{card.band}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>模式:</span>
              <span className={styles.value}>{card.mode}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>RST:</span>
              <span className={`${styles.value} ${styles.rstBadge}`}>{card.rst}</span>
            </div>
          </div>
          
          <div className={styles.infoSection}>
            <h4 className={styles.sectionTitle}>设备信息</h4>
            <div className={styles.infoRow}>
              <span className={styles.label}>对方设备:</span>
              <span className={styles.value}>{card.theirEquipment}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>我方设备:</span>
              <span className={styles.value}>{card.myEquipment}</span>
            </div>
          </div>
          
          <div className={styles.infoSection}>
            <h4 className={styles.sectionTitle}>位置信息</h4>
            <div className={styles.infoRow}>
              <span className={styles.label}>对方地址:</span>
              <span className={styles.value}>{card.theirAddress}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>我方地址:</span>
              <span className={styles.value}>{card.myAddress}</span>
            </div>
          </div>
        </div>
        
        {card.comments && (
          <div className={styles.commentsSection}>
            <h4 className={styles.sectionTitle}>备注</h4>
            <p className={styles.comments}>{card.comments}</p>
          </div>
        )}
        
        <div className={styles.callSignSection}>
          <div className={styles.callSignPair}>
            <div className={styles.callSignBox}>
              <span className={styles.callSignLabel}>对方呼号</span>
              <span className={styles.callSignValue}>{card.callSign}</span>
            </div>
            <div className={styles.arrow}>⇄</div>
            <div className={styles.callSignBox}>
              <span className={styles.callSignLabel}>我方呼号</span>
              <span className={styles.callSignValue}>{card.myCallSign}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QSLCard;