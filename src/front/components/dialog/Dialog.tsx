import React, { FC } from 'react';

import { DialogTemplateProps, useDialog } from './DialogTemplate';

interface DialogProps extends Omit<DialogTemplateProps, 'show' | 'onChangeShow' | 'close'> {
  id?: number;
}

export const Dialog: FC<DialogProps> = (props) => {
  const { DialogTemplate, ...showProps } = useDialog({ id: props.id, onClose: props.onClose });

  return <DialogTemplate {...showProps} {...props} />;
};
