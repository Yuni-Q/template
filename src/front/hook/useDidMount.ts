import { useEffect, EffectCallback } from 'react';

export default (effect: EffectCallback): void => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
};
