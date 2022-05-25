import { createContext,useState,useContext } from "react"
const MenuContext = createContext();

export default function MenuProvider({children}){

  const [activeMenu,setActiveMenu] = useState(false);
  const [activeBigMenu,setActiveBigMenu] = useState(true)
  const [sideMenu,setSideMenu] = useState("left");
  
  const changeStateBigMenu = (value)=>{
    setActiveBigMenu(value);
  }
  const changeStateMenu = (value)=>{
    setActiveMenu(value);
  }
  return(
    <MenuContext.Provider value={{ changeStateMenu,activeMenu,sideMenu,setSideMenu,activeBigMenu,changeStateBigMenu }}>
      {children}
    </MenuContext.Provider>
  )
}

export function useMenu(){
  const {changeStateMenu,activeMenu,sideMenu,setSideMenu,activeBigMenu,changeStateBigMenu} = useContext(MenuContext);
  return {changeStateMenu,activeMenu,sideMenu,setSideMenu,activeBigMenu,changeStateBigMenu}
}