import {Button, Grid, Icon, IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { DatePickerCustom } from "../../../Components/MuiCustom/DatePickerCustom";
import Tablas from "../../../Components/UI/Tablas";
import { funciones } from "../../../Functions";
import { useAgenda } from "./AgendaProvider"

const AgendaListado = () => {
  const {listaAgenda,getLista,loading,buscarRegistro} = useAgenda()
  const today = new Date()
  const [search,setSearch] = useState('')
  const [desde, setDesde] = useState(today);
  const [hasta, setHasta] = useState(today);

  const changeDatadesde = (e) => { setDesde(e);   }
  const changeDatahasta = (e) => { setHasta(e);   }

  const Filtrar = () => {
    getLista(funciones.getDateYMD( desde ), funciones.getDateYMD( hasta ));  
  };

  
  const columnas = [
    {
      field:"fecha_inicio_agenda",
      title:"Fecha",
    },
    {
      field:"horario_agenda",
      title:"Hora",
    },
    {
      field:"nombre_cliente",
      title:"Cliente",
    },
    {
      field:"telefono_cliente",
      title:"TEL",
    },
    {
      field:'descripcion_agenda',
      title:'Descripcion'
    }
    
  ];
  const Acciones = ({rowProps})=>(<Stack direction="row" spacing={1}><Button>Detalles</Button></Stack>)

const Search = (
  <Grid container spacing={2} alignItems="center">
    <Grid item xs={12} sm={6} md={4}>
      <DatePickerCustom
        fullWidth
        label="desde"
        value={desde}
        defaultValue={desde}
        onChange={changeDatadesde}
        name="desdeFecha"
      />
    </Grid>
    <Grid item xs={12} sm={6} md={4}>
      <DatePickerCustom
        fullWidth
        label="hasta"
        value={hasta}
        defaultValue={hasta}
        onChange={changeDatahasta}
        name="hastaFecha"
      />
    </Grid>
    
    <Grid item xs={12} sm={6} md={4}>
      <Button
        onClick={Filtrar}
        variant="contained"
        size="large"
        startIcon={<Icon>filter_list</Icon>}
      >
        Filtrar
      </Button>
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField label="Buscar por cliente" size="large" value={search} onChange={e=>{setSearch(e.target.value)}}  
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={()=>{buscarRegistro(search)}}>
                <Icon>search</Icon>
              </IconButton>
            </InputAdornment>
          ),
        }}
        onKeyPress={e=>{if(e.key==='Enter'){buscarRegistro(search) } } }
      />
    </Grid>
  </Grid>
);
  return (
    <Tablas
      title="Agenda"
      subtitle="Listado de turnos"
      icon={{ name: "login" }}
      showOptions
      loading={loading.listado}
      columns={columnas}
      datas={listaAgenda}
      Accions={Acciones}
      inputs={Search}
    />
  );
}

export default AgendaListado
