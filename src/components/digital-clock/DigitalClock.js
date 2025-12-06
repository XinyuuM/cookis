import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './DigitalClock.module.css';

// 苏宁HTTPS时间API
const SUNING_TIME_API = 'https://quan.suning.com/getSysTime.do';

const DigitalClock = ({ 
  showTimezoneSelector = true,
  showDate = true,
  showSeconds = true,
  autoSwitch = true,
  primaryColor,
  secondaryColor,
  compactMode = false
}) => {
  // 状态声明
  const [time, setTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [useNetworkTime, setUseNetworkTime] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTimezone, setSelectedTimezone] = useState('Asia/Shanghai');
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isOnline, setIsOnline] = useState(true);
  
  // 使用 ref 存储基准时间，避免在依赖数组中引起不必要的更新
  const baseTimeRef = useRef({
    networkTime: null,
    localReference: null,
    offset: 0
  });

  // 检查网络状态
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // 网络恢复后尝试重新同步
      if (useNetworkTime) {
        fetchSuningTime();
      }
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setError('网络连接已断开，使用本地时间');
      setUseNetworkTime(false);
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [useNetworkTime]);

  // 解析苏宁API时间数据
  const parseSuningTime = (data) => {
    if (!data || typeof data !== 'object') {
      throw new Error('无效的API响应数据');
    }
    
    // 优先使用sysTime2格式 (YYYY-MM-DD HH:MM:SS)
    if (data.sysTime2) {
      // 格式: "2025-12-06 15:57:37"
      const [datePart, timePart] = data.sysTime2.split(' ');
      const [year, month, day] = datePart.split('-').map(Number);
      const [hours, minutes, seconds] = timePart.split(':').map(Number);
      
      // 注意: JS中月份是从0开始的 (0 = 一月, 11 = 十二月)
      return new Date(year, month - 1, day, hours, minutes, seconds).getTime();
    }
    
    // 备选: 解析sysTime1格式 (YYYYMMDDHHMMSS)
    if (data.sysTime1) {
      // 格式: "20251206155737"
      const timeStr = data.sysTime1;
      if (timeStr.length !== 14) {
        throw new Error('sysTime1格式不正确');
      }
      
      const year = parseInt(timeStr.substring(0, 4), 10);
      const month = parseInt(timeStr.substring(4, 6), 10) - 1;
      const day = parseInt(timeStr.substring(6, 8), 10);
      const hours = parseInt(timeStr.substring(8, 10), 10);
      const minutes = parseInt(timeStr.substring(10, 12), 10);
      const seconds = parseInt(timeStr.substring(12, 14), 10);
      
      return new Date(year, month, day, hours, minutes, seconds).getTime();
    }
    
    throw new Error('API响应中未找到时间数据');
  };

  // 获取苏宁网络时间 - 仅用于同步基准时间
  const fetchSuningTime = useCallback(async () => {
    if (!useNetworkTime || !isOnline) return false;

    setIsLoading(true);
    setError(null);

    try {
      const startTime = Date.now();
      
      // 创建AbortController和超时
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(SUNING_TIME_API, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-store',
        headers: {
          'Accept': 'application/json',
          'Pragma': 'no-cache',
          'Cache-Control': 'no-cache'
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP错误: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const endTime = Date.now();
      const roundTripTime = endTime - startTime;

      // 解析苏宁时间
      const serverTime = parseSuningTime(data);
      
      // 补偿网络延迟（取往返时间的一半）
      const compensatedTime = serverTime + (roundTripTime / 2);
      const networkTimeObj = new Date(compensatedTime);
      
      // 验证时间有效性
      const timeDiff = Math.abs(networkTimeObj.getTime() - Date.now());
      if (timeDiff > 60000) { // 如果与本地时间相差超过1分钟
        console.warn('网络时间与本地时间差异较大:', timeDiff, 'ms');
      }
      
      // 更新基准时间引用
      baseTimeRef.current = {
        networkTime: networkTimeObj,
        localReference: Date.now(),
        offset: compensatedTime - Date.now()
      };
      
      setLastSyncTime(new Date());
      setRetryCount(0);
      setIsLoading(false);
      
      return true;
      
    } catch (err) {
      clearTimeout(timeoutId);
      console.error('获取苏宁时间失败:', err);
      
      let errorMessage = '';
      
      if (err.name === 'AbortError') {
        errorMessage = '请求超时，请检查网络连接';
      } else if (!isOnline) {
        errorMessage = '网络连接已断开';
      } else if (err.message.includes('Failed to fetch')) {
        errorMessage = '无法连接到时间服务器';
      } else {
        errorMessage = `时间同步失败: ${err.message}`;
      }
      
      setError(errorMessage);
      setRetryCount(prev => prev + 1);
      
      // 如果连续失败3次，自动切换到本地时间
      if (retryCount >= 2 && autoSwitch) {
        setUseNetworkTime(false);
        setError(`${errorMessage}，已自动切换到本地时间`);
      }
      
      setIsLoading(false);
      return false;
    }
  }, [useNetworkTime, isOnline, retryCount, autoSwitch]);

  // 时间格式化函数
  const formatTime = (date, timezone) => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      return { 
        time: '--:--:--', 
        date: '加载中...', 
        period: '--',
        hour24: 0
      };
    }

    try {
      const options = {
        timeZone: timezone,
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      };
      
      if (showSeconds) {
        options.second = '2-digit';
      }
      
      const timeStr = date.toLocaleTimeString('zh-CN', options);

      const dateStr = date.toLocaleDateString('zh-CN', {
        timeZone: timezone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      const hour24 = new Date(date.toLocaleString('en-US', { timeZone: timezone })).getHours();
      let period = '';
      
      if (hour24 < 6) {
        period = '凌晨';
      } else if (hour24 < 12) {
        period = '上午';
      } else if (hour24 < 13) {
        period = '中午';
      } else if (hour24 < 18) {
        period = '下午';
      } else {
        period = '晚上';
      }

      return {
        time: timeStr,
        date: dateStr,
        period,
        hour24
      };
    } catch (err) {
      console.error('时间格式化错误:', err);
      return { 
        time: '格式错误', 
        date: '时区可能不支持', 
        period: '--',
        hour24: 0
      };
    }
  };

  // 更新时间 - 基于基准时间计算当前时间
  const updateTime = useCallback(() => {
    let currentTime;
    
    // 根据时间源选择计算方式
    if (useNetworkTime && baseTimeRef.current.networkTime && baseTimeRef.current.localReference) {
      // 基于基准时间和流逝的时间计算当前时间
      const elapsed = Date.now() - baseTimeRef.current.localReference;
      currentTime = new Date(baseTimeRef.current.networkTime.getTime() + elapsed);
    } else {
      // 使用纯本地时间
      currentTime = new Date();
    }

    // 转换为选定时区的时间
    try {
      // 使用Intl.DateTimeFormat进行时区转换，更可靠
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: selectedTimezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      
      const parts = formatter.formatToParts(currentTime);
      const getPart = (type) => parts.find(part => part.type === type)?.value;
      
      const year = getPart('year');
      const month = getPart('month');
      const day = getPart('day');
      const hour = getPart('hour');
      const minute = getPart('minute');
      const second = getPart('second');
      
      const timeInTimezone = new Date(
        `${year}-${month}-${day}T${hour}:${minute}:${second}`
      );
      
      setTime(timeInTimezone);
    } catch (err) {
      console.error('时区转换错误:', err);
      setTime(currentTime); // 如果时区转换失败，使用原始时间
    }
  }, [useNetworkTime, selectedTimezone]);

  // 初始加载：获取网络时间并设置定时器
  useEffect(() => {
    // 初始获取网络时间
    if (useNetworkTime && isOnline) {
      fetchSuningTime();
    } else {
      // 使用本地时间作为基准
      baseTimeRef.current = {
        networkTime: new Date(),
        localReference: Date.now(),
        offset: 0
      };
    }
    
    // 设置本地时间更新定时器（每秒更新）
    const timeUpdateInterval = setInterval(() => {
      updateTime();
    }, 1000);
    
    return () => clearInterval(timeUpdateInterval);
  }, [useNetworkTime, isOnline, updateTime]);

  // 定期网络同步（每5分钟），独立于秒数更新
  useEffect(() => {
    if (!useNetworkTime || !isOnline) return;
    
    const syncInterval = setInterval(() => {
      if (!isLoading) {
        fetchSuningTime();
      }
    }, 300000); // 5分钟
    
    return () => clearInterval(syncInterval);
  }, [useNetworkTime, isLoading, fetchSuningTime, isOnline]);

  // 时区切换
  const handleTimezoneChange = (e) => {
    setSelectedTimezone(e.target.value);
  };

  // 切换时间源
  const toggleTimeSource = () => {
    const newUseNetworkTime = !useNetworkTime;
    setUseNetworkTime(newUseNetworkTime);
    
    if (newUseNetworkTime && isOnline) {
      setError(null);
      fetchSuningTime();
    } else {
      // 切换到本地时间，重置基准时间为当前本地时间
      baseTimeRef.current = {
        networkTime: new Date(),
        localReference: Date.now(),
        offset: 0
      };
    }
  };

  // 重试获取网络时间
  const handleRetry = () => {
    setError(null);
    setRetryCount(0);
    fetchSuningTime();
  };

  const formattedTime = formatTime(time, selectedTimezone);
  const timezoneOptions = require('@site/src/data/timezones.json');

  // 计算下次同步时间
  const getNextSyncTime = () => {
    if (!lastSyncTime) return null;
    const nextSync = new Date(lastSyncTime.getTime() + 300000); // 5分钟后
    return nextSync.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  };

  // 获取当前时间偏移信息
  const getOffsetInfo = () => {
    const offset = baseTimeRef.current.offset;
    if (Math.abs(offset) < 1000) {
      return `${Math.round(offset)}ms`;
    } else {
      return `${(offset / 1000).toFixed(2)}s`;
    }
  };

  return (
    <div className={`${styles.clockContainer} ${compactMode ? styles.compactMode : ''}`}>
      <div className={styles.clockCard}>
        {/* 头部信息 */}
        <div className={styles.clockHeader}>
          <div className={styles.titleGroup}>
            <h2 className={styles.clockTitle}>Time is:</h2>
            <div className={`${styles.statusIndicator} ${useNetworkTime ? styles.online : styles.offline}`}>
              {useNetworkTime ? '在线同步' : '本地时钟'}
            </div>
            {!isOnline && (
              <div className={styles.offlineIndicator}>
                🔴 离线
              </div>
            )}
          </div>
          
          <button
            onClick={toggleTimeSource}
            className={styles.toggleButton}
            title={useNetworkTime ? '切换到本地时间' : '使用网络时间同步'}
            disabled={!isOnline && useNetworkTime}
          >
            {useNetworkTime ? '🌐' : '🖥️'}
          </button>
        </div>

        {/* 主时间显示 */}
        <div className={styles.timeDisplay}>
          <div className={styles.timeMain}>
            <span className={styles.timeDigits}>{formattedTime.time.split(':')[0] || '--'}</span>
            <span className={styles.timeSeparator}>:</span>
            <span className={styles.timeDigits}>{formattedTime.time.split(':')[1] || '--'}</span>
            {showSeconds && (
              <>
                <span className={styles.timeSeparator}>:</span>
                <span className={styles.timeDigits}>
                  {formattedTime.time.split(':')[2] || '--'}
                </span>
              </>
            )}
            <span className={styles.timePeriod}>{formattedTime.period}</span>
          </div>
          
          {showDate && (
            <div className={styles.dateDisplay}>
              {formattedTime.date}
            </div>
          )}
        </div>

        {/* 时区选择器 */}
        {showTimezoneSelector && (
          <div className={styles.timezoneSection}>
            <label className={styles.timezoneLabel}>
              时区选择
              <select
                value={selectedTimezone}
                onChange={handleTimezoneChange}
                className={styles.timezoneSelect}
                disabled={isLoading}
              >
                {timezoneOptions.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label} (UTC{tz.offset})
                  </option>
                ))}
              </select>
            </label>
            
            <div className={styles.timezoneInfo}>
              当前时区: {selectedTimezone.replace('_', ' ')}
              {selectedTimezone !== 'Asia/Shanghai' && (
                <span className={styles.timezoneNote}>
                  （基于北京时间转换）
                </span>
              )}
            </div>
          </div>
        )}

        {/* 状态信息 */}
        <div className={styles.statusSection}>
          {isLoading && (
            <div className={styles.loadingIndicator}>
              <div className={styles.spinner}></div>
              正在同步时间...
            </div>
          )}
          
          {error && (
            <div className={styles.errorMessage}>
              <div className={styles.errorContent}>
                <span className={styles.errorIcon}>⚠️</span>
                <span className={styles.errorText}>{error}</span>
                {useNetworkTime && isOnline && retryCount < 3 && (
                  <button onClick={handleRetry} className={styles.retryButton}>
                    重试
                  </button>
                )}
              </div>
            </div>
          )}
          
          {useNetworkTime && !error && !isLoading && (
            <div className={styles.networkInfo}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>同步方式:</span>
                <span className={styles.infoValue}>基准时间 + 本地计时</span>
              </div>
              {lastSyncTime && (
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>最后同步:</span>
                  <span className={styles.infoValue}>
                    {lastSyncTime.toLocaleTimeString('zh-CN', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </span>
                </div>
              )}
              {getNextSyncTime() && (
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>下次同步:</span>
                  <span className={styles.infoValue}>{getNextSyncTime()}</span>
                </div>
              )}
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>时间偏移:</span>
                <span className={styles.infoValue}>{getOffsetInfo()}</span>
              </div>
            </div>
          )}
        </div>

        {/* 附加信息 */}
        <div className={styles.clockFooter}>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>时间源:</span>
              <span className={styles.infoValue}>
                {useNetworkTime ? '苏宁时间API' : '本地系统时间'}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>网络状态:</span>
              <span className={`${styles.infoValue} ${isOnline ? styles.onlineText : styles.offlineText}`}>
                {isOnline ? '在线' : '离线'}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>重试次数:</span>
              <span className={styles.infoValue}>{retryCount}</span>
            </div>
            {autoSwitch && (
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>自动切换:</span>
                <span className={styles.infoValue}>已启用</span>
              </div>
            )}
          </div>
          

        </div>
      </div>
    </div>
  );
};

export default DigitalClock;