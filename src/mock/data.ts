// src/mock/data.ts

export interface VideoData {
  id: number;
  url: string;
  poster: string;
  author: string;
  authorAvatar: string;
  title: string;
  description: string;
  stats: {
    likeCount: number;
    commentCount: number;
    collectCount: number;
    shareCount: number;
  };
}

export const MOCK_VIDEO_LIST: VideoData[] = [
  {
    id: 1,
    url: 'https://sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4',
    poster:
      'https://sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/poster/xgplayer-demo.jpg',
    author: 'xgplayer官方',
    authorAvatar:
      'https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-avt-0015_f73b223c6837774288b56082464735c9~c5_168x168.jpeg',
    title: '官方测试视频',
    description: '12344575768769kbhkbhgjvjg✅',
    stats: {
      likeCount: 9999,
      commentCount: 100,
      collectCount: 50,
      shareCount: 10,
    },
  },
  {
    id: 2,
    url: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    poster: 'https://media.w3.org/2010/05/sintel/poster.png',
    author: 'W3C标准',
    authorAvatar:
      'https://sf6-cdn-tos.douyinstatic.com/img/user-avatar/f0612640243467645164028325600_168x168.jpeg',
    title: 'Sintel 预告片',
    description: 'W3C 官方提供的 MP4 资源，支持 HTTPS 和跨域。',
    stats: {
      likeCount: 1234,
      commentCount: 56,
      collectCount: 12,
      shareCount: 5,
    },
  },
  {
    id: 3,
    url: 'https://vjs.zencdn.net/v/oceans.mp4',
    poster: 'https://vjs.zencdn.net/v/oceans.png',
    author: 'VJS',
    authorAvatar:
      'https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-avt-0015_f73b223c6837774288b56082464735c9~c5_168x168.jpeg',
    title: '深海探秘',
    description: '用于测试横屏视频在抖音模式下的黑边填充效果。',
    stats: {
      likeCount: 888,
      commentCount: 22,
      collectCount: 11,
      shareCount: 2,
    },
  },
];
