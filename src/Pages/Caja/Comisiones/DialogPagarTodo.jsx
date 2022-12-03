import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography, Zoom } from "@mui/material"
import { useEffect,  useState } from "react"
import { useLang } from "../../../Contexts/LangProvider"
import { funciones } from "../../../Functions"
import { useComisiones } from "./ComisionesProvider"


const DialogPagarTodo = () => {
  const { dialogs,setDialogs,datos,filtrado} = useComisiones()
  const cerrar = ()=> { setDialogs({...dialogs,pagartodo:false})}
  const {lang} = useLang()
  const [total,setTotal] = useState(0)
  const [nombre,setNombre] = useState('')

  const pagar = async()=>{
    
    
  }


  useEffect(()=>{
    function contar(){
      if(dialogs.pagartodo){
        const listaFiltrada =  datos.lista.filter(e=> (e.id_empleado === filtrado.id_empleado) && (e.pagado_comision === '0') )  || [];
        let t = 0;
        listaFiltrada.forEach(e => {
          t += parseFloat(e.comision_valor)
        });
        setTotal(t)
        setNombre(listaFiltrada[0].nombre_empleado + ' ' + listaFiltrada[0].apellido_empleado)
      }
    }
    contar()
  },[datos,filtrado,dialogs])

  
  return (
    <Dialog fullWidth open={dialogs.pagartodo} onClose={cerrar} TransitionComponent={Zoom}>
      <DialogTitle>{lang.pagar}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {lang.empleado}: {nombre}
          </Grid>
          {(datos.lista.filter(e=> (e.id_empleado === filtrado.id_empleado) && (e.pagado_comision === '0') )  || []).map(e=>(
            <Grid key={e.id_comision} item xs={12}>
            <Typography variant='subtitle2'>  NRO: {e.id_comision} | Comisión: { funciones.numberFormat ( e.comision_valor )} | Porcentaje: {e.porcentaje} % | Por: {e.nombre_producto}</Typography>
            </Grid>
          ))}
          <Grid item xs={12}>
          <Typography variant='h6'> Total: { funciones.numberFormat(  total )}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
      <Button variant="contained" size="large" onClick={pagar}>{lang.pagar_todo}</Button>
        <Button variant="contained" size="large" onClick={cerrar}>{lang.cerrar}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogPagarTodo
