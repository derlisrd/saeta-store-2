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
    const colorText = colores[tema.mode].textPrimary;
    const PaperBgColor = colores[tema.mode].bgpaper ;
    const DefaultBgColor = colores[tema.mode].bgdefault ;
    const Transparent = colores[tema.mode].transparent

    const FONT_PRIMARY = 'Montserrat'; // Google Font

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
          mode: tema.mode,
          background:{
            paper:PaperBgColor,
            default:DefaultBgColor,
            transparent:Transparent
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
          text:{
            primary: colores[tema.mode].textPrimary,
            secondary: colores[tema.mode].textSecondary,
          },
          colorText:colorText,
        },
        
        typography: {
          fontSize: parseInt(tema.fontSize.general),
          fontWeightMedium:"bold",
          fontWeightRegular:"500",
          fontFamily:FONT_PRIMARY,
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
          MuiDialog:{
            styleOverrides:{
              root:{
                
              },
              paper:{
                borderRadius:'16px'
              }
            }
          },
          MuiDialogActions:{
            styleOverrides:{
              root:{
                padding:'16px'
              }
            }
          },
          MuiTableCell:{
            styleOverrides:{
              root:{
                color:colorText,
              }
            }
          },
          MuiBackdrop: {
            styleOverrides: {
              root: {
                
              },
              invisible: {
                background: 'transparent',
              },
            },
          },
          MuiTypography:{
            defaultProps:{
              color:colorText,
            }
          },
          
          MuiCard:{
            styleOverrides:{
              root:{
                borderRadius:"16px",
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
          MuiButton:{
            styleOverrides:{
              root:{
                borderRadius:"8px",
                '&:hover':{
                  boxShadow:`#dbdbdb29 1px 9px 16px 0px`
                }
              }
            }
          },
          MuiOutlinedInput:{
            styleOverrides:{
              root:{
                borderRadius:"8px",
                borderWidth:0
              }
            }
          },
          MuiInputBase:{
            styleOverrides:{
              root:{
                border:'none'
              }
            }
          },

          MuiListItemIcon:{
            styleOverrides:{
              root:{
                minWidth:'35px',
                "& span":{
                  //fontSize:tema.fontSize.menu
                },
            },
          },
        },
        MuiListItemText:{
          styleOverrides:{
            root:{
              "& span":{
                fontSize:tema.fontSize.menu,
              },
          },
        },
        },
        MuiListItemButton:{
          styleOverrides:{
            root:{
              "&:hover": {
                borderRadius:"0 18px 18px 0",
              },
            }
          }
        },
        MuiListItem:{
            styleOverrides:{
              root:{
                borderRadius:"0 18px 18px 0",
                transition:'all 0.02s linear',
                "&.Mui-selected":{
                  backgroundColor: tema.mode==="light"? colores[tema.colors].primary.light : colores[tema.colors].primary.main,
                  "& span":{
                    /* fontWeight:"bold", */
                    color:tema.mode==="light"? colores[tema.colors].primary.main : colorText,
                  },
                  borderLeft:`4px solid ${colores[tema.colors].primary.main}`,
                },
                "&:hover": {
                  backgroundColor:colores[tema.colors].primary.light,
                  "& span":{
                    color:tema.mode==="light"? colores[tema.colors].primary.main : colorText,
                    /* fontWeight:"bold", */
                  },
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
              ".swal-button--cancel":{backgroundColor:colores[tema.colors].secondary.main+"!important"},
              ".swal-text":{color: colorText+"!important" },
              ".swal-button:not([disabled]):hover":{backgroundColor:colores[tema.colors].secondary.dark+"!important",color:colores[tema.colors].secondary.contrastText},
              ".swal-modal":{backgroundColor: PaperBgColor+" !important",border:'1px solid #666'},
              "::-webkit-scrollbar": {width: 0}
            }
          }
        }
      });

      /* "::-webkit-scrollbar": {width: "5px"},
              "::-webkit-scrollbar-track": {background: "silver"},
              "::-webkit-scrollbar-thumb": {backgroundColor: PaperBgColor,borderRadius:"3px"},
              "::-webkit-scrollbar-thumb:hover": {backgroundColor: "rgba(99, 115, 129, 0.48)"} */

      
      
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