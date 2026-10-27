import { Alert, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Stack,  Typography } from "@mui/material";
import { useState } from "react";
import { DatePickerCustom } from "../../../Components/MuiCustom/DatePickerCustom";
import Tablas from "../../../Components/UI/Tablas";
import { funciones } from "../../../Functions";
import { useInformesProductos } from "./InformesProductosProvider";
import BuscarProducto from "./BuscarProducto";
import { columns } from "./columns";



function Lista() {
    
    const {loadings,listas,lang,setFechas,datos,tipo,setTipo,getData} = useInformesProductos()
    const [id,setId] = useState(null);
    let today = new Date()
    //const [fecha,setFecha] = useState(fechas)
    const [desde,setDesde] = useState(today)
    const [hasta,setHasta] = useState(today)

    //id_producto_vendido,nombre_producto,fecha_vendido,precio_vendido,costo_producto_vendido,cantidad_vendido
    
    const changeDatadesde = (e) => { setDesde(e);   }
    const changeDatahasta = (e) => { setHasta(e);  }

    const filtrar = (e)=>{
        e.preventDefault();
        setFechas({desde: funciones.getDateYMD( desde ),hasta: funciones.getDateYMD( hasta)})
    }
    
    const Acciones = ({rowProps})=>(
        <Stack direction="row" spacing={2}>
            
        </Stack>
    )

    const filters = (
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} >
          <Stack direction={{ xs:'column', md:'row' }} spacing={1} divider={<Divider orientation="vertical" flexItem />} >
          <DatePickerCustom
            fullWidth
            label={lang.desde}
            value={desde}
            defaultValue={desde}
            onChange={changeDatadesde}
            name="desdeFecha"
          />
          <DatePickerCustom
            fullWidth
            label={lang.hasta}
            value={hasta}
            defaultValue={hasta}
            onChange={changeDatahasta}
            name="hastaFecha"
          />

          <FormControl sx={{ maxWidth:'160px' }} fullWidth>
            <InputLabel> Tipo: </InputLabel>
            <Select
              name="tipo"
              value={tipo}
              onChange={(e) => {
                setTipo(e.target.value);
              }}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="1">Productos</MenuItem>
              <MenuItem value="2">Servicios</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={filtrar} size="large" variant="contained">
            {lang.filtrar}
          </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <BuscarProducto setId={setId} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Button size="large" onClick={()=>{getData(id)}} disabled={id===null} variant="contained">BUSCAR</Button>
        </Grid>
          <Grid item xs={12} md={4}>
              <Alert severity="success" variant="outlined" icon={false}>
                <Typography variant="h6">
                  Cantidad: {funciones.numberSeparator(datos.cantidad)}{" "}
                </Typography>
              </Alert>
            </Grid>
          <Grid item xs={12} md={4}>
              <Alert severity="success" variant="outlined" icon={false}>
                <Typography variant="h6">
                  {lang.lucro}: {funciones.numberSeparator(datos.lucro)}
                </Typography>
              </Alert>
            </Grid>
          <Grid item xs={12} md={4}>
              <Alert severity="info" variant="outlined" icon={false}>
                <Typography variant="h6">
                  {lang.total_ventas}: {funciones.numberSeparator(datos.vendido)}
                </Typography>
              </Alert>
            </Grid>
          </Grid>
    );


    return (<Tablas
        title={lang.informes_productos_vendidos}
        subtitle={lang.sub_informes_productos_vendidos}
        icon={{ name:"summarize" }}
        columns={columns}
        loading={loadings.listas}
        datas={listas.lista}
        Accions={Acciones}
        inputs={filters}
        lang={lang}
        showOptions
    /> );
}

export default Lista;