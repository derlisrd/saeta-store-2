import TemaProvider from "./Contexts/TemaProvider";
import Pages from "./Pages";



function App() {

  return (
    <TemaProvider>
      <Pages />
    </TemaProvider>
  );
}

export default App;
