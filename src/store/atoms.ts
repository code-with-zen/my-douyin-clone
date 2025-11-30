import { atom } from 'jotai';
import type { VideoData } from '../mock/data';

export const videoListAtom = atom<VideoData[]>([]);
export const currentVideoIndexAtom = atom(0);

export const currentVideoAtom = atom(get => {
  const list = get(videoListAtom);
  const index = get(currentVideoIndexAtom);
  return list[index] || null;
});
