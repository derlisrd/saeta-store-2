import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createContext, useContext, useState, useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import {colores,AvaibleColors} from "../App/Assets/colores.js"
const ContextTheme = createContext();


const TemaProvider = ({children})=>{
  
    const local = JSON.parse(localStorage.getItem("theme"))

    const [themeMode, setThemeMode] = useState(local?.mode || "light");
    const [colors,setColors] = useState(local?.color || "violet");

    const currentColor = colores[colors].primary.main;

    const drawerWidth = 275;
    const colorText = themeMode==='light' ? "#282a2c" : "#fff";
    const PaperBgColor = themeMode==='light' ? "#fff" : "#212b36";
    const DefaultBgColor = themeMode==='light' ? "#f9f9f9" : "#161c24";


    const changeColor = cor =>{
      let json = {...local,color:cor}
      localStorage.setItem("theme",JSON.stringify(json));
      setColors(cor)
    }
    const changeTheme = ()=>{
      if(themeMode==='light') 
        { 
          let json = {...local,mode:"dark"}
          localStorage.setItem("theme",JSON.stringify(json));
          setThemeMode("dark") 
        } 
      else
        { 
          let json = JSON.stringify({...local,mode:"light"})
          localStorage.setItem("theme",json);
          setThemeMode("light")
        }
    }
    

    const theme = createTheme({        
        palette: {
          mode: themeMode==='light' ? "light" : "dark",
          background:{
            paper:PaperBgColor,
            default:DefaultBgColor,
            blueSky: "#50a7fd"
          },
          primary:{
            light:colores[colors].primary.light,
            main:colores[colors].primary.main,
            dark:colores[colors].primary.dark,
            contrastText:colores[colors].primary.contrastText
          },
          secondary: {
            light: colores[colors].secondary.light,
            main: colores[colors].secondary.main,
            dark: colores[colors].secondary.dark,
            contrastText:colores[colors].secondary.contrastText
          },
          /* primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
          },
          secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
          }, */
          /* neutral: {
            main: '#64748B',
            contrastText: '#fff',
          }, */
          colorText:colorText,
        },
        
        typography: {
          fontSize:13,
          fontWeightMedium:"bold",
          fontWeightRegular:"500",
          fontFamily:"Montserrat",
          caption:{
            fontSize:12,
          },
          body1:{
            fontSize:14
          },
          h5:{
            fontWeight:"bold"
          }
          
        },
        components:{
          MuiTableCell:{
            styleOverrides:{
              root:{
                color:colorText,
              }
            }
          },
          MuiTypography:{
            defaultProps:{
              color:colorText,
            }
          },
          MuiLink: {
            defaultProps: {
              
            },
          },
          MuiCard:{
            styleOverrides:{
              root:{
                borderRadius:"12px",
                boxShadow:"7px 6px 8px 1px rgb(0 0 0 / 10%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 3px 3px 3px 0px rgb(0 0 0 / 12%)"
              }
            }
          },
          MuiPaper:{
            styleOverrides:{
              root:{
                transition:'all 0.2s',
                backgroundColor:PaperBgColor,
                backgroundImage:"none"
              },
              
            }
          },
          MuiDrawer:{
            styleOverrides:{
              root:{
                
              }
            }
          },
          MuiButton:{
            styleOverrides:{
              root:{
                borderRadius:"8px"
              }
            }
          },
          MuiOutlinedInput:{
            styleOverrides:{
              root:{
                borderRadius:"8px",
              }
            }
          },
          MuiListItem:{
            styleOverrides:{
              root:{
                fontWeight:"bold",
                fontSize:15,
                borderRadius:"9px",
                color:colores[colors].primary.dark, // icon
                transition:'all 0.02s linear',
                "&.Mui-selected":{
                  backgroundColor: colores[colors].primary.light,
                  "& span":{
                    fontWeight:"bold",
                    color:colores[colors].primary.dark
                  },
                  "&:hover":{
                    backgroundColor:colores[colors].primary.light,
                  }
                },
                "&:hover": {
                  backgroundColor:colores[colors].primary.light,
                  fontWeight:"bold",
                  color:colores[colors].primary.light,
                  "& span":{
                    color:colores[colors].primary.dark
                  }
                },
                
              },
            
            },
          
          },
          MuiCssBaseline:{
            styleOverrides:{
              body: {
                margin:0,
                padding:0,
                boxSizing:"border-box",
                background:DefaultBgColor,
                transition:'all 0.2s',
              },
              "::-webkit-scrollbar": {
                width: "8px"     
              },
              "::-webkit-scrollbar-track": {
                background: colores[colors].primary.light,          
              },
              "::-webkit-scrollbar-thumb": {
                backgroundColor: colores[colors].primary.main,    
                borderRadius:"3px", 
              }
            }
          }
        }
      });

      
      
      const verifica = ()=>{
        const local = JSON.parse(localStorage.getItem("theme"));
        if(local){
          setThemeMode(local.mode);
        }
        else{
          let json = JSON.stringify({mode:"light",color:"violet"})
          localStorage.setItem("theme",json);
        }
      }
      
    
      useEffect(() => {
        verifica();
      }, [])

    return (
        <ContextTheme.Provider value={{themeMode,setThemeMode,changeTheme,drawerWidth,changeColor,AvaibleColors,currentColor}}>
          <ThemeProvider theme={theme}>
          <CssBaseline />
          
              {children}
          
          </ThemeProvider>
        </ContextTheme.Provider>
      );
}

export const useTheme = ()=>{
    const {themeMode, setThemeMode,changeTheme,drawerWidth,changeColor,AvaibleColors,currentColor} = useContext(ContextTheme);
    return {themeMode, setThemeMode,changeTheme,drawerWidth,changeColor,AvaibleColors,currentColor}
}

export default TemaProvider;