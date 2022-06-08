import { Icon,IconButton } from '@mui/material'

import Tablas from '../../../Components/UI/Tablas'

import { useImpuestos } from './ImpuestosProvider'

const ImpuestosLista = () => {

  const {lista,cargando,lang} = useImpuestos()
  const columnas = [
      {
        field:"id_impuesto",
        title:"#",
      },
      {
        field:"nombre_impuesto",
        title:lang.nombre,
      },
      {
        field:"porcentaje_impuesto",
        title:lang.porcentaje,
        after:" %"
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
        title={lang.impuestos}
        loading={cargando}
        lang={lang}
        icon={{ name:"account_balance" }}
        columns={columnas}
        datas={FilterData}
        Accions={Acciones}
        showOptions
    />
  )
}

export default ImpuestosLista
