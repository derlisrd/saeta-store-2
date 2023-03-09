import Tablas from '../../../Components/UI/Tablas'
import { Button,IconButton, Icon } from '@mui/material'
import { useRegistroFacturas } from './RegistroFacturasProvider'

const RegistroFacturasLista = () => {

    const {listaFacturas,setOpenModal,cargando,lang} = useRegistroFacturas() 

    const abrir = ()=> setOpenModal(true);

    const columns =[{
        field:"id_empresa_factura",
        title:"ID",
    },
    {
        field:"fecha_empresa_factura",
        title:"Fecha",
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
        <Button variant="contained" size="large" color="primary" onClick={abrir} >  
            {lang.registrar}
        </Button>
    )

  return (
    <>
      <Tablas
        title={lang.registro_facturas}
        subtitle={lang.registro_factura_descripcion}
        datas={listaFacturas}
        columns={columns}
        loading={cargando.lista}
        inputs={search}
        lang={lang}
        showOptions
        Accions={Acciones}
        icon={{ name:"receipt" }}
      />
    </>
  )
}

export default RegistroFacturasLista
