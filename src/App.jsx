import LangProvider from "./Contexts/LangProvider";

import Pages from "./Pages";

function App() {
  return (
    <LangProvider>
      <Pages />
    </LangProvider>
  );
}

export default App;
