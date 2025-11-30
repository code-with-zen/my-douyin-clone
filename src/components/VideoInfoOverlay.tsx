import {
  IconComment,
  IconForward,
  IconLikeHeart,
  IconMusic,
  IconPlus,
  IconStar,
} from '@douyinfe/semi-icons';
import { Avatar } from '@douyinfe/semi-ui';
import React, { useState } from 'react';

interface VideoInfoProps {
  author: { name: string; avatar: string };
  description: string;
  musicName: string;
  stats: {
    likeCount: number;
    commentCount: number;
    collectCount: number;
    shareCount: number;
  };
  onCommentClick?: () => void;
}

export default function VideoInfoOverlay({
  author,
  description,
  musicName,
  stats,
  onCommentClick,
}: VideoInfoProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(stats.likeCount);
  const [isCollected, setIsCollected] = useState(false);
  const [collectCount, setCollectCount] = useState(stats.collectCount);
  const [isFollowed, setIsFollowed] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(p => (isLiked ? p - 1 : p + 1));
  };
  const handleCollect = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCollected(!isCollected);
    setCollectCount(p => (isCollected ? p - 1 : p + 1));
  };

  const ActionButton = ({ icon, text, onClick, activeColor }: any) => (
    <div
      className="flex flex-col items-center gap-[2px] cursor-pointer group"
      onClick={onClick}
    >
      <div className="transition-all duration-200 ease-out group-hover:scale-110 active:scale-95 drop-shadow-md opacity-95">
        {React.cloneElement(icon, {
          style: {
            fontSize: 28,
            color: activeColor || 'white',
            filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.5))',
          },
        })}
      </div>
      <span className="text-white text-[11px] font-medium opacity-90 drop-shadow-sm font-sans">
        {text}
      </span>
    </div>
  );

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-end pb-[80px] px-2 z-20 overflow-hidden">
      {/* 右侧交互栏 */}
      <div className="absolute right-[4px] bottom-[50px] w-[50px] flex flex-col items-center gap-5 pointer-events-auto z-30">
        <div
          className="relative cursor-pointer mb-1 group"
          onClick={e => {
            e.stopPropagation();
            setIsFollowed(true);
          }}
        >
          <Avatar
            src={author.avatar}
            size="default"
            style={{ width: 42, height: 42, border: '2px solid white' }}
            className="transition-transform duration-300 group-hover:scale-105 shadow-md"
          />
          {!isFollowed && (
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#fe2C55] rounded-full w-[16px] h-[16px] flex items-center justify-center border border-white transition-transform duration-300 group-hover:scale-110 shadow-sm">
              <IconPlus style={{ fontSize: 10, color: 'white' }} />
            </div>
          )}
        </div>
        <ActionButton
          icon={<IconLikeHeart />}
          text={likeCount}
          activeColor={isLiked ? '#fe2C55' : undefined}
          onClick={handleLike}
        />
        <ActionButton
          icon={<IconComment />}
          text={stats.commentCount}
          onClick={(e: any) => {
            e.stopPropagation();
            onCommentClick?.();
          }}
        />
        <ActionButton
          icon={<IconStar />}
          text={collectCount}
          activeColor={isCollected ? '#face15' : undefined}
          onClick={handleCollect}
        />
        <ActionButton icon={<IconForward />} text={stats.shareCount} />
      </div>

      {/* 左侧信息 */}
      <div className="w-[calc(100%-60px)] text-white pointer-events-auto pl-1 flex flex-col items-start gap-1.5 z-20">
        <div className="font-bold text-[18px] hover:underline cursor-pointer drop-shadow-md">
          @{author.name}
        </div>
        <div className="text-[15px] leading-relaxed opacity-95 line-clamp-3 drop-shadow-sm w-[90%]">
          {description}
        </div>
        <div className="flex items-center gap-2 mt-1 opacity-90 bg-white/10 px-2 py-0.5 rounded-lg w-fit backdrop-blur-sm">
          <IconMusic className="animate-spin-slow text-xs" />
          <span className="text-[11px]">{musicName}</span>
        </div>
      </div>
    </div>
  );
}
