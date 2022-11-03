import LangProvider from "./Contexts/LangProvider";
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import Pages from "./Pages";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <LangProvider>
      <Pages />
    </LangProvider>
    </QueryClientProvider>
  );
}

export default App;
