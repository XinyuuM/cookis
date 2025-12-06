const toolsCards = [
  {
    "id": 1,
    "title": "Potplayer",
    "link": "https://potplayer.daum.net/",
    "iconType": "html"
  },
  {
    "id": 2,
    "title": "OBS",
    "link": "https://obsproject.com/",
    "iconType": "html"
  },
  {
    "id": 3,
    "title": "OpenAI",
    "link": "https://openai.com/",
    "iconType": "html"
  },
  {
    "id": 4,
    "title": "Cloudflare",
    "link": "https://dash.cloudflare.com/",
    "iconType": "html"
  },
  {
    "id": 5,
    "title": "Clash Verge",
    "link": "https://clashverge.net/",
    "iconType": "html"
  },
  {
    "id": 6,
    "title": "Typora",
    "link": "https://typoraio.cn/",
    "iconType": "html"
  },
  {
    "id": 7,
    "title": "飞鸟云",
    "link": "https://feiniaoyun01.com/",
    "iconType": "html"
  },
  {
    "id": 8,
    "title": "Shields",
    "link": "https://shields.io/",
    "iconType": "html"
  },
  {
    "id": 9,
    "title": "微PE",
    "link": "https://www.wepe.com.cn/",
    "iconType": "html"
  },
  {
    "id": 10,
    "title": "腾讯日历",
    "link": "https://rili.tencent.com/",
    "iconType": "html"
  },
  {
    "id": 11,
    "title": "Caesium Image Compressor",
    "link": "https://saerasoft.com/",
    "iconType": "html"
  },
  {
    "id": 12,
    "title": "PicGo",
    "link": "https://picgo.github.io/PicGo-Doc/zh/",
    "iconType": "html"
  },
  {
    "id": 13,
    "title": "剑桥词典",
    "link": "https://dictionary.cambridge.org/zhs/",
    "iconType": "html"
  },
  {
    "id": 14,
    "title": "搜图bot酱",
    "link": "https://soutubot.moe/",
    "iconType": "html"
  },
  {
    "id": 15,
    "title": "动漫新番表 byHazx",
    "link": "https://xf.hmacg.cn/",
    "iconType": "html"
  },
  {
    "id": 16,
    "title": "邮政名址网",
    "link": "http://cpdc.chinapost.com.cn/web/",
    "iconType": "html"
  },
  {
    "id": 17,
    "title": "emoji中文网",
    "link": "https://www.emojiall.com/zh-hans",
    "iconType": "html"
  },
  {
    "id": 18,
    "title": "MSDN",
    "link": "https://msdn.itellyou.cn/",
    "iconType": "html"
  },
  {
    "id": 19,
    "title": "18Comics",
    "link": "https://18comic.org/",
    "iconType": "html"
  },
  {
    "id": 20,
    "title": "HackBGRT",
    "link": "https://github.com/Metabolix/HackBGRT",
    "iconType": "html"
  },
  {
    "id": 21,
    "title": "Keepass",
    "link": "https://keepass.info/",
    "iconType": "html"
  },
  {
    "id": 22,
    "title": "qBittorrent Enhanced",
    "link": "https://github.com/c0re100/qBittorrent-Enhanced-Edition",
    "iconType": "html"
  },
  {
    "id": 23,
    "title": "FileZilla",
    "link": "https://www.filezilla.cn/",
    "iconType": "html"
  },
  {
    "id": 24,
    "title": "ToDesk",
    "link": "https://www.todesk.com/",
    "iconType": "html"
  },
  {
    "id": 25,
    "title": "Steam",
    "link": "https://store.steampowered.com/about",
    "iconType": "html"
  },
  {
    "id": 26,
    "title": "OfficeToos",
    "link": "https://otp.landian.vip/zh-cn/",
    "iconType": "html"
  },
  {
    "id": 27,
    "title": "AkamsCN",
    "link": "https://akams.cn/",
    "iconType": "html"
  },

];
const videoCards = [
  {
    "id": 3,
    "title": "【公交纪行】拥有独立高架的厦门BRT，是规划典范还是历史遗憾？快速公交全线路乘车体验&系统分析",
    "link": "https://www.bilibili.com/video/BV11H4y177Ms",
    "iconType": "video"
  },
  {
    "id": 4,
    "title": "【IGN】《塞尔达传说》管弦音乐会全程视频",
    "link": "https://www.bilibili.com/video/BV1YZ421U7TH",
    "iconType": "video"
  },
  {
    "id": 5,
    "title": "【铁路纪行】最高试验时速605km\"青铜剑\"列车的动检日常！CRH380AM-0204更高速度试验列车 济局青段动检车次全天追踪拍摄",
    "link": "https://www.bilibili.com/video/BV1b341127rm",
    "iconType": "video"
  },
  {
    "id": 6,
    "title": "[3D打印]正",
    "link": "https://www.bilibili.com/video/BV1S6421u7qd",
    "iconType": "video"
  },
  {
    "id": 7,
    "title": "【青年文工团】为什么劳动无法致富？",
    "link": "https://www.bilibili.com/video/BV16y421i7AW",
    "iconType": "video"
  },
  {
    "id": 8,
    "title": "黑马程序员前端JavaScript入门到精通全套视频教程，javascript核心进阶ES6语法、API、js高级等基础知识和实战教程",
    "link": "https://www.bilibili.com/video/BV1Y84y1L7Nn",
    "iconType": "video"
  },
  {
    "id": 9,
    "title": "大一学生赌今年世界杯，最后梭哈阿根廷，输掉爸爸的10万公积金，现在要休学了。",
    "link": "https://www.bilibili.com/video/BV1T84y1r7Jp",
    "iconType": "video"
  },
  {
    "id": 10,
    "title": "【收藏级】你从未见过的可爱Aimer（眼镜是本体）",
    "link": "https://www.bilibili.com/video/BV1NK41127RF",
    "iconType": "video"
  },
  {
    "id": 11,
    "title": "研二学生借18万网贷去pc？看他说话的样子，感觉已经入魔神志不清了。",
    "link": "https://www.bilibili.com/video/BV1bg4y1m7si",
    "iconType": "video"
  },
  {
    "id": 12,
    "title": "艾跃进：女生是否可以有婚前X行为，听听艾公的嘱咐，真正的人民代表艾公千古",
    "link": "https://www.bilibili.com/video/BV1Zz4y1x72P",
    "iconType": "video"
  }
];

