import {createContext} from 'react'

const Contexto = createContext()

const ListasComprasProvider = ({children}) => {

  const values = {}
  return <Contexto.Provider value={values}>{children}</Contexto.Provider>
}

export default ListasComprasProvider
