import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createContext, useContext, useState, useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import {colores,AvaibleColors} from "../App/Assets/colores.js"
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
    const colorText = tema.mode==='light' ? "#282a2c" : "#fff";
    const PaperBgColor = tema.mode==='light' ? "#fff" : "#212b36";
    const DefaultBgColor = tema.mode==='light' ? "#f9f9f9" : "#161c24";


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
        palette: {
          mode: tema.mode==='light' ? "light" : "dark",
          background:{
            paper:PaperBgColor,
            default:DefaultBgColor,
            blueSky: "#50a7fd"
          },
          primary:{
            light:colores[tema.colors].primary.light,
            main:colores[tema.colors].primary.main,
            dark:colores[tema.colors].primary.dark,
            contrastText:colores[tema.colors].primary.contrastText
          },
          secondary: {
            light: colores[tema.colors].secondary.light,
            main: colores[tema.colors].secondary.main,
            dark: colores[tema.colors].secondary.dark,
            contrastText:colores[tema.colors].secondary.contrastText
          },

          colorText:colorText,
        },
        
        typography: {
          fontSize: parseInt(tema.fontSize.general),
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


          MuiListItemIcon:{
            styleOverrides:{
              root:{
                
            },
          },
        },
        MuiListItemText:{
          styleOverrides:{
            root:{
              "& span":{
                fontSize:tema.fontSize.menu
              },
          },
        },
        }
        ,
          MuiListItem:{
            styleOverrides:{
              root:{
                borderRadius:"10px",
                transition:'all 0.02s linear',
                "&.Mui-selected":{
                  backgroundColor: colores[tema.colors].primary.light,
                },
                "&:hover": {
                  backgroundColor:colores[tema.colors].primary.light,
                  "& span":{
                    color:colores[tema.colors].primary.dark
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
              ".swal-title":{color: colorText+"!important" },
              ".swal-icon--success__hide-corners,.swal-icon--success:after, .swal-icon--success:before":{background:"none !important"},
              ".swal-button":{backgroundColor: colores[tema.colors].primary.main,color:colores[tema.colors].primary.contrastText},
              ".swal-button--cancel":{backgroundColor:colores[tema.colors].secondary.main+"!important",color:colores[tema.colors].secondary.contrastText},
              ".swal-text":{color: colorText+"!important" },
              ".swal-modal":{backgroundColor: PaperBgColor+"!important",},
              "::-webkit-scrollbar": {width: "9px"},
              "::-webkit-scrollbar-track": {background: "none"},
              "::-webkit-scrollbar-thumb": {backgroundColor: PaperBgColor,borderRadius:"3px"},
              "::-webkit-scrollbar-thumb:hover": {backgroundColor: "rgba(99, 115, 129, 0.48)"}
            }
          }
        }
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