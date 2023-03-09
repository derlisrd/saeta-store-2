import { Snackbar, Alert} from "@mui/material/";
const SnackAlert = ({open, onClose, message,severity="error"}) => {

  return (
    <Snackbar
        open={open}
        onClose={onClose}
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert severity={severity} variant="filled">
          {message}
        </Alert>
      </Snackbar>
  )
}

export default SnackAlert