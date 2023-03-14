import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createContext, useContext, useState, useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import {colores,AvaibleColors} from "../App/Assets/colores.js"
import { customTheme } from '../App/Assets/customTheme.js';

const ContextTheme = createContext();


const TemaProvider = ({children})=>{
  
    const localStorageTema = JSON.parse(localStorage.getItem("tema"))
    const [tema,setTema] = useState({
      defaultColor: localStorageTema?.defaultColor || "violet", //referencia a key del objeto
      mode:localStorageTema?.mode || "light",
      colors:localStorageTema?.color || "violet",
      currentColor: localStorageTema?.currentColor || colores["violet"].primary.main, //hace referencia al oclor hexadecimal
      fontSize: {
        general: localStorageTema?.fontSize.general || 14,
        menu: localStorageTema?.fontSize.menu || 15
      }
    })

    const drawerWidth = 275;
    const colorText = colores[tema.mode].textPrimary;
    const PaperBgColor = colores[tema.mode].bgpaper ;
    const DefaultBgColor = colores[tema.mode].bgdefault ;
    const Transparent = colores[tema.mode].transparent
    const FONT_PRIMARY = 'Montserrat'; // Google Font

    const custom = customTheme({tema,colores,PaperBgColor,DefaultBgColor,Transparent,colorText,FONT_PRIMARY})


    const changeColor = cor =>{
      let json = {...tema,defaultColor:cor,currentColor: colores[cor].primary.main,colors:cor}
      localStorage.setItem("tema",JSON.stringify(json));
      setTema(json);
    }

    const changeFont = (font,size)=>{
      let json = {...tema}
      json.fontSize[font] = parseInt(size);
      localStorage.setItem("tema",JSON.stringify(json));
      setTema(json);
    }

    

    const changeTheme = ()=>{
      let newMode = tema.mode==="light" ? "dark" : "light";
      let json = {...tema,mode:newMode}
      localStorage.setItem("tema",JSON.stringify(json));
      setTema(json)
    }
    

    const theme = createTheme({        
        palette: custom.paleta,
        shadows: custom.shadows,
        typography: custom.typography,
        components: custom.componentes
      });
      
      
      const verifica = ()=>{
        const local = JSON.parse(localStorage.getItem("tema"));
        if(local){
          setTema(local)
        }
        else{
          let json = JSON.stringify({
            defaultColor: "violet",
            mode:"light",
            colors:"violet",
            currentColor: colores["violet"].primary.main,
            fontSize: {
              general: 14,
              menu:15
            }
          })
          localStorage.setItem("tema",json);
        }
      }
      
    
      useEffect(() => {
        verifica();
      }, [])

    return (
        <ContextTheme.Provider value={{changeTheme,drawerWidth,changeColor,AvaibleColors,changeFont,tema}}>
          <ThemeProvider theme={theme}>
          <CssBaseline />
              {children}
          </ThemeProvider>
        </ContextTheme.Provider>
      );
}

export const useTheme = ()=>{
    const {changeTheme,drawerWidth,changeColor,AvaibleColors,changeFont,tema} = useContext(ContextTheme);
    return {changeTheme,drawerWidth,changeColor,AvaibleColors,changeFont,tema}
}

export default TemaProvider;