
import { CircularProgress } from "@mui/material";

function LoadingBackDrop() {
  const div = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    width: "100%",
  };

  return (
    <div style={div}>
      <CircularProgress />
    </div>
  );
}

export default LoadingBackDrop;
