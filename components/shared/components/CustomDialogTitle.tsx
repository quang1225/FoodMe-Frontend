import { DialogTitle, IconButton } from '@mui/material';
import React from 'react';
import { CloseIcon } from 'utils/icons';

export interface DialogTitleProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof DialogTitle>,
    'onClick' | 'children' | 'className'
  > {
  className?: any;
  children?: React.ReactNode;
  onClose?: () => void;
}

const CustomDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 15,
            color: '#535353',
          }}
        >
          <CloseIcon style={{ fontSize: 14, color: '#535353' }} />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default CustomDialogTitle;
