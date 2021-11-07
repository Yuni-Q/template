import React, { FC } from 'react';
import styled from 'styled-components';

import { DialogProps } from './Dialog';
import { useDialog } from './DialogTemplate';

interface DialogBottom extends Omit<DialogProps, 'message'> {
  title: string;
}

export const DialogBottom: FC<DialogBottom> = ({ title, children, ...props }) => {
  const { DialogTemplate, show, close } = useDialog({ id: props.id, onClose: props.onClose });

  return (
    <DialogTemplate
      {...props}
      message=""
      renderBody={() => {
        return (
          <BottomDialogBody show={show} onClick={() => close()}>
            <Title>{title}</Title>
            <div>{children}</div>
          </BottomDialogBody>
        );
      }}
    />
  );
};

const BottomDialogBody = styled.div<{ show: boolean }>`
  position: fixed;
  width: 100vw;
  left: 0;
  bottom: 0;

  padding-top: 25px;
  padding-left: 15px;
  padding-right: 15px;

  padding-bottom: 20px;
  padding-bottom: calc(20px + constant(safe-area-inset-bottom));
  padding-bottom: calc(20px + env(safe-area-inset-bottom));

  background: white;
  border-radius: 10px 10px 0 0;

  z-index: 99999;

  @keyframes openBottomSheet {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0%);
    }
  }
  @keyframes closeBottomSheet {
    0% {
      transform: translateY(0%);
    }
    100% {
      transform: translateY(100%);
    }
  }

  transform: translateY(100%);
  animation: 0.3s forwards ${({ show }) => ` ${show ? 'openBottomSheet' : 'closeBottomSheet'};`};
`;

const Title = styled.div`
  text-align: center;
  font-size: 14px;
  margin-bottom: 20px;
`;
