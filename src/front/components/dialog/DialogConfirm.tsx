import React, { FC } from 'react';
import styled from 'styled-components';

import { DialogProps } from './Dialog';
import { useDialog } from './DialogTemplate';

interface DialogConfirmProps extends Omit<DialogProps, 'renderButton'> {
  id?: number;
  cancelLabel?: string;
}

export const DialogConfirm: FC<DialogConfirmProps> = (props) => {
  const { DialogTemplate, close } = useDialog({ id: props.id, onClose: props.onClose });

  return (
    <DialogTemplate
      {...props}
      renderButton={() => {
        return (
          <>
            <ConfirmButton
              fontWeight="400"
              onClick={async () => {
                await props.onClose?.();
                close();
              }}>
              {props.cancelLabel || '취소'}
            </ConfirmButton>
            <ConfirmButton
              onClick={async () => {
                await props.onConfirm?.(true);
                close();
              }}>
              {props.confirmLabel || '확인'}
            </ConfirmButton>
          </>
        );
      }}
    />
  );
};

export const DialogButton = styled.button<{ fontWeight?: string }>`
  font-size: 16px;
  width: 100%;
  height: 50px;
  background: #fff;
  border: 0px solid;
  padding: 0;
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 700)};

  :active {
    background: #eee;
  }

  :focus {
    outline: none;
  }

  & + & {
    border-left: 1px solid rgba(0, 0, 0, 0.15);
    margin-left: -1px;
  }
`;

const ConfirmButton = styled(DialogButton)`
  width: 149.5px;
`;
