import { Alert, Grid } from "@mui/material";
import Tablas from "../../../Components/UI/Tablas";
import Accions from "./Accions";
import { Columns } from "./Columns";
import { useCuentasCliente } from "./CuentasClienteProvider";
import { funciones } from "../../../Functions";

function Lista() {

    const {data,isLoading} = useCuentasCliente()

    const Inputs = (<Grid container>
        <Grid item xs={12} md={6}>
            <Alert variant="outlined" icon={false}>
                <h2>MONTO RECIBIDO: {funciones.numberFormat(data.factura.recibido_factura)}</h2>
            </Alert>
        </Grid>
    </Grid>)


    
    const CLIENTE = `${data.cliente.nombre_cliente} ${data.cliente.ruc_cliente}` 
    return(
    <Tablas 
        title={CLIENTE}
        icon={{ name:'inventory' }}
        subtitle="Productos retirados a cuotas por cliente"
        loading={isLoading}
        datas={data.cuenta}
        columns={Columns}
        Accions={Accions}
        inputs={Inputs}
        showOptions
    />)

    
}

export default Lista;