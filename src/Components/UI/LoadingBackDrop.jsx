import { Backdrop, CircularProgress } from "@mui/material";
import { useGlobalStyles } from "../../Styles/GlobalStyles";

const LoadingBackDrop = () => {
    const style = useGlobalStyles();
  return (
    <Backdrop className={style.backdrop} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingBackDrop;
