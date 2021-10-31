import React, { FC, ReactElement, ReactNode, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import useDidMount from '../../hook/useDidMount';
import { useDialogStore } from '../../store/DialogStore';

import { DialogButton } from './DialogConfirm';

export const LineBrakingText = (text: ReactNode): ReactNode => {
  return (
    <>
      {typeof text !== 'string'
        ? text
        : text.split('\n').map((line) => {
            return (
              <span key={line}>
                {line}
                <br />
              </span>
            );
          })}
    </>
  );
};

export interface DialogTemplateProps {
  message: string;
  close: () => void;

  show: boolean;
  onChangeShow: (show: boolean) => void;

  onShow?: () => Promise<void>;
  onShown?: () => Promise<void>;
  onClose?: () => Promise<boolean>;

  onConfirm?: (result: boolean) => Promise<void>;
  confirmLabel?: string;

  notBackdrop?: boolean;

  renderBody?: () => ReactElement;
  renderContent?: () => ReactElement;
  renderButton?: () => ReactElement;
}

export const useDialog = ({
  id,
  onClose,
}: {
  id?: number;
  onClose?: () => Promise<boolean>;
}): {
  show: boolean;
  onChangeShow: (bol: boolean) => void;
  close: () => Promise<void>;
  DialogTemplate: FC<DialogTemplateProps>;
} => {
  const { onClosed } = useDialogStore();
  const [show, setShow] = useState(false);
  const onChangeShow = (bol: boolean) => {
    setShow(bol);
  };

  const close = async () => {
    if (onClose && !(await onClose?.())) {
      return;
    }

    onChangeShow(false);
    onClosed(id || 0);
  };

  const DialogTemplate: FC<DialogTemplateProps> = ({
    // eslint-disable-next-line @typescript-eslint/no-shadow
    show,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    onChangeShow,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    close,
    message,

    onShow,
    onShown,

    onConfirm,
    confirmLabel,

    notBackdrop,

    renderBody,
    renderContent,
    renderButton,
  }) => {
    useDidMount(() => {
      (document.querySelector(':focus') as HTMLElement)?.blur();
      onChangeShow(true);

      // onShow를 부르고 애니메이션이 끝나는 300ms 후에 onShown을 호출
      onShow?.();
      const setTimeoutIds: number[] = [];
      setTimeoutIds.push(setTimeout(() => onShown?.(), 301) as unknown as number);

      return () => {
        setTimeoutIds.forEach((setTimeoutId) => {
          clearTimeout(setTimeoutId);
        });
      };
    });

    const _renderBackDrop = (): ReactElement => {
      return <Backdrop show={show}>{_renderBody()}</Backdrop>;
    };

    const _renderBody = (): ReactElement => {
      if (renderBody) {
        return renderBody();
      }
      return (
        <Wrapper show={show}>
          {_renderContent()}
          <ButtonWrapper>{_renderButton()}</ButtonWrapper>
        </Wrapper>
      );
    };

    const _renderContent = (): ReactElement => {
      if (renderContent) {
        return renderContent();
      }
      return <Content>{LineBrakingText(message)}</Content>;
    };

    const _renderButton = (): ReactElement => {
      if (renderButton) {
        return renderButton();
      }
      return (
        <DialogButton
          onClick={async () => {
            await onConfirm?.(true);
            close?.();
          }}>
          {confirmLabel || '확인'}
        </DialogButton>
      );
    };

    const ref = document.querySelector('.dialogs');

    return ref
      ? ReactDOM.createPortal(
          <div role="dialog" aria-modal="true">
            {notBackdrop ? _renderBody() : _renderBackDrop()}
          </div>,
          ref,
        )
      : null;
  };

  return { show, onChangeShow, close, DialogTemplate };
};

const Backdrop = styled.div<{ show: boolean }>`
  transition: ${({ show }) => (show ? 'background 0.3s ease' : 'transform 0.3s step-end, background 0.3s ease')};
  transform: ${({ show }) => (show ? 'translate(0)' : 'translate(9999px)')};
  background: ${({ show }) => (show ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0)')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  left: 0;
  z-index: 99999;
`;

const Wrapper = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? 'block' : 'none')};
  width: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.25);
  border: solid 0.5px rgba(0, 0, 0, 0.2);
`;

const Content = styled.div`
  padding: 30px 20px 25px;
  text-align: center;
  font-size: 16px;
  color: #222222;
  letter-spacing: -0.38px;
  line-height: 1.38;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 50px;
  background: #fff;
  border-radius: 0px 0px 8px 8px;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  border-left: 0;
  border-right: 0;
  border-bottom: 0;
`;
