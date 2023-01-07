import { APICALLER } from "../../../Services/api"
import {useEffect,useCallback,useState} from 'react';
import { useLang } from "../../../Contexts/LangProvider";
import { useLogin } from "../../../Contexts/LoginProvider";
import Tablas from "../../../Components/UI/Tablas";
import { Grid } from "@mui/material";
const RegistroActividad = () => {


  const {userData} = useLogin()
  const {lang} = useLang()
  const [lista,setLista] = useState([])
  const [loading,setLoading] = useState(true)
  
    const getLista = useCallback(async()=>{
        let [res] = await Promise.all([
          APICALLER.get({table:'users',
            include:'users_registros',on:'id_user,id_user_registro', sort:'fecha_login',
            fields:'nombre_user,fecha_login,username_user,id_users_registro',token:userData.token_user
          })
        ])
        if(res.response){
          setLista(res.results)
        }
        setLoading(false)
    
      },[userData.token_user])
    
      


      useEffect(() => {
        const nA = new AbortController();
        let isActive = true;
        if(isActive){getLista();}
        return ()=>{isActive = false;nA.abort();}
      }, [getLista]);

      const columnas = [
        {
          field:"id_users_registro",
          title:"#",
          noPrint:true
        },
        {
          field:"nombre_user",
          title:lang.nombre,
        },
        {
          field:"fecha_login",
          title:lang.fecha,
        },
        
      ]
    
      const search = (<Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          
        </Grid>
      </Grid>);
    
    
      const Acciones = ({rowProps})=>(
        <></>
      )
    
      return (
        <Tablas 
            title={lang.actividad}
            subtitle='Registros de actividades'
            inputs={search}
            loading={loading}
            icon={{ name:"sync_alt" }}
            columns={columnas}
            datas={lista}
            
            Accions={Acciones}
            showOptions
        />
      )
}

export default RegistroActividad
