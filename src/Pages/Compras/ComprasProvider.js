import React, { createContext,useEffect } from 'react';

const ComprasContext = createContext();



export default function ComprasProvider({children}) {



useEffect(() => {
    let isActive = true;
    const ca = new AbortController();
    if(isActive){}
    return ()=> {isActive = false;ca.abort();}
}, []);    

const value = {}

  return (
    <ComprasContext.Provider value={value} >
        {children}
    </ComprasContext.Provider>
  );
}
