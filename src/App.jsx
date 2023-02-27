import ConfiguracionProvider from "./Contexts/ConfiguracionProvider";
import LangProvider from "./Contexts/LangProvider";
import Pages from "./Pages";

function App() {
 return (
  <ConfiguracionProvider>
    <LangProvider>
      <Pages />
    </LangProvider>
  </ConfiguracionProvider>
  );
}

export default App;
