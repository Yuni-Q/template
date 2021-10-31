import { atom } from 'recoil';

export const Data = atom<string | undefined>({
  key: 'Data',
  default: undefined,
});
