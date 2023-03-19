import { Suspense, lazy } from 'react';
import LoadingPage from "./Components/UI/LoadingPage";
import ConfiguracionProvider from "./Contexts/ConfiguracionProvider";
import LangProvider from "./Contexts/LangProvider";




const Loadable = (Component) => (props) => {
  return (
    <Suspense
      fallback={
        <LoadingPage />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};


function App() {
 return (
  <ConfiguracionProvider>
    <LangProvider>
      <Pages />
    </LangProvider>
  </ConfiguracionProvider>
  );
}

const Pages = Loadable(lazy(() => import('./Pages')));

export default App;