const musicCards = [
  {
    "id": 1,
    "title": "【阿梓歌】《你给我听好》（2024.2.23）",
    "link": "https://www.bilibili.com/video/BV1wj421Q7T3",
    "iconType": "music"
  },
  {
    "id": 2,
    "title": "【阿梓】吻得太逼真",
    "link": "https://www.bilibili.com/video/BV1jd4y1B7n6",
    "iconType": "music"
  },
  {
    "id": 3,
    "title": "【初音ミク】圣诞快乐【めろくる】【授权转载】",
    "link": "https://www.bilibili.com/video/BV1Qe411c7Hu",
    "iconType": "music"
  },
  {
    "id": 4,
    "title": "幾田-りら - スパークル字幕版 这声音太甜了吧！！",
    "link": "https://www.bilibili.com/video/BV1Je4y1A72D",
    "iconType": "music"
  },
  {
    "id": 5,
    "title": "【中日字幕】幾田りら「レンズ」（镜头）-YOASOBI·ikura-个人单曲-THE FIRST TAKE",
    "link": "https://www.bilibili.com/video/BV1b5411Q7Dw",
    "iconType": "music"
  },
  {
    "id": 6,
    "title": "【中文字幕】陳柏宇「你瞞我瞞」Lies Between Us，首次登上THE FIRST TAKE",
    "link": "https://www.bilibili.com/video/BV1a8411A7oM",
    "iconType": "music"
  },
  {
    "id": 7,
    "title": "【夢ノ結唱】Freak Out Hr. / 雄之助 feat. POPY & ROSE【Music Video】",
    "link": "https://www.bilibili.com/video/BV1hk4y1x7hb",
    "iconType": "music"
  },
  {
    "id": 8,
    "title": "【中日字幕】YOASOBI 新曲「心音」完整版【正式音源/现场版】",
    "link": "https://www.bilibili.com/video/BV1ET4y1s7uw",
    "iconType": "music"
  },
  {
    "id": 9,
    "title": "【8K画质/Hi-Res/杜比视界/中日歌词】YOASOBI × 宝可梦 梦幻联动！《Biri-Biri》动画MV",
    "link": "https://www.bilibili.com/video/BV1EC4y177vL",
    "iconType": "music"
  },
  {
    "id": 10,
    "title": "【MIKU EXPO 10th】Intergalactic Bound by Yunosuke & CircusP feat. Hatsune Miku",
    "link": "https://www.bilibili.com/video/BV1EK4y1z7St",
    "iconType": "music"
  },
  {
    "id": 11,
    "title": "【阿梓】春天的芭蕾！（8.6版）",
    "link": "https://www.bilibili.com/video/BV1Qg411L7Hs",
    "iconType": "music"
  },
  {
    "id": 12,
    "title": "【中字】Ringing!-唐可可＆下集预告《LoveLive!Superstar!!》第9话\"Liella之歌\"NHK 教育频道特别环节",
    "link": "https://www.bilibili.com/video/BV1bq4y1K7d6",
    "iconType": "music"
  },
  {
    "id": 13,
    "title": "【中日字幕MV】幾田りら(YOASOBI)新曲「P.S.」完整版",
    "link": "https://www.bilibili.com/video/BV1qz4y1n76N",
    "iconType": "music"
  },
  {
    "id": 14,
    "title": "LiSA×Uru - 再会 (produced by Ayase) - THE FIRST TAKE",
    "link": "https://www.bilibili.com/video/BV1LA411j7Jx",
    "iconType": "music"
  },
  {
    "id": 15,
    "title": "【Aimer/中日字幕】「コイワズライ」「相思病」这才是恋爱的感觉！",
    "link": "https://www.bilibili.com/video/BV1fK4y197Ue",
    "iconType": "music"
  },
  {
    "id": 16,
    "title": "【MV】ヒカリ (光) —幾田りら",
    "link": "https://www.bilibili.com/video/BV13v4y1M7CA",
    "iconType": "music"
  },
  {
    "id": 17,
    "title": "【阿梓歌】《普通朋友》（2022.9.20）",
    "link": "https://www.bilibili.com/video/BV1vG411g7Su",
    "iconType": "music"
  },
  {
    "id": 18,
    "title": "【官方MV】あかせあかり「恋ノ行方」（TV动画「更衣人偶坠入爱河」ED）",
    "link": "https://www.bilibili.com/video/BV1qS4y1G7qP",
    "iconType": "music"
  },
  {
    "id": 19,
    "title": "【MMD】炉心融解 / Meltdown【YYB V·Stream Rin】【搬运】",
    "link": "https://www.bilibili.com/video/BV1mS4y1T77P",
    "iconType": "music"
  },
  {
    "id": 20,
    "title": "【阿梓歌】《你知道我在等你们分手吗》（2024.2.14）",
    "link": "https://www.bilibili.com/video/BV1Ny421a7zv",
    "iconType": "music"
  },
  {
    "id": 21,
    "title": "【ななひら×ころねぽち】少女终末旅行ED more one night",
    "link": "https://www.bilibili.com/video/BV1gy4y147sv",
    "iconType": "music"
  },
  {
    "id": 22,
    "title": "【初音ミク】スパークル・ピーチ（Sparkle Beach）【めろくる】",
    "link": "https://www.bilibili.com/video/BV14x4y1y71R",
    "iconType": "music"
  },
  {
    "id": 23,
    "title": "十年也好，百年也好，千年也好，依然在这里唱歌给你听~",
    "link": "https://www.bilibili.com/video/BV1p34y1y7pa",
    "iconType": "music"
  },
  {
    "id": 24,
    "title": "当初音未来遇上邓丽君 · 我只在乎你~",
    "link": "https://www.bilibili.com/video/BV1oJ411C7KG",
    "iconType": "music"
  },
  {
    "id": 25,
    "title": "【SNOW MIKU 2024】ハッピーチートデー / れるりり feat. 初音未来",
    "link": "https://www.bilibili.com/video/BV1NG411Y7tU",
    "iconType": "music"
  },
  {
    "id": 26,
    "title": "スノーパフェ・ランデヴー / irucaice feat. Hatsune Miku",
    "link": "https://www.bilibili.com/video/BV1dw4m1Z7zq",
    "iconType": "music"
  },
  {
    "id": 27,
    "title": "【*Luna feat.ねんね】あの夏のいつかは (在那個夏日的某天)【2023 Ver.】",
    "link": "https://www.bilibili.com/video/BV1v8411v7n7",
    "iconType": "music"
  },
  {
    "id": 28,
    "title": "【ラトナ・プティ & ななひら】琥珀糖的游艇【MV】",
    "link": "https://www.bilibili.com/video/BV1vf4y137TX",
    "iconType": "music"
  },
  {
    "id": 29,
    "title": "【冰兔】月兔回旋于空中 / 回る空うさぎ 翻唱",
    "link": "https://www.bilibili.com/video/BV1Eq4y147UY",
    "iconType": "music"
  },
  {
    "id": 30,
    "title": "【MV】私色きらめき日和 feat. 夢ノ結晶POPY",
    "link": "https://www.bilibili.com/video/BV1yj411P76S",
    "iconType": "music"
  },
  {
    "id": 31,
    "title": "【翻唱】群青 - Covered by Neru",
    "link": "https://www.bilibili.com/video/BV1GZ4y187CB",
    "iconType": "music"
  },
  {
    "id": 32,
    "title": "幸祜 No.012「the last bullet」【Official Music Video】",
    "link": "https://www.bilibili.com/video/BV1TL4y1h7HT",
    "iconType": "music"
  },
  {
    "id": 33,
    "title": "YOASOBI アドベンチャー(ADVENTURE) Official Music Video",
    "link": "https://www.bilibili.com/video/BV1Kh411V7qp",
    "iconType": "music"
  },
  {
    "id": 34,
    "title": "YOASOBI もう少しだけ(Mou Sukoshi Dake) Official Music Video",
    "link": "https://www.bilibili.com/video/BV1WL4y1p73A",
    "iconType": "music"
  },
  {
    "id": 35,
    "title": "世界第一可爱的嘉然公主❤️",
    "link": "https://www.bilibili.com/video/BV1vx42197YK",
    "iconType": "music"
  },
  {
    "id": 36,
    "title": "初音ミク (愛されなくても君がいる) 4K60帧 中日双字",
    "link": "https://www.bilibili.com/video/BV1VM4y1c7Tp",
    "iconType": "music"
  },
  {
    "id": 37,
    "title": "JUMP UP / DECO*27 feat. 初音未来",
    "link": "https://www.bilibili.com/video/BV1nA411F762",
    "iconType": "music"
  },
  {
    "id": 38,
    "title": "【巡音流歌・初音未来】Jump for Joy - EasyPop【MV】",
    "link": "https://www.bilibili.com/video/BV1H4411P7iU",
    "iconType": "music"
  },
  {
    "id": 39,
    "title": "【初音ミク】Rise up【*Luna】【Fit Boxing feat. 初音ミク】",
    "link": "https://www.bilibili.com/video/BV1Hw4m1Z79Z",
    "iconType": "music"
  },
  {
    "id": 40,
    "title": "【MORE MORE JUMP！ × 初音ミク】JUMPIN' OVER !【2DMV／『世界计划 多彩舞台』主题原创曲】【中文CC字幕】",
    "link": "https://www.bilibili.com/video/BV1pm411f7JY",
    "iconType": "music"
  },
  {
    "id": 41,
    "title": "【4K·BD&HiRes】Chance Day, Chance Way！-Liella!《LoveLive!Superstar!!》第二季第8话插入歌",
    "link": "https://www.bilibili.com/video/BV1c44y1f7dV",
    "iconType": "music"
  },
  {
    "id": 42,
    "title": "【弘函】ひろがる世界へはこぶ風 / 一二三 feat.初音未来",
    "link": "https://www.bilibili.com/video/BV1xq421A7VL",
    "iconType": "music"
  },
  {
    "id": 43,
    "title": "Aimer 「everlasting snow」官方MV",
    "link": "https://www.bilibili.com/video/BV1mu4m1N7bY",
    "iconType": "music"
  },
  {
    "id": 44,
    "title": "【初音ミク＆可不】ツキミチシルベ （Tsukimichi Shirube）【MIMI】",
    "link": "https://www.bilibili.com/video/BV1qm41167TK",
    "iconType": "music"
  },
  {
    "id": 45,
    "title": "你的前女友成了别人的女朋友【前女友系日本主播高槻律翻唱別の人の彼女になったよ】",
    "link": "https://www.bilibili.com/video/BV1mE421M7nT",
    "iconType": "music"
  },
  {
    "id": 46,
    "title": "【初音ミク/つこ】 Opening*Spring 【オリジナル曲】",
    "link": "https://www.bilibili.com/video/BV16K421Y7h4",
    "iconType": "music"
  },
  {
    "id": 47,
    "title": "【阿梓】《最长的电影》都快听哭了，神回歌曲",
    "link": "https://www.bilibili.com/video/BV1Gr4y1A7Ln",
    "iconType": "music"
  },
  {
    "id": 48,
    "title": "【阿梓歌】《兄妹》（2024.4.24）",
    "link": "https://www.bilibili.com/video/BV1at421w7XM",
    "iconType": "music"
  },
  {
    "id": 49,
    "title": "【初音ミク,鏡音リン,巡音ルカ】XXX【めろくる】",
    "link": "https://www.bilibili.com/video/BV1kn4y1X7Qh/",
    "iconType": "music"
  },
  {
    "id": 50,
    "title": "『 乌梅子酱 』甜甜的，听完就像吃了乌梅子酱~",
    "link": "https://www.bilibili.com/video/BV1kX4y1972Q/",
    "iconType": "music"
  },
  {
    "id": 51,
    "title": "甜度超标《园游会》炸裂好听！比大白兔奶糖还要甜~！",
    "link": "https://www.bilibili.com/video/BV1gU4y1C7Kp/",
    "iconType": "music"
  },
  {
    "id": 52,
    "title": "【张紫宁】《勿听》——黑神话：悟空 第四章节片尾曲 讲述一段婉转凄美的爱情故事",
    "link": "https://www.bilibili.com/video/BV1C5W2epEAg/",
    "iconType": "music"
  },
  {
    "id": 53,
    "title": "吹梦到西洲，完整的一个唱！",
    "link": "https://www.bilibili.com/video/BV1LZ421M7CS/",
    "iconType": "music"
  },
  {
    "id": 54,
    "title": "『探窗』绝美戏腔演唱\"一句一叹戏里有情痴\"",
    "link": "https://www.bilibili.com/video/BV18T411G7xJ/",
    "iconType": "music"
  },
  {
    "id": 55,
    "title": "早稻叽 - 喜帖街 2.0",
    "link": "https://www.bilibili.com/video/BV14K411y7aS/",
    "iconType": "music"
  },
  {
    "id": 56,
    "title": "【阿梓歌】《如果当时》（2022.9.14）",
    "link": "https://www.bilibili.com/video/BV1Lg411U7oe/",
    "iconType": "music"
  },
];

export const cardData = {
  video: videoCards,
  music: musicCards,
  tools: toolsCards
};

// 如果没有指定iconType，可以使用默认图标
export const getCardsWithIcons = (cards) => {
  return cards.map(card => ({
    ...card,
    iconType: card.iconType || 'default'
  }));
};

export default {
  video: videoCards,
  music: musicCards,
  tools: toolsCards
};