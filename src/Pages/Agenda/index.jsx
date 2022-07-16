import AgendaDialog from "./AgendaDialog";
import AgendaDialogEdit from "./AgendaDialogEdit";
import AgendaLista from "./AgendaLista";
import AgendaProvider from "./AgendaProvider";

const Agenda = () => {

  return (
    <AgendaProvider>
      <AgendaLista />
      <AgendaDialog />
      <AgendaDialogEdit />
    </AgendaProvider>
  );
};

export default Agenda;