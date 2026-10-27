
import { Box, Button } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import esLocale from "@fullcalendar/core/locales/es";
import interactionPlugin from "@fullcalendar/interaction";
import {useAgenda} from './AgendaProvider';
import LoadingBackDrop from "../../../Components/UI/LoadingBackDrop";


const AgendaLista = () => {


    const {eventos,addEvent,loading,lista,setForm,dialogs,setDialogs} = useAgenda();
    const Agendar = a =>{

      addEvent(a.date.getFullYear().toString()+"-"+(a.date.getMonth()+1).toString().padStart(2, 0) +"-"+a.date.getDate().toString().padStart(2, 0) )
    
    }
    
      const reAgendar = id => {
        let listaEventos = [...lista];
        let find = listaEventos.find(elem => elem.id_agenda === id );
        //console.log(find)
         if(find){
          setForm(find);
          setDialogs({...dialogs,editar:true});
        } 
      }
    
      const addCellcontent = (a) => {
        return <Button onClick={()=> Agendar(a) } >{a.dayNumberText}</Button>;
      };

      if(loading.general){
        return <LoadingBackDrop />
      }
    
//
  return (
    <Box boxShadow={3} bgcolor='background.paper' padding={4} borderRadius={5}>
    <FullCalendar
      locale={esLocale}
      plugins={[daygridPlugin, interactionPlugin]}
      dayCellContent={addCellcontent}
      editable={true}
      eventTimeFormat={{
        hour: "numeric",
        minute: "2-digit",
        meridiem: false,
      }}
      headerToolbar={{ 
        left: "title prev,next today",
        right: "dayGridMonth,dayGrid"
      }}
      events={eventos}
      dateClick={e=>{}} 
      eventClick={e=>reAgendar(e.event.id)}
    />
    </Box>
  )
}

export default AgendaLista