import React from 'react'
import Tablas from '../../../Components/UI/Tablas'

const ComprasLista = () => {
  return (
    <>
      <Tablas 
        title="Compras realizadas"
        subtitle="Compras realizadas"
        icon={{ name:"shopping_bag" }}
        columnas={[]}
        filas={[]}
        Acciones={()=>{}}
        showOptions
      />
    </>
  )
}

export default ComprasLista
