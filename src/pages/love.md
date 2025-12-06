# ❤️ 我们的故事 ❤️

你们就在我身边，给予我无尽的欢笑和温暖。

<div className="timeline-container">
  <div className="timeline-item" style={{borderLeftColor: '#ff6b6b'}}>
    <div className="timeline-badge">1</div>
    <div className="timeline-content">
      <h3>👶 最初的陪伴</h3>
      <p><strong>致：</strong> 赵盼伟, 张梦宁, 张子宁</p>
      <p>那段天真烂漫的时光，我们一同度过，分享笑声和眼泪。我不会忘记。</p>
    </div>
  </div>

  <div className="timeline-item" style={{borderLeftColor: '#4ecdc4'}}>
    <div className="timeline-badge">2</div>
    <div className="timeline-content">
      <h3>🎓 青春年华</h3>
      <p><strong>致：</strong> 李全达, 谢昌科, 邓一凡, 李俊如, 周丽</p>
      <p>我们一同迎接青春的到来。下课后在走廊的嬉闹、共同备战考试的日子，每一刻都是如此珍贵。</p>
    </div>
  </div>

  <div className="timeline-item" style={{borderLeftColor: '#ffd166'}}>
    <div className="timeline-badge">3</div>
    <div className="timeline-content">
      <h3>🌟 珍贵瞬间</h3>
      <p><strong>致：</strong> 蔡博君, 黄小凡, 陈婷婷</p>
      <p>永远不会忘记我们一起度过的每一个瞬间。那些快乐、那些努力，都成为我生命中不可磨灭的印记。</p>
    </div>
  </div>

  <div className="timeline-item" style={{borderLeftColor: '#06d6a0', borderLeftWidth: '3px'}}>
    <div className="timeline-badge">4</div>
    <div className="timeline-content">
      <h3>🎮 正在进行时</h3>
      <p><strong>致：</strong> 现在的你们</p>
      <p>以及...现在正在发生的一切。和你们通宵在宿舍rush b、睡觉不去上早八，真的非常快乐。</p>
    </div>
  </div>
</div>



<div className="heart-message">
  <div className="heart-icon">❤️</div>
  <h2>我爱你们</h2>
  <p>感谢每一位出现在我生命中的你们，让我的世界变得如此丰富多彩。</p>
  <div className="smile">😊</div>
  <iframe frameborder={"no"} border={"0"} marginwidth={"0"} marginheight={"0"} width={330} height={86} src={"https://music.163.com/outchain/player?type=2&id=2051789190&auto=1&height=66"} allow={"autoplay"}></iframe>
</div>

<style>{`
  /* ... （这里保留上一个回答中提供的所有CSS样式） ... */
  .timeline-container { position: relative; margin: 2rem 0; padding-left: 2rem; }
  .timeline-container::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; S; border-radius: 2px; }
  .timeline-item { position: relative; padding-bottom: 2rem; padding-left: 1.5rem; border-left: 2px solid; margin-bottom: 1rem; }
  .timeline-badge { position: absolute; left: -14px; top: 0; background: white; border: 2px solid; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-weight: bold; }
  .heart-message { text-align: center; padding: 3rem; background: linear-gradient(135deg, #ffebee 0%, #fce4ec 100%); border-radius: 20px; margin: 3rem 0; border: 3px solid #ff6b6b; }
  .heart-icon { font-size: 4rem; animation: heartbeat 1.5s ease-in-out infinite; margin-bottom: 1rem; }
  @keyframes heartbeat { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
  @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  @media (max-width: 768px) { .timeline-container { padding-left: 1.5rem; } .heart-message { padding: 2rem 1rem; } }
`}</style>