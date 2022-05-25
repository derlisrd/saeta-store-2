import { Icon,IconButton,Button } from '@mui/material'
import Tablas from '../../Componentes/Tablas';
import { useMedidas } from './MedidasProvider'


const MedidasLista = () => {

  const {lista,cargando,setDialog,setForm,Clear} = useMedidas()
  const columnas = [
      {
        field:"id_unidad_medida",
        title:"#",
      },
      {
        field:"descripcion_medida",
        title:"Descripción",
      },
      {
        field:"simbolo_medida",
        title:"Simbolo",
      }
  ];

  const inputSearch="";
  const FilterData =  lista.filter(
    (item) => item.descripcion_medida.toLowerCase().includes(inputSearch.toLowerCase()) 
  );

  const open = (values)=>{
    setForm(values)
    setDialog(true);
  }
  const openNew = ()=> {setDialog(true); Clear(); } 

  const Acciones = ({filaProps})=>
  (<>
  <IconButton onClick={()=>open(filaProps)}>
    <Icon>edit</Icon>
  </IconButton>
  </>)

  const Search = (
  <Button variant="outlined" color="primary" size="large" onClick={openNew} >Agregar</Button>)
  
  return (
    <Tablas 
        nombretabla="Unidades de medidas"
        bgicono="#3f51b5"
        cargando={cargando}
        icono="account_balance"
        columnas={columnas}
        filas={FilterData}
        Acciones={Acciones}
        search={Search}
        showOptions
    />
  )
}

export default MedidasLista
