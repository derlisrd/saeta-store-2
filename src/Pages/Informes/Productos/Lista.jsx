import { Alert, Button, Fab, Grid, Icon, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Tablas from "../../../Components/UI/Tablas";
import { useInformesProductos } from "./InformesProductosProvider";



function Lista() {
    
    const {loadings,listas,lang,fechas,setFechas,funciones,datos} = useInformesProductos()
    

    const [fecha,setFecha] = useState(fechas)
    //id_producto_vendido,nombre_producto,fecha_vendido,precio_vendido,costo_producto_vendido,cantidad_vendido
    const columns = [
        {
            field: "id_productos_vendido",
            title: "#",
            noPrint:true
          },
          {
            field: "cantidad_vendido",
            title: "Cantidad",
            isNumber:true,
            style:{fontWeight:"bold"}
          },
          {
            field: "nombre_producto",
            title: "Producto",
            style:{fontWeight:"bold"}
          },
          {
            field: "costo_producto_vendido",
            title: "Costo",
            isNumber:true
          },
          {
            field: "precio_vendido",
            title: "Precio",
            isNumber:true
          },
          {
            field: "lucro_vendido",
            title: "Lucro",
            isNumber:true,
            style:{backgroundColor:"#00ce4f",padding:"6px",borderRadius:"5px",color:'#006226',fontWeight:"bold"}
          },
          {
            field: "fecha_vendido",
            title: "Fecha",
          },
    ];
    
    const change = e=>{
        setFecha({...fecha,[e.target.name]:e.target.value})
    }
    const filtrar = (e)=>{
        e.preventDefault();
        setFechas(fecha)
    }
    
    const Acciones = ({rowProps})=>(
        <Stack direction="row" spacing={2}>
            <Fab size="small"><Icon>settings</Icon></Fab>
        </Stack>
    )

    const filters = (

        <Grid container spacing={2} >
            <Grid item xs={12} sm={6} md={2}>
                <TextField 
                    type="date" fullWidth
                    onChange={change}
                    value={fecha.desde}
                    label={lang.desde}
                    name="desde"
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField 
                    type="date" fullWidth
                    onChange={change}
                    value={fecha.hasta}
                    label={lang.hasta}
                    name="hasta"
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <Button onClick={filtrar} size="large" variant="contained" >Filtrar</Button>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Alert severity="success" variant="outlined" icon={false}>
                            <Typography variant="h6">
                                {lang.lucro}: {funciones.numberSeparator(datos.lucro)}{" "}
                            </Typography>
                        </Alert>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Alert severity="info" variant="outlined" icon={false}>
                            <Typography variant="h6">
                                {lang.total_ventas}: {funciones.numberSeparator(datos.vendido)}{" "}
                            </Typography>
                        </Alert>
                    </Grid>
                </Grid>
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
        print
        showOptions
    /> );
}

export default Lista;