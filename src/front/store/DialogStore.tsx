import React, { ReactElement } from 'react';
import { atom, useRecoilState } from 'recoil';

import { DialogConfirm } from '../components/dialog/DialogConfirm';
import { Toast } from '../components/dialog/Toast';

export const DialogStore = atom<{ key: string; jsx: ReactElement }[]>({
  key: 'DialogStore',
  default: [],
});

export const useDialogStore = () => {
  const [value, setValue] = useRecoilState(DialogStore);

  const push = (dialog) => {
    const id = new Date().getTime();
    const jsx = React.cloneElement(dialog, { id });
    const newDialog = { key: 'Dialog-' + id, jsx };
    setValue([...value, newDialog]);
  };
  /**
   * 다이얼로그가 닫혔을때 호출됨
   * RootComponent를 통해 관리될 다이얼로그는 닫혔을 때 꼭 호출해야 함
   * @param {DialogInterface} dialogInstance
   */
  const onClosed = (id) => {
    setTimeout(() => {
      const newValue = value.filter((dialog) => parseInt(dialog.key.split('-')[1], 10) !== id);
      setValue([...newValue]);
    }, 200);
  };
  const closeAll = () => {
    setValue([]);
  };
  const pop = () => {
    value.pop();
    setValue(value);
  };

  const toast = (message) => {
    push(<Toast message={message} />);
  };
  const confirm = (message) => {
    return new Promise((resolved) => {
      push(
        <DialogConfirm
          message={message}
          onConfirm={async () => {
            resolved(true);
          }}
          onClose={async () => {
            resolved(false);
            return true;
          }}
        />,
      );
    });
  };

  return { push, onClosed, closeAll, pop, toast, confirm };
};
