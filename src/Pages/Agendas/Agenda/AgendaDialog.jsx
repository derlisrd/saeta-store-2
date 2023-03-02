import {Box, Dialog, DialogContent, Grid, TextField,Chip,Stack, DialogActions, Button, DialogTitle, Alert
  /* CircularProgress, Tooltip, IconButton, Icon, InputAdornment, Zoom, Autocomplete */ } from "@mui/material";
import { /* useRef, */useState } from "react";
import { funciones } from "../../../Functions";
//import { APICALLER } from "../../../Services/api";
import { useAgenda } from "./AgendaProvider";
import SearchCliente from "./SearchCliente";

const AgendaDialog = () => {
  const { dialogs, setDialogs,insertarAgendar,dates,setDates,initialForm,cliente,setCliente,initialCliente } = useAgenda();
  //const inputDoc = useRef(null);
  /* const initialLoads = {
    inputbuscacliente:false
  } */
  const initialError = {
    active:false,
    message:null,
    code:null
  }
  
  const [error,setError] = useState(initialError);
  //const [loads,setLoads]= useState(initialLoads);
  const [form,setForm] = useState(initialForm)

  const onChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  /* const searchCliente = async(doc)=>{
    setLoads({inputbuscacliente:true})
    let res = await APICALLER.get({table:"clientes",where:`ruc_cliente,=,'${doc}'`,fields:'nombre_cliente,ruc_cliente,telefono_cliente'});

    if(res.response){
      if(res.found===0){
        setCliente(initialCliente)
        setError({active:true,message: "No existe ese documento en los registros."})
      }else{
        setError(initialError)
        setCliente({
          active:true,
          nombre:res.results[0].nombre_cliente,
          doc:res.results[0].ruc_cliente,
          
        })
        setForm({...form,id_cliente_agenda:res.results[0].id_cliente})
      }
    }else{
      setCliente(initialCliente)
      setError({active:true,message:"Ocurrio un error de conexión"})
    }
    setLoads({inputbuscacliente:false})
  } */

  const changeDate = e=>{
    setDates({...dates, [e.target.name]: e.target.value})
  }
  const changeColor = color =>{
    setForm({...form,color_agenda:color})
  }

  const colores = ['#0066cc','#00cc66',"#D90B1C","#202731","#970FF2","#EAF205"]

  const cerrar = () => {
    setDialogs({ ...dialogs, agregar: false })
    setError(initialError);
    setCliente(initialCliente)
    setForm(initialForm)
  }

  const submit = (e)=>{
 //validaciones
    let f = {
      ...form,
      fecha_inicio_agenda:dates.fecha_inicio_agenda,
      fecha_fin_agenda: dates.fecha_fin_agenda,
      id_cliente_agenda:cliente.id_cliente_agenda
    }

    if(f.descripcion_agenda === ""){
      setError({active:true, message:"Ingrese una descripción",code:0});
      return false;
    }

    let today = new Date();
    let spliInicio = funciones.splitFecha(f.fecha_inicio_agenda)
    let spliFin = funciones.splitFecha(f.fecha_fin_agenda)
    if((spliInicio)<today ||  (spliFin)<today )
    {
      setError({active:true, message:"No se puede agendar en el pasado",code:1});
      return false;
    }
    
    if(f.id_cliente_agenda===null || !cliente.active){
      setError({active:true, message:"Ingrese el cliente",code:3});
      return false;
    }

    insertarAgendar(f)
    cerrar();
  }

  return (
    <Dialog open={dialogs.agregar} onClose={cerrar} fullWidth>

      <DialogTitle>Agendar</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
              {
                error.active &&
              <Alert icon={false} severity="error">
                {error.message}
              </Alert>
              }
          </Grid>

          <Grid item xs={12}>
            <TextField
              autoComplete="off"
              autoFocus required
              fullWidth
              error={error.code===0}
              label="Descripción de agenda"
              name="descripcion_agenda"
              value={form.descripcion_agenda}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12}>
            {
              cliente.active &&
              <Alert icon={false}>
                <b>Documento:</b> {cliente.doc}  - <b>Nombre:</b> {cliente.nombre } - <b>Tel:</b> {cliente.telefono_cliente} 
              </Alert>
            }
          </Grid>
        <Grid item xs={12}>
            <SearchCliente />
        </Grid>
        <Grid item xs={12}>
            <Button variant="outlined" onClick={()=>{setDialogs({ ...dialogs, registrarCliente:true })}} >Registrar nuevo cliente</Button>
        </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Fecha de inicio"
              name="fecha_inicio_agenda"
              value={dates.fecha_inicio_agenda}
              type="date"
              onChange={changeDate}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Fecha de fin"
              name="fecha_fin_agenda"
              value={dates.fecha_fin_agenda}
              type="date"
              onChange={changeDate}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Horario"
              name="horario_agenda"
              value={form.horario_agenda}
              type="time"
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12}>
              Color de agenda: <Box sx={{background:form.color_agenda,width: 40, height: 40, }} />
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={1}>
              {
                colores.map((e,i)=>(
                  <Chip key={i} sx={{ bgcolor:e,width: 40, height: 40,cursor:'pointer' }} onClick={()=> changeColor(e)} />
                ))
              }
              
            </Stack>
          </Grid>
        </Grid>

      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={submit}>Agendar</Button>
        <Button variant="outlined" onClick={cerrar}>Cerrar</Button>
      </DialogActions>

    </Dialog>
  );
};

export default AgendaDialog;