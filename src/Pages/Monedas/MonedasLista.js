import Tablas from "../../Componentes/Tablas"
import { useMonedas } from "./MonedasProvider"
import {Button} from '@mui/material'

const MonedasLista = () => {

    const {lista,cargando,setDialogCotizacion,setDatosMonedas} = useMonedas()

    const abrirDialogCotizacion = (datos)=>{
        setDatosMonedas(datos)
        setDialogCotizacion(true)
    }

    const columns = [
        {
            field: "id_moneda",
            title:"ID"
        },
        {
            field:"activo_moneda",
            title:"Moneda principal",
            items:
                {
                    0: "No",
                    1: "Moneda principal"
                }
            ,
            comparaItem: "activo_moneda",
        },
        {
            field:"abreviatura_moneda",
            title:"Abre."
        },
        {
            field:"nombre_moneda",
            title:"Nombre de moneda"
        },
        {
            field:"valor_moneda",
            title:"Valor",
            isNumber:true,
        },
    ]

    const search = (
        <div >
        </div>
    )
    const Acciones = ({filaProps})=>(
    <Button variant="outlined" onClick={()=>{abrirDialogCotizacion(filaProps)}} color="primary" size="small" >Cambiar</Button>
    )

  return (
    <Tablas
        nombretabla="Cotizaciones de monedas"
        subtitle="Moneda principal: Guaraní"
        bgicono="#3f51b5"
        icono="monetization_on"
        columnas={columns}
        cargando={cargando}
        filas={lista}
        Acciones={Acciones}
        namecolumnID="id_moneda"
        search={search}
        showOptions
    />
  )
}

export default MonedasLista
