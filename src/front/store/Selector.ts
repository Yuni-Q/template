import { selector } from 'recoil';

import { Data } from './Date';

export const Selector = selector<number | undefined>({
  key: 'Selector',
  get: ({ get }) => {
    const text = get(Data);
    return text?.length;
  },
});
