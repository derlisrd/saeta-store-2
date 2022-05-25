import { Button, Icon } from '@mui/material'
import Tablas from '../../Componentes/Tablas'
import { useCuentas } from './CuentasProvider'

const CuentasPagarLista = () => {

    const {cargando,listaPagar,dialogs,setDialogs,setformPagar} = useCuentas()

    const columnas = [
        {
            field:"nro_factura_compra",
            title:"Nro factura",
            style:{fontWeight:"bold"}
        },
        {
            field:"total_factura_compra",
            title:"Total",
            isNumber:true,
            style:{fontWeight:"bold"}
        },
        {
            field:"fecha_pago_compra",
            title:"Fecha a pagar",
            isDate:true,
        },
        {
            field:"fecha_compra",
            title:"Fecha de compra",
            isDate:true,
        },
        {
            field:"estado_compra",
            title:"Estado",
            items: {1:"Pagado",2:"Pendiente de pago"},
            comparaItem: "estado_compra",
            style:{fontWeight:"bold"}
        }
    ]

    const openPago = (form)=>{
        setDialogs({...dialogs,pagar:true})
        setformPagar(form)
    }

    const Acciones = ({filaProps})=>(
    <Button variant="outlined" onClick={()=>{openPago(filaProps)}} 
    startIcon={<Icon color="primary">paid</Icon>} >Pagar</Button>)
    
  return (
    <Tablas
        nombretabla="Cuentas a Pagar"
        subtitle="Lista de compras a pagar"
        namecolumnID="id_factura"
        Acciones={Acciones}
        cargando={cargando} 
        columnas={columnas}
        filas={listaPagar}
        showOptions
    />
  )
}

export default CuentasPagarLista
