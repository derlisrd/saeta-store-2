import {useState} from 'react'
import { useNotas } from './NotasProvider'
import Tablas from "../../../Components/UI/Tablas";
import { Button, Grid, Icon, Stack, Tooltip } from '@mui/material';
import { DatePickerCustom } from '../../../Components/MuiCustom/DatePickerCustom';
import { funciones } from '../../../Functions';
const NotasLista = () => {
  const {lista,cargas,lang,dialogs,setDialogs,getListas,setDesdeFecha,setHastaFecha} = useNotas();


  let today = new Date()

  const [desde, setDesde] = useState(today);
  const [hasta, setHasta] = useState(today);

  const changeDatadesde = (e) => setDesde(e);
  const changeDatahasta = (e) => setHasta(e);

  const Filtrar = () => {
    setHastaFecha(funciones.getDateYMD( hasta ));
    setDesdeFecha(funciones.getDateYMD( desde )); 
    //console.log(funciones.getDateYMD(desde),funciones.getDateYMD(hasta))
    getListas()
  };

  const columns = [
    {
      field: "id_notas_pedido",
      title: "NRO",
      style: {fontWeight:"bold"}
    },
    {
      field: "ruc_cliente",
      title: "Doc.",
      style: {fontWeight:"bold"}
    },
    {
      field: "nombre_cliente",
      title: "CLIENTE",
      style: {fontWeight:"bold"}
    },
    {
      field: "nombre_empleado",
      title: "VENDEDOR",
      style: {fontWeight:"bold"}
    },
    {
      field: "fecha_pedido",
      title: "Fecha y hora",
      style: {fontWeight:"bold"}
    },
  ];

  const Acciones= ({rowProps})=>(<Stack direction="row" justifyContent='center' spacing={2}>
    <Button variant='outlined'>{lang.detalles}</Button>
  </Stack>)


const inputs = (
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6} md={3}  >
        <DatePickerCustom 
        fullWidth
        label={lang.desde}
        value={ (desde)}
        defaultValue={desde}
        onChange={changeDatadesde}
        name="desdeFecha"
        />

      </Grid>
      <Grid item xs={12} sm={6} md={3}>
      <DatePickerCustom 
        fullWidth
        label={lang.hasta}
        value={hasta}
        defaultValue={hasta}
        onChange={changeDatahasta}
        name="hastaFecha"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Button
          onClick={Filtrar}
          variant="contained"
          size="large"
          startIcon={<Icon>filter_list</Icon>}
        >
          {lang.ver_lista}
        </Button>
      </Grid>
    <Grid item xs={12}>
      <Tooltip title={lang.nueva_nota} arrow >
        <Button variant="contained" size='large' onClick={()=>{ setDialogs({...dialogs,nuevanota:true})}}>{lang.nueva_nota}</Button>
      </Tooltip>
    </Grid>
  </Grid>
);


  return (
    <Tablas
      title={lang.notas_pedidos}
      subtitle={lang.notas_subtitle}
      columns={columns}
      inputs={inputs}
      datas={lista}
      icon={{ name:"receipt" }}
      Accions={Acciones}
      loading={cargas.listaPedidos}
      showOptions
    />
  )
}

export default NotasLista
