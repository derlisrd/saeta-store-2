import { Dialog,DialogActions,DialogContent,DialogTitle,Grid,TextField,Box,Chip,Stack,Button, Alert } from '@mui/material'
import React from 'react'
import { useAgenda } from './AgendaProvider';

const AgendaDialogEdit = () => {
    const {dialogs,setDialogs,form,setForm,updateAgenda,borrarAgenda} = useAgenda();

    const onChange = (e) => {
        const { value, name } = e.target;
        setForm({ ...form, [name]: value });
      };
    
      const changeColor = color =>{
        setForm({...form,color_agenda:color})
      }

      const update = ()=>{
            updateAgenda();
      }
    
      const colores = ['#0066cc','#00cc66',"#D90B1C","#202731","#970FF2","#EAF205"]
    
      const cerrar = () => setDialogs({ ...dialogs, editar: false });

  return (
    <Dialog open={dialogs.editar} onClose={cerrar} fullWidth>
      <DialogTitle>Reagendar</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <Alert severity='info' icon={false} variant="outlined">
           Nombre: {form.nombre_cliente} - Tel: {form.telefono_cliente}
          </Alert>
        </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="off"
              autoFocus
              fullWidth
              label="Descripción de agenda"
              name="descripcion_agenda"
              value={form.descripcion_agenda}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Fecha de inicio"
              name="fecha_inicio_agenda"
              value={form.fecha_inicio_agenda}
              type="date"
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Fecha de fin"
              name="fecha_fin_agenda"
              value={form.fecha_fin_agenda}
              type="date"
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12}>
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
        <Button variant="contained" color='error' onClick={()=>{borrarAgenda(form)}}>Borrar</Button>
        <Button variant="outlined" onClick={update}>Reagendar</Button>
        <Button variant="outlined" onClick={cerrar}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AgendaDialogEdit