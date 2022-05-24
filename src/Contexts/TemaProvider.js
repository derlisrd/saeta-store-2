import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createContext, useContext, useState, useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
const ContextTheme = createContext();


const TemaProvider = ({children})=>{
    const [themeMode, setThemeMode] = useState("light");
    const drawerWidth = 275;
    const colorText = themeMode==='light' ? "#282a2c" : "#fff";
    const PaperBgColor = themeMode==='light' ? "#fff" : "#212b36";
    const DefaultBgColor = themeMode==='light' ? "#f9f9f9" : "#161c24";
    const LinkSelector = themeMode==='light' ? "#b9ddff" : "#0066cc";
    const FontSizeMenu = 15;
    const theme = createTheme({
        
        palette: {
          mode: themeMode==='light' ? "light" : "dark",
          background:{
            paper:PaperBgColor,
            default:DefaultBgColor,
            blueSky: "#50a7fd"
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
          neutral: {
            main: '#64748B',
            contrastText: '#fff',
          },
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
                fontSize:FontSizeMenu,
                borderRadius:"9px",
                transition:'all 0.02s linear',
                "&.Mui-selected":{
                  backgroundColor: LinkSelector,
                  "& span":{
                    fontWeight:"bold"
                  }
                },
                "&:hover": {
                  backgroundColor:LinkSelector,
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
                boxSizing:"border-box",
                background:DefaultBgColor,
                transition:'all 0.2s',
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