import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { Spin, Toast } from "@douyinfe/semi-ui";
import { videoListAtom, currentVideoIndexAtom, currentVideoAtom } from "../store/atoms";
import { mockRequest } from "../utils/mockRequest";
import { MOCK_VIDEO_LIST, VideoData } from "../mock/data";
import VideoPlayer from "../components/VideoPlayer";
import VideoInfoOverlay from "../components/VideoInfoOverlay";
import CommentDrawer from "../components/CommentDrawer";

export default function Page() {
  const [videoList, setVideoList] = useAtom(videoListAtom);
  const [currentIndex, setCurrentIndex] = useAtom(currentVideoIndexAtom);
  const [currentVideo] = useAtom(currentVideoAtom);

  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  // 初始化数据
  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      try {
        const data = await mockRequest<VideoData[]>(MOCK_VIDEO_LIST, 600);
        setVideoList(data);
      } catch (error) {
        Toast.error("数据加载失败");
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, [setVideoList]);

  // 键盘事件
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (loading) return;
      if ((e.target as HTMLElement).tagName === 'INPUT') return;

      if (e.key === 'Escape' && isCommentVisible) {
        setIsCommentVisible(false);
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        currentIndex > 0 ? setCurrentIndex(prev => prev - 1) : Toast.warning("已经是第一个视频了");
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        currentIndex < videoList.length - 1 ? setCurrentIndex(prev => prev + 1) : Toast.warning("已经是最后一个视频了");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, videoList.length, setCurrentIndex, isCommentVisible, loading]);

  if (loading) {
    return (
      <div className="h-full w-full bg-black flex items-center justify-center">
        <Spin size="large" tip="正在加载视频流..." />
      </div>
    );
  }

  if (!currentVideo) return <div className="text-white">暂无视频数据</div>;

  return (
    <div className="h-full w-full bg-black flex items-center justify-center overflow-hidden">
        <div className="w-full h-full relative group">
            <VideoPlayer
                url={currentVideo.url}
                poster={currentVideo.poster}
            />

            <VideoInfoOverlay
                author={{
                    name: currentVideo.author,
                    avatar: currentVideo.authorAvatar
                }}
                description={currentVideo.description}
                musicName={`原声 - ${currentVideo.author}`}
                stats={currentVideo.stats}
                onCommentClick={() => setIsCommentVisible(true)}
            />

            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10" />

            <CommentDrawer
              visible={isCommentVisible}
              onClose={() => setIsCommentVisible(false)}
              commentCount={currentVideo.stats.commentCount}
            />
        </div>
    </div>
  );
}
