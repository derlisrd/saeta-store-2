import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress, Zoom,Icon } from "@mui/material";

function DialogBorrar({onClose,send,text,isLoading,open}) {
    return ( <Dialog sx={{ ".MuiDialog-paper":{  borderRadius:'12px'} }} open={open} maxWidth="xs" onClose={onClose} TransitionComponent={Zoom} fullWidth>
    <DialogTitle>Borrar</DialogTitle>
    <DialogContent>
        <Box>{isLoading && <LinearProgress />}</Box>
      <Box display="flex" padding={2} justifyContent="center"><Icon color="warning" sx={{ fontSize:96 }} >warning_amber</Icon></Box>
      <DialogContentText align="center">{text}</DialogContentText>
    </DialogContent>
    <DialogActions>
        <Button onClick={onClose} variant="outlined">Cancelar</Button>
        <Button onClick={send} variant="contained">Borrar</Button>
    </DialogActions>
  </Dialog>  );
}

export default DialogBorrar;