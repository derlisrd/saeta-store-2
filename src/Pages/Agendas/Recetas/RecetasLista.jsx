import { Button, Stack, Tooltip } from '@mui/material'
import Tablas from '../../../Components/UI/Tablas'
import { useRecetas } from './RecetasProvider';

const RecetasLista = () => {
    

  const {loadings,listas,setDialogs,setDetalles,dialogs} = useRecetas()

  const columns = [
    {
    field: "id_receta",
    title:"ID",
    },
    {
      field: "ruc_cliente",
      title:"Doc.",
    },
    {
      field: "nombre_cliente",
      title:"Cliente",
    },
    {
      field: "telefono_cliente",
      title:"Tel",
    },
    {
      field: "updated_at",
      title:"Fecha",
    },  
  ]

  const openDetalles = f =>{
    setDetalles(f)
    setDialogs({...dialogs,detalles:true})
  }

  const Acciones = ({rowProps})=>{
    return(<Stack direction="row" spacing={1}>
      <Button variant='outlined' onClick={()=>{openDetalles(rowProps)}} size='small'>Detalles</Button>
    </Stack>)
  }
  

  const openAdd = ()=>{ setDialogs(pre=> {return {...pre,add:true}})}

  const search = (<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
    <Tooltip title="Agregar nueva receta" arrow >
          <Button variant="contained" size="large" onClick={openAdd}>
            Agregar
          </Button>

    </Tooltip>
  </Stack>);

  return (
    <Tablas
        title="Recetas"
        subtitle="Listado de recetas por clientes/paciente"
        icon={{ name:"receipt_long" }}
        columns={columns}
        loading={loadings.lista}
        datas={listas.recetas}
        Accions={Acciones}
        inputs={search}
        showOptions
    />
  )
}

export default RecetasLista
