import { useParams } from "react-router-dom"
import {useCallback,useEffect,useState} from 'react'
import { APICALLER } from "../../../Services/api";
import Tablas from "../../../Components/UI/Tablas";
import { useLang } from "../../../Contexts/LangProvider";
import { Button, Grid, Icon } from "@mui/material";
import useGoto from "../../../Hooks/useGoto";


const ListaProductosDeposito = () => {
  const navigate = useGoto()
  const {lang} = useLang()
  const {id} = useParams();
  const [lista,setLista] = useState([])
  const [loading,setLoading] = useState(true)
  const [nombre,setNombre] = useState('')

  const getLista = useCallback(async()=>{
    let [res,dep] = await Promise.all([
      APICALLER.get({table:'productos',
        include:'productos_depositos',on:'id_producto,id_producto_deposito',where:`id_deposito_deposito,=,${id}`,
        fields:'id_productos_deposito,codigo_producto,nombre_producto,stock_producto_deposito'
      }),
    APICALLER.get({table:'depositos',where:`id_deposito,=,${id}`,fields:'nombre_deposito'})
    ])
    if(res.response){
      setLista(res.results)
      setNombre(dep.first.nombre_deposito)
    }
    setLoading(false)

  },[id])

  useEffect(() => {
    const nA = new AbortController();
    let isActive = true;
    if(isActive){getLista();}
    return ()=>{isActive = false;nA.abort();}
  }, [getLista]);


  const columnas = [
    {
      field:"id_productos_deposito",
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
      field:"stock_producto_deposito",
      title:lang.stock,
    },
  ]

  const search = (<Grid container spacing={2}>
    <Grid item xs={12} md={4}>
      <Button variant="contained" onClick={()=>{ navigate.to('depositos') }} startIcon={<Icon>arrow_back_ios</Icon>}>{lang.volver}</Button>
    </Grid>
  </Grid>);


  const Acciones = ({rowProps})=>(
    <></>
  )

  return (
    <Tablas 
        title={lang.depositos}
        subtitle={nombre}
        inputs={search}
        loading={loading}
        icon={{ name:"local_convenience_store" }}
        columns={columnas}
        datas={lista}
        print
        Accions={Acciones}
        showOptions
    />
  )
}

export default ListaProductosDeposito
