import AgendaDialog from "./AgendaDialog";
import AgendaDialogEdit from "./AgendaDialogEdit";
import AgendaLista from "./AgendaLista";
import AgendaProvider from "./AgendaProvider";
import DialogBuscarCliente from "./DialogBuscarCliente";
import RegistraCliente from "./RegistraCliente";

const Agenda = () => {

  return (
    <AgendaProvider>
      <RegistraCliente />
      <AgendaLista />
      <DialogBuscarCliente />
      <AgendaDialog />
      <AgendaDialogEdit /> 
    </AgendaProvider>
  );
};

export default Agenda;