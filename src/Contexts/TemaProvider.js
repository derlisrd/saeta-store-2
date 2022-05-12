import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createContext, useContext, useState, useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
const ContextTheme = createContext();


const TemaProvider = ({children})=>{
    const [themeMode, setThemeMode] = useState("light");
    const drawerWidth = 275;
    const theme = createTheme({

        palette: {
          mode: themeMode==='light' ? "light" : "dark",
          background:{
            paper:themeMode==='light' ? "#fff" : "#171721",
            default:themeMode==='light' ? "#f9f9f9" : "#101013",
          }, 
          neutral: {
            main: '#64748B',
            contrastText: '#fff',
          },
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
          
          MuiTypography:{
            
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
              },
              
            }
          },
          MuiDrawer:{
            styleOverrides:{
              root:{
                
              }
            }
          },
          MuiListItem:{
            styleOverrides:{
              root:{
                fontWeight:"bold",
                borderRadius:"9px",
                transition:'all 0.01s linear',
                "&.Mui-selected":{
                  backgroundColor: themeMode==='light' ? "#b9ddff" : "#0066cc",
                  "& span":{
                    fontWeight:"bold"
                  }
                },
                "&:hover": {
                  backgroundColor:themeMode==='light' ? "#b9ddff" : "#0066cc",
                  fontWeight:"bold",
                },
                
              },
            
            },
          
          },
          MuiCssBaseline:{
            styleOverrides:{
              body: {
                margin:0,
                padding:0,
                boxSizing:"border-box"
              },
              
            }
          }
        }
      });
      const changeTheme = ()=>{
        if(themeMode==='light') 
          { 
            localStorage.setItem("themeMode","dark");
            setThemeMode("dark") 
          } 
        else
          { 
            localStorage.setItem("themeMode","light");
            setThemeMode("light")
          }
      }
      
      
      const verifica = ()=>{
        const themeModeLocal = localStorage.getItem("themeMode");
        if(themeModeLocal){
          setThemeMode(themeModeLocal);
        }
        else{
          localStorage.setItem("themeMode","light");
        }
      }
      
    
      useEffect(() => {
        verifica();
      }, [])

    return (
        <ContextTheme.Provider value={{themeMode, setThemeMode,changeTheme,drawerWidth}}>
          <ThemeProvider theme={theme}>
          <CssBaseline />
          
              {children}
          
          </ThemeProvider>
        </ContextTheme.Provider>
      );
}

export const useTheme = ()=>{
    const {themeMode, setThemeMode,changeTheme,drawerWidth} = useContext(ContextTheme);
    return {themeMode, setThemeMode,changeTheme,drawerWidth}
}

export default TemaProvider;