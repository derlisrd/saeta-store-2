import { Dialog, DialogContent, Grid, TextField,Chip,Stack, DialogActions, Button, DialogTitle } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useAgenda } from "./AgendaProvider";

const AgendaDialog = () => {
  const { dialogs, setDialogs, form, setForm,insertarAgendar } = useAgenda();

  const onChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const changeColor = color =>{
    setForm({...form,color_agenda:color})
  }

  const colores = ['#0066cc','#00cc66',"#D90B1C","#202731","#970FF2","#EAF205"]

  const cerrar = () => {setDialogs({ ...dialogs, agregar: false })}

  return (
    <Dialog open={dialogs.agregar} onClose={cerrar} fullWidth>
      <DialogTitle>Agendar</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
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
        <Button variant="outlined" onClick={insertarAgendar}>Agendar</Button>
        <Button variant="outlined" onClick={cerrar}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AgendaDialog;