

import Tablas from '../../../Componentes/Tablas'
import { useDepositos } from './DepositosProvider'
import MoreMenu from './MoreMenu';
import  Button   from '@mui/material/Button';
import { Icon } from '@mui/material';

const DepositosLista = () => {

  
  const {lista,cargando,borrar,setForm,setDialogs,dialogs} = useDepositos()
  const columnas = [
      {
        field:"id_deposito",
        title:"#",
      },
      {
        field:"nombre_deposito",
        title:"Nombre Depósito",
      },
  ]

  const inputSearch="";
  const FilterData =  lista.filter(i => i.nombre_deposito.toLowerCase().includes(inputSearch.toLowerCase()) );


  const abrir = fila=>{
    setForm(fila);
    setDialogs({ ...dialogs, editar: true });
  }


  const search = (
    <Button color="primary" variant="outlined" startIcon={<Icon>add</Icon>} onClick={()=>{setDialogs({...dialogs,editar:true}); setForm({id_deposito:"",nombre_deposito:""} )}}  >Agregar</Button>
  )

  const Acciones = ({filaProps})=>(<MoreMenu  borrar={borrar} abrir={abrir} filaProps={filaProps} />)
  
  return (
    <Tablas 
        nombretabla="Depósitos"
        subtitle="Depósitos donde se almacenan los productos."
        search={search}
        cargando={cargando}
        icono="local_convenience_store"
        columnas={columnas}
        filas={FilterData}
        Acciones={Acciones}
        showOptions
    />
  )
}

export default DepositosLista
