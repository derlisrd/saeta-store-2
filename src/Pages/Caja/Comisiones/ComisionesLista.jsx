import { useComisiones } from "./ComisionesProvider";
import Tablas from '../../../Components/UI/Tablas'
import {columns} from './columns'
import { useLang } from "../../../Contexts/LangProvider";
import { Button, FormControl, Grid, Icon, InputLabel, MenuItem, Select, TextField, Tooltip } from "@mui/material";

function ComisionesLista(){

    const {datos,loading} = useComisiones();
    const {lang} = useLang()

    const changeDatadesde = e=>{

    }

    const changeDatahasta = e=>{

    }

    const Filtrar = ()=>{

    }
    const Acciones = ({rowProps})=>(
        <Tooltip arrow title={lang.presione_mas_detalles}>
      <Button onClick={()=>console.log(rowProps)} variant="outlined"  color="primary">
        {lang.ver_mas}
      </Button>
    </Tooltip>
    )
    const search =(<Grid container spacing={2} alignItems="center">
    <Grid item xs={12} sm={6} md={2}>
      <TextField
        fullWidth
        label={lang.desde}
        type="date"
        onChange={changeDatadesde}
        name="desdeFecha"
        
      />
    </Grid>
    <Grid item xs={12} sm={6} md={2}>
        <TextField
          fullWidth
          label={lang.hasta}
          type="date"
          onChange={changeDatahasta}
          name="hastaFecha"
          
        />
      </Grid>
      <Grid item xs={12} sm={4} md={2}>
        <FormControl fullWidth>
          <InputLabel>{lang.seleccione_empleado}</InputLabel>
          <Select
            name="id_empleado"
            onChange={(e) => {
              
            }}
            
          >
            <MenuItem value="">{lang.todos}</MenuItem>
            {[].map((item, index) => (
              <MenuItem key={index} value={item.id_empleado}>
                {item.nombre_empleado}{item.apellido_empleado}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={5}>
        <Button
          onClick={Filtrar}
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