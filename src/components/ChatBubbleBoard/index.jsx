import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

// 导入数据
import chatMessages from '@site/src/data/chatMessages.json';

// 如果没有找到数据，使用默认数据
const defaultMessages = [
  {
    id: 1,
    user: "Alice",
    message: "这个留言板的气泡设计非常简洁！",
    timestamp: "10:30 AM",
    color: "#FF6B6B",
    position: "left"
  },
  {
    id: 2,
    user: "Bob",
    message: "是的，姓名和时间在气泡外面，看起来更清晰",
    timestamp: "10:32 AM",
    color: "#4ECDC4",
    position: "right"
  },
  {
    id: 3,
    user: "Charlie",
    message: "颜色鲜艳但不过分，恰到好处",
    timestamp: "10:35 AM",
    color: "#FFD166",
    position: "left"
  },
  {
    id: 4,
    user: "Diana",
    message: "我喜欢这种极简风格的设计",
    timestamp: "10:40 AM",
    color: "#06D6A0",
    position: "right"
  }
];

// 明亮简洁的颜色模板
const brightColors = [
  '#FF6B6B', // 珊瑚红
  '#4ECDC4', // 松石绿
  '#FFD166', // 向日葵黄
  '#06D6A0', // 翡翠绿
  '#118AB2', // 海洋蓝
  '#EF476F', // 亮粉色
  '#3A86FF', // 亮蓝色
];

const ChatBubbleBoard = () => {
  const [messages, setMessages] = useState(defaultMessages);
  const [selectedColor, setSelectedColor] = useState(brightColors[0]);

  useEffect(() => {
    // 如果有导入的数据，使用导入的数据
    if (chatMessages && chatMessages.length > 0) {
      setMessages(chatMessages);
    }
  }, []);

  // 添加新消息
  const addNewMessage = () => {
    const newId = messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1;
    const positions = ['left', 'right'];
    const users = ['Alex', 'Jordan', 'Taylor', 'Casey', 'Riley'];
    
    const newMessage = {
      id: newId,
      user: users[Math.floor(Math.random() * users.length)],
      message: `这是第 ${newId} 条测试消息，使用了简洁的气泡设计`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      color: selectedColor,
      position: positions[Math.floor(Math.random() * positions.length)]
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  // 清空所有消息
  const clearMessages = () => {
    setMessages([]);
  };

  // 添加示例消息
  const addSampleMessages = () => {
    const sampleMessages = [
      {
        id: messages.length + 1,
        user: "简洁设计",
        message: "气泡设计足够简洁，专注于内容本身",
        timestamp: "刚刚",
        color: selectedColor,
        position: "left"
      },
      {
        id: messages.length + 2,
        user: "用户体验",
        message: "姓名和时间在气泡外部，提升了可读性",
        timestamp: "刚刚",
        color: selectedColor,
        position: "right"
      }
    ];
    
    setMessages(prev => [...prev, ...sampleMessages]);
  };

  return (
    <div className={styles.chatContainer}>

      <div className={styles.messagesContainer}>
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div 
              key={msg.id} 
              className={`${styles.messageWrapper} ${styles[msg.position]}`}
              style={{
                animationDelay: `${index * 0.1}s`,
                animationDuration: '0.5s'
              }}
            >
              <div className={styles.userInfo}>
                <span className={styles.username}>{msg.user}</span>
                <span className={styles.timestamp}>{msg.timestamp}</span>
              </div>
              <div 
                className={`${styles.messageBubble} ${styles[msg.position]}`}
                style={{ '--bubble-color': msg.color }}
              >
                <div className={styles.messageContent}>{msg.message}</div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: '#a0aec0',
            fontStyle: 'italic'
          }}>
            暂无消息
          </div>
        )}
      </div>

      
    </div>
  );
};

export default ChatBubbleBoard;