import { atom } from 'recoil';

export const favoriteAtom = atom<string[]>({
  key: 'favoriteAtom',
  default: [],
});
