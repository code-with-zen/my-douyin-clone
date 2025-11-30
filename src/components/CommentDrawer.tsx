import React, { useState } from 'react';
import { SideSheet, Avatar, Toast } from '@douyinfe/semi-ui';
import { IconLikeHeart } from '@douyinfe/semi-icons';

interface Comment {
  id: number;
  username: string;
  avatar: string;
  content: string;
  time: string;
  likeCount: number;
  isLiked: boolean;
  location: string;
}

interface CommentDrawerProps {
  visible: boolean;
  onClose: () => void;
  commentCount: number;
}

const INITIAL_COMMENTS: Comment[] = [
  {
    id: 1,
    username: "吃瓜群众",
    avatar: "https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-avt-0015_f73b223c6837774288b56082464735c9~c5_168x168.jpeg",
    content: "这个视频做得太好了！求教程！",
    time: "10分钟前",
    likeCount: 123,
    isLiked: false,
    location: "北京"
  },
  {
    id: 2,
    username: "React学习者",
    avatar: "https://sf6-cdn-tos.douyinstatic.com/img/user-avatar/f0612640243467645164028325600_168x168.jpeg",
    content: "Jotai 确实比 Redux 好用多了，代码量少很多。",
    time: "1小时前",
    likeCount: 45,
    isLiked: true,
    location: "上海"
  }
];

export default function CommentDrawer({ visible, onClose, commentCount }: CommentDrawerProps) {
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newComment: Comment = {
      id: Date.now(),
      username: "我",
      avatar: "https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-avt-0015_f73b223c6837774288b56082464735c9~c5_168x168.jpeg",
      content: inputValue,
      time: "刚刚",
      likeCount: 0,
      isLiked: false,
      location: "未知"
    };
    setComments([newComment, ...comments]);
    setInputValue("");
    Toast.success("评论成功");
  };

  const toggleLike = (id: number) => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, isLiked: !c.isLiked, likeCount: c.isLiked ? c.likeCount - 1 : c.likeCount + 1 } : c));
  };

  return (
    <SideSheet
      title={<span className="text-white text-[16px] font-bold">全部评论 ({commentCount + comments.length - INITIAL_COMMENTS.length})</span>}
      visible={visible}
      onCancel={onClose}
      width={360}
      mask={false}
      style={{ backgroundColor: '#161823', borderLeft: '1px solid #333' }}
      headerStyle={{ borderBottom: 'none', padding: '16px 16px 0' }}
      bodyStyle={{ padding: '0 16px 60px' }}
    >
      <div className="flex flex-col gap-6 mt-4">
        {comments.map((item) => (
          <div key={item.id} className="flex gap-3 group">
            <Avatar src={item.avatar} size="small" style={{ width: 32, height: 32, flexShrink: 0 }}>{item.username[0]}</Avatar>
            <div className="flex-1 flex flex-col gap-1">
              <span className="text-gray-400 text-[12px]">{item.username}</span>
              <span className="text-white text-[14px] leading-6 break-all">{item.content}</span>
              <div className="flex items-center gap-3 text-gray-500 text-[12px] mt-1">
                <span>{item.time}</span>
                <span>{item.location}</span>
                <span className="cursor-pointer hover:text-gray-300">回复</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1 cursor-pointer w-[30px]" onClick={() => toggleLike(item.id)}>
              <IconLikeHeart style={{ fontSize: 16 }} className={item.isLiked ? '!text-[#fe2C55]' : '!text-gray-500 group-hover:!text-gray-300'} />
              <span className="text-gray-500 text-[12px]">{item.likeCount > 0 ? item.likeCount : '赞'}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-full px-4 py-3 bg-[#161823] border-t border-[#333] flex items-center gap-2">
        <div className="flex-1 bg-[#252632] rounded-full px-4 py-2 flex items-center">
            <input
                type="text"
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder-gray-500"
                placeholder="善语结善缘，恶语伤人心"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
        </div>
        <button onClick={handleSend} className={`text-sm font-bold transition-colors ${inputValue ? 'text-[#fe2C55] cursor-pointer' : 'text-gray-600 cursor-not-allowed'}`}>发布</button>
      </div>
    </SideSheet>
  );
}
