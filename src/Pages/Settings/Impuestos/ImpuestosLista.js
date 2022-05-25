import { Icon,IconButton } from '@mui/material'


import Tablas from '../../../Componentes/Tablas'

import { useImpuestos } from './ImpuestosProvider'

const ImpuestosLista = () => {

  const {lista,cargando} = useImpuestos()
  const columnas = [
      {
        field:"id_impuesto",
        title:"#",
      },
      {
        field:"nombre_impuesto",
        title:"Nombre Impuesto",
      },
      {
        field:"porcentaje_impuesto",
        title:"porcentaje",
        extraitem:" %"
      }
  ]

  const inputSearch="";
  const FilterData =  lista.filter(
    (item) => item.nombre_impuesto.toLowerCase().includes(inputSearch.toLowerCase()) 
  );

  const Acciones = ()=>
  (<>
  <IconButton>

    <Icon>more_vert</Icon>
  </IconButton>
  </>)
  
  return (
    <Tablas 
        nombretabla="Impuestos"
        bgicono="#3f51b5"
        cargando={cargando}
        icono="account_balance"
        columnas={columnas}
        filas={FilterData}
        Acciones={Acciones}
        showOptions
    />
  )
}

export default ImpuestosLista
