import AgendaDialog from "./AgendaDialog";
//import AgendaDialogEdit from "./AgendaDialogEdit";
import AgendaLista from "./AgendaLista";
import AgendaProvider from "./AgendaProvider";
import DialogBuscarCliente from "./DialogBuscarCliente";

const Agenda = () => {

  return (
    <AgendaProvider>
      <AgendaLista />
      <DialogBuscarCliente />
      <AgendaDialog />
      {/* <AgendaDialogEdit /> */}
    </AgendaProvider>
  );
};

export default Agenda;