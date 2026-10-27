import { Icon,IconButton,Button } from '@mui/material'
import Tablas from '../../Components/UI/Tablas';
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

  const Acciones = ({rowProps})=>
  (<>
  <IconButton onClick={()=>open(rowProps)}>
    <Icon>edit</Icon>
  </IconButton>
  </>)

  const Search = (
  <Button variant="contained" size="large" onClick={openNew} >Agregar</Button>)
  
  return (
    <Tablas 
        title="Unidades de medidas"
        loading={cargando}
        icon={{ name:"account_balance" }}
        columns={columnas}
        datas={FilterData}
        Accions={Acciones}
        inputs={Search}
        showOptions
    />
  )
}

export default MedidasLista
