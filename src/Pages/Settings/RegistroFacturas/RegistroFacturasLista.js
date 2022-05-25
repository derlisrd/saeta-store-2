import Tablas from '../../../Componentes/Tablas'
import { Button,IconButton, Icon } from '@mui/material'
import { useRegistroFacturas } from './RegistroFacturasProvider'

const RegistroFacturasLista = () => {

    const {listaFacturas,setOpenModal,cargando} = useRegistroFacturas() 

    const abrir = ()=> setOpenModal(true);

    const columns =[{
        field:"id_empresa_factura",
        title:"ID",
    },
    {
        field:"propietario_empresa",
        title:"Propietario",
    },
    {
        field:"timbrado_factura",
        title:"Timbrado",
    },
    {
        field:"inicio_timbrado",
        title:"Fecha Inicio",
    },
    {
        field:"fin_timbrado",
        title:"Fecha fin",
    },
    {
        field:"nro_datos_factura",
        title:"Nros de factura",
    },
    {
        field:"nro_inicio_factura",
        title:"Nro inicio factura",
    },
    {
        field:"nro_fin_factura",
        title:"Nro fin factura",
    },
    {
        field:"nombre_caja",
        title:"Caja asignada"
    }
]


    
    const Acciones = ()=>(<div>
        <IconButton>
            <Icon>delete</Icon>
        </IconButton>
    </div>)

    const search = (
        <Button variant="outlined" color="primary" onClick={abrir} >  
            Registrar
        </Button>
    )

  return (
    <>
      <Tablas 
        nombretabla="Facturas"
        icono="text_snippet"
        bgicono="#303f9f"
        subtitle="Facturas habilitadas por la set"
        columnas={columns}
        cargando={cargando}
        filas={listaFacturas}
        namecolumnID="id_empresa_factura"
        Acciones={Acciones}
        search={search}
        showOptions
      />
    </>
  )
}

export default RegistroFacturasLista
