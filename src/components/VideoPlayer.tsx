import React, { useEffect, useRef } from 'react';
import Player from 'xgplayer';
import 'xgplayer/dist/index.min.css';

interface VideoPlayerProps {
  url: string;
  poster?: string;
}

export default function VideoPlayer({ url, poster }: VideoPlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const playerInstance = useRef<Player | null>(null);

  useEffect(() => {
    if (!playerRef.current || !url) return;

    playerInstance.current = new Player({
      el: playerRef.current,
      url: url,
      poster: poster,
      width: '100%',
      height: '100%',
      fitVideoSize: 'fixed',
      videoConfig: { style: { objectFit: 'contain' } },
      keyShortcut: true,
      playbackRate: [0.5, 0.75, 1, 1.25, 1.5, 2],
      volume: 0.6,
      loop: true,
      autoplay: true,
      controls: true,
      lang: 'zh-cn',
      cssFullscreen: true, // 确保开启
    });

    return () => {
      if (playerInstance.current) {
        playerInstance.current.destroy();
        playerInstance.current = null;
      }
    };
  }, [url]);

  return (
    <div className="w-full h-full bg-black flex items-center justify-center relative group/player">
      {/* 模糊背景效果 */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
         <video src={url} className="w-full h-full object-cover blur-[50px] scale-110" muted loop />
      </div>

      {/* 播放器实体 */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
         <div ref={playerRef} id="mse" className="w-full h-full" />
      </div>
    </div>
  );
}
