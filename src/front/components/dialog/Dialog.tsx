import React, { FC } from 'react';

import { DialogTemplateProps, useDialog } from './DialogTemplate';

export interface DialogProps extends Omit<DialogTemplateProps, 'show' | 'close'> {
  id?: number;
}

export const Dialog: FC<DialogProps> = (props) => {
  const { DialogTemplate, ...showProps } = useDialog({ id: props.id, onClose: props.onClose });

  return <DialogTemplate {...showProps} {...props} />;
};
