import React from 'react';
import styles from './styles.module.css';

// 简洁的预设调色板 - Material Design 基础颜色
const PRESET_COLORS = [
  '#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE', // 红色系/紫色系
  '#448AFF', '#40C4FF', '#18FFFF', '#64FFDA', '#69F0AE', // 蓝色系/青色系
  '#B2FF59', '#EEFF41', '#FFFF00', '#FFD740', '#FFAB40', // 绿色系/黄色系
  '#FF6E40', '#FF3D00', '#795548', '#9E9E9E', '#607D8B', // 橙色系/中性色
];

export default function ColorPalette({ colors, onColorSelect, theme }) {
  // 合并预设颜色和历史记录颜色（去除重复）
  const allColors = [...PRESET_COLORS, ...(colors || [])].filter(
    (color, index, self) => self.indexOf(color) === index
  ).slice(0, 20); // 限制总数

  if (allColors.length === 0) return null;

  return (
    <div className={styles.colorPalette}>
      <div 
        className={styles.paletteHeader}
        style={{ color: theme.colors.onSurface }}
      >
        <span>调色板</span>
      </div>
      <div className={styles.paletteGrid}>
        {allColors.map((color, index) => (
          <button
            key={`${color}-${index}`}
            className={styles.paletteColor}
            onClick={() => onColorSelect(color)}
            style={{
              backgroundColor: color,
              borderRadius: theme.shape.small,
              border: `2px solid ${theme.colors.surfaceVariant}`,
            }}
            title={color}
            aria-label={`选择颜色 ${color}`}
          />
        ))}
      </div>
      <div 
        className={styles.paletteInfo}
        style={{ color: theme.colors.onSurfaceVariant }}
      >
        点击色块选择颜色，已自动保存最近选取的颜色
      </div>
    </div>
  );
}