import { Backdrop, CircularProgress } from "@mui/material";
import { useGlobalStyles } from "../../Styles/GlobalStyles";

export default function Loading () {
    const style = useGlobalStyles();
  return (
    <Backdrop className={style.backdrop} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

 