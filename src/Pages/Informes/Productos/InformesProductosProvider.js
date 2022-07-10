import React, { createContext, useContext, useState,useCallback,useEffect } from 'react';
import { useLang } from '../../../Contexts/LangProvider';


const Contexto = createContext();

function InformesProductosProvider({children}) {
    
    const {lang} = useLang()

    const initialLoadings = {
        general:true,
        lista:true
    }

    const initialListas = {
        productos_vendidos: []
    }

    const [loadings,setLoadings] = useState(initialLoadings)
    const [listas,setListas] = useState(initialListas)
    
    const values = {
        loadings,lang,listas
    }
    
    return ( <Contexto.Provider value={values}>
        {children}
    </Contexto.Provider> );
}


export function useInformesProductos(){

    const {loadings,lang,listas} = useContext(Contexto)
    return {loadings,lang,listas}
}

export default InformesProductosProvider;