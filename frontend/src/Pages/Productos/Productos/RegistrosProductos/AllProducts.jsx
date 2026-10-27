import { useParams } from "react-router-dom";
import { useLang } from "../../../../Contexts/LangProvider";
import {useEffect, useState,useCallback} from 'react'
import { APICALLER } from "../../../../Services/api";
import Tablas from "../../../../Components/UI/Tablas";
import {  Grid } from "@mui/material";

const AllProducts = () => {
  const {lang} = useLang()
  const {id} = useParams();
  const [lista,setLista] = useState({
    productos:[],
  })
  const [loading,setLoading] = useState(true)

  const getLista = useCallback(async()=>{
    let [res] = await Promise.all([
      APICALLER.get({table:'productos',
        include:'productos_registros,depositos',on:'id_producto,id_producto_registro,id_deposito_registro,id_deposito',where:`id_producto,=,${id}`,
        fields:'codigo_producto,id_producto,nombre_producto,cantidad_cargada,fecha_cargada,nombre_deposito'
      }),
    ])
    if(res.response){
      setLista({productos:res.results})
    }
    setLoading(false)

  },[id])


  const columnas = [
    {
      field:"id_producto",
      title:"#",
      noPrint:true
    },
    {
      field:"codigo_producto",
      title:lang.codigo,
    },
    {
      field:"nombre_producto",
      title:lang.nombre,
    },
    {
      field:"nombre_deposito",
      title:lang.deposito,
    },
    {
      field:"cantidad_cargada",
      title:lang.cantidad,
    },
    {
      field:"fecha_cargada",
      title:lang.fecha,
    },
  ]



  useEffect(() => {
    const nA = new AbortController();
    let isActive = true;
    if(isActive){getLista();}
    return ()=>{isActive = false;nA.abort();}
  }, [getLista]);


  const search = (<Grid container spacing={2}>
    <Grid item xs={12} md={4}>
      
    </Grid>
  </Grid>);


  const Acciones = ({rowProps})=>(
    <></>
  )

  return (
    <Tablas 
        title={lang.producto}
        subtitle={`Cantidad actual ${lista.detalles.total}`}
        inputs={search}
        loading={loading}
        icon={{ name:"local_convenience_store" }}
        columns={columnas}
        datas={lista.producto}
        print
        Accions={Acciones}
        showOptions
    />
  )
}

export default AllProducts
