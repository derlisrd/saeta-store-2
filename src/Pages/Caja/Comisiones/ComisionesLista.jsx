import { useComisiones } from "./ComisionesProvider";
import Tablas from '../../../Components/UI/Tablas'
import {columns} from './columns'
import { useLang } from "../../../Contexts/LangProvider";
import { Button, FormControl, Grid, Icon, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip } from "@mui/material";
import { funciones } from "../../../Functions";
import { useState } from "react";

function ComisionesLista(){

    const {datos,loading,applyFilters} = useComisiones();
    const {lang} = useLang()
    const today = funciones.fechaActualYMD();
    const filtradoInitial = {
      desde:today,
      hasta:today,
      id_empleado:""
    }
    const [filtrado,setFiltrado] = useState(filtradoInitial)

    const changeFiltrado = e=>{
      const {name,value} = e.target
      setFiltrado({...filtrado,[name]:value})
    }



    const Acciones = ({rowProps})=>(
        <Tooltip arrow title={lang.presione_mas_detalles}>
      <IconButton onClick={()=>{console.log(rowProps)}}><Icon>visibility</Icon></IconButton>
    </Tooltip>
    )
    const search =(<Grid container spacing={2} alignItems="center">
    <Grid item xs={12} sm={6} md={2}>
      <TextField
        fullWidth
        label={lang.desde}
        type="date"
        onChange={changeFiltrado}
        name="desde"
        defaultValue={filtrado.desde}
      />
    </Grid>
    <Grid item xs={12} sm={6} md={2}>
        <TextField
          fullWidth
          label={lang.hasta}
          type="date"
          onChange={changeFiltrado}
          name="hasta"
          defaultValue={filtrado.hasta}
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
                {item.nombre_empleado}{item.apellido_empleado}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item >
        <Button
          onClick={()=>{applyFilters(filtrado)}}
          variant="contained"
          size="large"
          startIcon={<Icon>filter_list</Icon>}
        >
          {lang.filtrar}
        </Button>
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