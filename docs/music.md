---
title: 🎵音乐
sidebar_position: 3
---
import React from 'react';
import { MarkCardGrid } from '@site/src/components/markcard';
import { cardData } from '@site/src/data/markcard-data';

**宝宝巴士**

<MarkCardGrid 
        cards={cardData.music}
        title="音乐视频"
        searchPlaceholder="搜索音乐视频..."
        emptyMessage="没有找到相关的音乐视频"
      />