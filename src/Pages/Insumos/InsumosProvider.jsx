import { createContext,useContext,useEffect,useState,useCallback } from "react";
import { APICALLER } from "../../Services/api";

const InsumosContext = createContext()

function InsumosProvider({children}) {

    const [loadings,setLoadings] = useState({
        insumos:true
    })
    const [listas,setListas] = useState({
        insumos:[]
    })

    const getLista = useCallback(async()=>{
        setLoadings({insumos:true})
        let res = await APICALLER.get({table:'insumos'})
        res.response ? setListas({insumos:res.results}) : console.log(res);
        setLoadings({insumos:false})
    },[])

    useEffect(() => {
        const ca = new AbortController();
        let isActive = true;
        if (isActive) {getLista()}
        return () => {isActive = false; ca.abort();};
      }, [getLista]);

    const values ={listas,loadings}

    return <InsumosContext.Provider value={values}>{children}</InsumosContext.Provider>
}

export function useInsumos(){
    const {listas,loadings} = useContext(InsumosContext)
    return {listas,loadings}
}


export default InsumosProvider;