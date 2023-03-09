import { Dialog,DialogActions,DialogContent,DialogTitle } from '@mui/material';
import Zoom from '@mui/material/Zoom';
import React from 'react';

export default function ModalDialog({ open,onClose,children,title,ActionsButtons, ...res }) {

  return (
      <Dialog
        open={open}
        onClose={onClose}
        TransitionComponent={Zoom}
        {...res}
      >
        <DialogTitle id="alert-dialog-title">{title ? title : 'Alert' }</DialogTitle>
        <DialogContent dividers>
            {children}
        </DialogContent>
        <DialogActions>
          {ActionsButtons}
        </DialogActions>
      </Dialog>
  );
}
