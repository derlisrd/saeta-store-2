import {createContext,useState,useCallback,useEffect,useContext} from 'react';
import { APICALLER } from '../../../Services/api';

const Contexto = createContext();

function ComisionesProvider({children}){

    const initialDatos = {
        lista: []
    }
    const initialLoading = {
        lista: true,
    }
    const [datos,setDatos] = useState(initialDatos)
    const [loading,setLoading] = useState(initialLoading)

    const getData = useCallback(async () => {
        let res = await APICALLER.get({
            
        });

        setLoading({
            lista:false
        })
    },[]);


    useEffect(() => {
        const ca = new AbortController();
        let isActive = true;
        if (isActive) getData();
        
        return () => {isActive = false;ca.abort();}
      }, [getData]);

    const values = {
        datos,loading
    }
    return(<Contexto.Provider value={values}>
        {
            children
        }
    </Contexto.Provider>)
}
export const useComisiones = ()=>{
    const {datos,loading} = useContext(Contexto);
    return {datos,loading}
}

export default ComisionesProvider;
