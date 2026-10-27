import { createContext,useState,useContext } from "react";

const MenuContext = createContext()

function MenuProvider({children}) {
    const [isOpenMenu,setIsOpenMenu] = useState(true)
    const [mobileOpen, setMobileOpen] = useState(false);

    const values = { isOpenMenu,setIsOpenMenu,mobileOpen, setMobileOpen }
    return <MenuContext.Provider value={values}>{children}</MenuContext.Provider>;
}

export function useMenu(){
    const {isOpenMenu,setIsOpenMenu,mobileOpen, setMobileOpen} = useContext(MenuContext)
    return {isOpenMenu,setIsOpenMenu,mobileOpen, setMobileOpen}
}

export default MenuProvider;