
import { Button, Stack } from '@mui/material'
import Tablas from '../../Components/UI/Tablas'
import { useCuentas } from './CuentasProvider'

const CuentasPagarLista = () => {

    const {cargando,dialogs,setDialogs,setformPagar,lang,listas} = useCuentas()

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
            field: "estado_compra",
            title: lang.estado,
            compareField:"estado_compra",
            items: {
              "1": lang.pagado,
              "2": lang.pendiente,
            },
            styleFieldCondition: "estado_compra",
            styleCondition: {
              "1": {
                backgroundColor: "#2dec76",
                padding: "3px",fontWeight:"bold",
                borderRadius: "5px",
                color: "#007b02",
              },
              "2": {
                backgroundColor: "#ff7c6b",
                padding: "3px", fontWeight:"bold",
                borderRadius: "5px",
                color: "#780c00",
              },
            },
          },
    ]

    const openPago = (form)=>{
        setDialogs({...dialogs,pagar:true})
        setformPagar(form)
    }


    const Acciones = ({ rowProps }) => (
      <Stack spacing={2} direction="row">
      <Button onClick={() => console.log(rowProps)} variant="outlined">
        {lang.detalles}
      </Button>
      <Button onClick={() => openPago(rowProps)} variant="outlined">
        {lang.pagar}
      </Button>
      </Stack>
    );
    
  return (
    <Tablas
        subtitle={lang.listas_compras}
        Accions={Acciones}
        icon={{ name:"payments" }}
        columns={columnas}
        showOptions
        title={lang.cuentas_a_pagar}
        lang={lang}
        loading={cargando.lista}
        datas={listas.pagar}
    />
  )
}

export default CuentasPagarLista
