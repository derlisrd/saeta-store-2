import AgendaProvider from "./AgendaProvider";
import AgendaTabs from "./AgendaTab";


const Agenda = () => {

  return (
    <AgendaProvider>
      <AgendaTabs />
    </AgendaProvider>
  );
};

export default Agenda;