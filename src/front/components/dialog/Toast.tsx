import React, { FC, ReactElement } from 'react';
import styled, { css } from 'styled-components';

import { DialogProps } from './Dialog';
import { useDialog, LineBrakingText } from './DialogTemplate';

interface ToastProps extends Omit<DialogProps, 'notBackdrop' | 'onShow' | 'renderBody'> {
  id?: number;
}

export const Toast: FC<ToastProps> = (props) => {
  const TOAST_PORTAL_DURATION = 3000;

  const { DialogTemplate, show, close } = useDialog({ id: props.id, onClose: props.onClose });

  return (
    <DialogTemplate
      {...props}
      onShow={async (): Promise<void> => {
        const setTimeoutIds = [];
        setTimeoutIds.push(setTimeout(() => close(), TOAST_PORTAL_DURATION) as unknown as number);
      }}
      notBackdrop={true}
      renderBody={(): ReactElement => {
        return (
          <ToastWrapper>
            <ToastComponent
              show={show}
              onClick={() => {
                props.onConfirm?.(true);
                close();
              }}
              role="alert">
              {LineBrakingText(props.message)}
            </ToastComponent>
          </ToastWrapper>
        );
      }}
    />
  );
};

const Z_INDEX_PORTAL_TOAST = 100000;
const ToastWrapper = styled.div`
  width: 100%;
  position: fixed;
  z-index: ${Z_INDEX_PORTAL_TOAST};
  top: 50%;
  text-align: center;
  transform: translateY(-50%);
`;
const ToastComponent = styled.div<{ show: boolean }>`
  max-width: 270px;
  margin: 0 auto;
  padding: 12px 18px 11px 18px;
  border-radius: 16px;
  background-color: gray;
  text-align: center;
  font-size: 14px;
  color: white;
  display: inline-block;
  visibility: hidden;

  opacity: 0;

  @keyframes dialogBackFadeIn {
    0% {
      opacity: 0;
    }
    1% {
      visibility: visible;
    }
    to {
      opacity: 1;
      visibility: visible;
    }
  }
  @keyframes dialogBackFadeOut {
    0% {
      opacity: 1;
      visibility: visible;
    }
    to {
      opacity: 0;
      visibility: hidden;
    }
  }

  ${({ show }) => css`
    animation: 0.5s forwards ${show ? 'dialogBackFadeIn' : 'dialogBackFadeOut'};
  `}
`;
