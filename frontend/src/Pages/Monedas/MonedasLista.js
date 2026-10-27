import Tablas from "../../Components/UI/Tablas"
import { useMonedas } from "./MonedasProvider"
import {Button} from '@mui/material'

const MonedasLista = () => {

    const {lista,cargando,setDialogCotizacion,setDatosMonedas,lang,datosMonedas} = useMonedas()

    const abrirDialogCotizacion = (datos)=>{
        setDatosMonedas(datos)
        //console.log(datos)
        setDialogCotizacion(true)
    }

    const columns = [
        {
            field: "id_moneda",
            title:"ID"
        },

        {
            field:"activo_moneda",
            title:lang.moneda_principal,
            items:
                {
                    0: lang.no,
                    1: lang.moneda_principal
                }
            ,
            compareField: "activo_moneda",
            styleFieldCondition: "activo_moneda",
            styleCondition: {
              "0": {
                backgroundColor: "#ff7c6b",
                padding: "6px",fontWeight:"bold",
                borderRadius: "5px",
                color: "#780c00",
              },
              "1": {
                backgroundColor: "#2dec76",
                padding: "6px", fontWeight:"bold",
                borderRadius: "5px",
                color: "#007b02",
              },
            },
        },
        {
            field:"abreviatura_moneda",
            title:lang._abreviatura_moneda
        },
        {
            field:"nombre_moneda",
            title:lang.nombre_moneda
        },
        {
            field:"valor_moneda",
            title:lang.valor,
            isNumber:true,
        },
    ]

    const search = (
        <div >
        </div>
    )
    const Acciones = ({rowProps})=>(
    <Button variant="outlined" onClick={()=>{abrirDialogCotizacion(rowProps)}} color="primary" size="small" >{lang.cambiar}</Button>
    )

  return (
    <Tablas
        title={lang.cotizaciones_monedas}
        subtitle={`${lang.moneda_principal}: ${datosMonedas.nombre_moneda}`}
        icon={{ name:"monetization_on" }}
        columns={columns}
        loading={cargando}
        datas={lista}
        Accions={Acciones}
        inputs={search}
        lang={lang}
        showOptions
    />
  )
}

export default MonedasLista
