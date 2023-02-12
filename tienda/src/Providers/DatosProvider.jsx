
import React, { createContext, useCallback, useEffect, useState,useContext } from 'react'
import { APICALLER } from '../Services/api'

const DatosContext = createContext()



const DatosProvider = ({children}) => {

    const [loadingPage,setLoadingPage] = useState(true)
    const [datos,setDatos] = useState({
      site_name:'',
      tel: '',
      email:'',
      whatsapp:'',
      moneda:''
    })


    const getDatas = useCallback(async()=>{
        setLoadingPage(true)
        let [site,tel,email,wa,moneda] = await Promise.all([
          APICALLER.get({table:'options',where:`option_key,=,'site_name'`,fields:'option_value'}),
          APICALLER.get({table:'options',where:`option_key,=,'tel'`,fields:'option_value'}),
          APICALLER.get({table:'options',where:`option_key,=,'email'`,fields:'option_value'}),
          APICALLER.get({table:'options',where:`option_key,=,'whatsapp'`,fields:'option_value'}),
          APICALLER.get({table:'options',where:`option_key,=,'moneda'`,fields:'option_value'})
        ])
        setDatos({
          site_name: site.response ? site.results[0].option_value : '',
          tel: tel.response ? tel.results[0].option_value : '',
          email:email.response ? email.results[0].option_value : '',
          whatsapp:wa.response ? wa.results[0].option_value : '', 
          moneda:moneda.response ? moneda.results[0].option_value : ''
        })
        setLoadingPage(false)
        document.title = site.response ? site.results[0].option_value : 'Catálogo';
      },[])
      
      useEffect(() => {
        let isActive = true;
        const ca = new AbortController();
        if (isActive) {
          getDatas();
        }
        return () => {
          isActive = false;
          ca.abort();
        };
      }, [getDatas]);

    const values = {
        loadingPage,datos
    }

  return <DatosContext.Provider value={values}>{children}</DatosContext.Provider>
}

export const useDatos = () =>{
    const {loadingPage,datos} = useContext(DatosContext);
    return {loadingPage,datos}
}

export default DatosProvider
