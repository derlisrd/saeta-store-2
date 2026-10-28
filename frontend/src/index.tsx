import ReactDOM from "react-dom/client";
import App from "./App";
import TemaProvider from "./Contexts/TemaProvider";
import "@fontsource/poppins";
import "material-icons/iconfont/filled.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <TemaProvider>
    <App />
  </TemaProvider>
);
