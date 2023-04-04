import Tablas from "../../../Components/UI/Tablas";
import Accions from "./Accions";
import { Columns } from "./Columns";
import { useCuentasCliente } from "./CuentasClienteProvider";

function Lista() {

    const {data,isLoading} = useCuentasCliente()

    const Inputs = (<></>)


    
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