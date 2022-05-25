import { Dialog,DialogActions,DialogContent,DialogTitle } from '@mui/material';
import Zoom from '@mui/material/Zoom';
import React from 'react';

export default function AlertDialog(props) {
  const { open,onClose,children,title,lang,actions } = props;
  return (
      <Dialog
        open={open}
        onClose={onClose}
        TransitionComponent={Zoom}
      >
        <DialogTitle id="alert-dialog-title">{title ? title : 'Alert' }</DialogTitle>
        <DialogContent>
            {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            {lang ? lang.cerrar : "Cerrar"}
          </Button>
        </DialogActions>
      </Dialog>
  );
}
