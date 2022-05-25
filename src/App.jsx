import LangProvider from "./Contexts/LangProvider";
import TemaProvider from "./Contexts/TemaProvider";
import Pages from "./Pages";



function App() {

  return (
    <TemaProvider>
      <LangProvider>
        <Pages />
      </LangProvider>
    </TemaProvider>
  );
}

export default App;
