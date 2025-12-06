---
title: 📺视频
sidebar_position: 1
---
import React from 'react';
import { MarkCardGrid } from '@site/src/components/markcard';
import { cardData } from '@site/src/data/markcard-data';

**键政相关视频有大量主观内容输出，看个乐子就好**

<MarkCardGrid 
        cards={cardData.video}
        title="视频"
        searchPlaceholder="搜索视频..."
        emptyMessage="没有找到相关的视频"
      />