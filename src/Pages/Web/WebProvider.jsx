import {createContext,useContext,useEffect,useState,useCallback} from 'react'
import { APICALLER } from '../../Services/api';

const Context = createContext()

const WebProvider = ({children}) => {
  
    const storage = JSON.parse(localStorage.getItem("dataWeb"));
    
    const [loading,setLoading] = useState({
        general:true
    })
    const initialDatos = {
        site_name : storage ? storage.site_name : ''
    }
    const [datos,setDatos] = useState(initialDatos)



    const setearDatos = lista=>{
        setDatos(lista);
        localStorage.setItem("dataWeb", JSON.stringify(lista));
      }

    const traerDatos = useCallback(async()=>{
        setLoading({general:false})
        const sto = localStorage.getItem("dataWeb");
        if(sto===null){
            let [site,tel,email,wa,moneda,f,i,desc,logo] = await Promise.all([
                APICALLER.get({table:'options',where:`option_key,=,'site_name'`,fields:'option_value'}),
                APICALLER.get({table:'options',where:`option_key,=,'tel'`,fields:'option_value'}),
                APICALLER.get({table:'options',where:`option_key,=,'email'`,fields:'option_value'}),
                APICALLER.get({table:'options',where:`option_key,=,'whatsapp'`,fields:'option_value'}),
                APICALLER.get({table:'options',where:`option_key,=,'moneda'`,fields:'option_value'}),
                APICALLER.get({table:'options',where:`option_key,=,'facebook'`,fields:'option_value'}),
                APICALLER.get({table:'options',where:`option_key,=,'instagram'`,fields:'option_value'}),
                APICALLER.get({table:'options',where:`option_key,=,'site_description'`,fields:'option_value'}),
                APICALLER.get({table:'options',where:`option_key,=,'logo_url'`,fields:'option_value'}),
              ])
              setearDatos({
                site_name: site.response ? site.results[0].option_value : '',
                tel: tel.response ? tel.results[0].option_value : '',
                email:email.response ? email.results[0].option_value : '',
                whatsapp:wa.response ? wa.results[0].option_value : '', 
                moneda:moneda.response ? moneda.results[0].option_value : '',
                facebook:f.response ? f.results[0].option_value : '',
                instagram:i.response ? i.results[0].option_value : '',
                description:desc.response ? desc.results[0].option_value : '',
                logo_url:logo.response ? logo.results[0].option_value : ''
              })
        }
        setLoading({general:false})
    },[])
  

    useEffect(() => {
        let isActive = true;
        const ca = new AbortController()
        if(isActive){traerDatos();}
        return () => {isActive = false; ca.abort(); };
    }, [traerDatos]);

    const values = {datos,loading}

    return <Context.Provider value={values}>{children}</Context.Provider>
}

export const useWeb = ()=>{
    const {datos,loading} = useContext(Context)
    return {datos,loading}
}

export default WebProvider
