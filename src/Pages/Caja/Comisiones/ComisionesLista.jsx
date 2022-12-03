import { useComisiones } from "./ComisionesProvider";
import Tablas from '../../../Components/UI/Tablas'
import {columns} from './columns'
import { useLang } from "../../../Contexts/LangProvider";
import { Alert, Button, FormControl, Grid, Icon,  InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { funciones } from "../../../Functions";
import { useState } from "react";
import { DatePickerCustom } from "../../../Components/MuiCustom/DatePickerCustom";

function ComisionesLista(){

    const {datos,loading,applyFilters,setDialogs,dialogs,setFormPagar,setFormRecibo,setFiltrado,filtrado} = useComisiones();
    
    const {lang} = useLang()
    const today = funciones.fechaActualYMD();
    const [desde, setDesde] = useState(today);
    const [hasta, setHasta] = useState(today);

    

    const changeDatadesde = (e) => setDesde(e)
    const changeDatahasta = (e) => setHasta(e);
    
    const changeFiltrado = e=>{
      const {name,value} = e.target
      setFiltrado({...filtrado,[name]:value})
    }
    const aplicarFiltros = ()=>{
      applyFilters({desde:desde,hasta:hasta,id_empleado: filtrado.id_empleado,pagado_comision:filtrado.pagado_comision})
    }

    const recibo = f=>{
      setDialogs({...dialogs,recibo:true})
      setFormRecibo(f)
    }

    const pagarTodo = ()=>{
      setDialogs({...dialogs,pagartodo:true})
    }
    const pagar = f=>{
      setDialogs({...dialogs,pagar:true})
      setFormPagar(f)
    }

    const Acciones = ({rowProps})=>(
    <Stack spacing={1} direction="row">
      {
        rowProps.pagado_comision === '0' ?
        <Button variant="contained" onClick={()=>{pagar(rowProps)}}>Pagar</Button>
        :
        <Button variant="contained" color="secondary" onClick={()=>{recibo(rowProps)}}>Recibo</Button>
      }
    </Stack>)
    
    const search =(<Grid container spacing={2} alignItems="center">
    <Grid item xs={12} sm={6} md={2}>
      <DatePickerCustom 
        fullWidth
        label={lang.desde}
        value={desde}
        defaultValue={desde}
        onChange={changeDatadesde}
        name="desde"
        />
    </Grid>
    <Grid item xs={12} sm={6} md={2}>
        <DatePickerCustom 
        fullWidth
        value={hasta}
        label={lang.hasta}
        onChange={changeDatahasta}
        name="hasta"
        defaultValue={hasta}
        />
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <FormControl fullWidth>
          <InputLabel>{lang.seleccione_empleado}</InputLabel>
          <Select
            name="id_empleado"
            onChange={changeFiltrado}
            value={filtrado.id_empleado}
          >
            <MenuItem value="">{lang.todos}</MenuItem>
            {datos.empleados.map((item, index) => (
              <MenuItem key={index} value={item.id_empleado}>
                {item.nombre_empleado} {item.apellido_empleado}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4} md={2}>
      <FormControl fullWidth>
          <InputLabel>{lang.seleccione_estado}</InputLabel>
          <Select
            name="id_empleado"
            onChange={changeFiltrado}
            value={filtrado.pagado_comision}
          >
              <MenuItem value="">{lang.seleccione_estado}</MenuItem>
              <MenuItem value='0'>{lang.nopagado}</MenuItem>
              <MenuItem value='1'>{lang.pagado}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item >
        <Button
          onClick={aplicarFiltros}
          variant="contained"
          size="large"
          startIcon={<Icon>filter_list</Icon>}
        >
          {lang.filtrar}
        </Button>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <Alert icon={false}>
          Total: {funciones.numberFormat(datos.total)}
        </Alert>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <Alert icon={false}>
          Total comisión: {funciones.numberFormat( datos.totalComision)}
        </Alert>
      </Grid>
      <Grid item xs={12} md={2}>
          <Button variant="contained" size="large" onClick={()=>{ pagarTodo() }} disabled={filtrado.id_empleado===''} >{lang.pagar_todo}</Button>
      </Grid>
    </Grid>
    )

    return(<>
        <Tablas
            columns={columns}
            datas={datos.lista}
            Accions={Acciones}
            title={lang.comisiones}
            subtitle=""
            icon={{ name:"people" }}            
            showOptions
            loading={loading.lista}
            inputs={search} 
        />
    </>)
}
export default ComisionesLista;