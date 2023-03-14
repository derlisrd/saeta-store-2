import { alpha } from "@mui/material";
import { grey } from "@mui/material/colors";



export const customTheme = ({
  tema,
  colores,
  PaperBgColor,
  DefaultBgColor,
  Transparent,
  colorText,
  FONT_PRIMARY,
}) => {

  const TEMA_MODE_COLOR = tema.mode==='light' ? grey[400] : '#000' ; 
  //const DARK_MODE = '#000000';

  const transparent1 = alpha(TEMA_MODE_COLOR, 0.2);
  const transparent2 = alpha(TEMA_MODE_COLOR, 0.14);
  const transparent3 = alpha(TEMA_MODE_COLOR, 0.12);


  return {

    shadows: [
      'none',
      `0px 2px 1px -1px ${transparent1},0px 1px 1px 0px ${transparent2},0px 1px 3px 0px ${transparent3}`,
      `0px 3px 1px -2px ${transparent1},0px 2px 2px 0px ${transparent2},0px 1px 5px 0px ${transparent3}`,
      `0px 3px 3px -2px ${transparent1},0px 3px 4px 0px ${transparent2},0px 1px 8px 0px ${transparent3}`,
      `0px 2px 4px -1px ${transparent1},0px 4px 5px 0px ${transparent2},0px 1px 10px 0px ${transparent3}`,
      `0px 3px 5px -1px ${transparent1},0px 5px 8px 0px ${transparent2},0px 1px 14px 0px ${transparent3}`,
      `0px 3px 5px -1px ${transparent1},0px 6px 10px 0px ${transparent2},0px 1px 18px 0px ${transparent3}`,
      `0px 4px 5px -2px ${transparent1},0px 7px 10px 1px ${transparent2},0px 2px 16px 1px ${transparent3}`,
      `0px 5px 5px -3px ${transparent1},0px 8px 10px 1px ${transparent2},0px 3px 14px 2px ${transparent3}`,
      `0px 5px 6px -3px ${transparent1},0px 9px 12px 1px ${transparent2},0px 3px 16px 2px ${transparent3}`,
      `0px 6px 6px -3px ${transparent1},0px 10px 14px 1px ${transparent2},0px 4px 18px 3px ${transparent3}`,
      `0px 6px 7px -4px ${transparent1},0px 11px 15px 1px ${transparent2},0px 4px 20px 3px ${transparent3}`,
      `0px 7px 8px -4px ${transparent1},0px 12px 17px 2px ${transparent2},0px 5px 22px 4px ${transparent3}`,
      `0px 7px 8px -4px ${transparent1},0px 13px 19px 2px ${transparent2},0px 5px 24px 4px ${transparent3}`,
      `0px 7px 9px -4px ${transparent1},0px 14px 21px 2px ${transparent2},0px 5px 26px 4px ${transparent3}`,
      `0px 8px 9px -5px ${transparent1},0px 15px 22px 2px ${transparent2},0px 6px 28px 5px ${transparent3}`,
      `0px 8px 10px -5px ${transparent1},0px 16px 24px 2px ${transparent2},0px 6px 30px 5px ${transparent3}`,
      `0px 8px 11px -5px ${transparent1},0px 17px 26px 2px ${transparent2},0px 6px 32px 5px ${transparent3}`,
      `0px 9px 11px -5px ${transparent1},0px 18px 28px 2px ${transparent2},0px 7px 34px 6px ${transparent3}`,
      `0px 9px 12px -6px ${transparent1},0px 19px 29px 2px ${transparent2},0px 7px 36px 6px ${transparent3}`,
      `0px 10px 13px -6px ${transparent1},0px 20px 31px 3px ${transparent2},0px 8px 38px 7px ${transparent3}`,
      `0px 10px 13px -6px ${transparent1},0px 21px 33px 3px ${transparent2},0px 8px 40px 7px ${transparent3}`,
      `0px 10px 14px -6px ${transparent1},0px 22px 35px 3px ${transparent2},0px 8px 42px 7px ${transparent3}`,
      `0px 11px 14px -7px ${transparent1},0px 23px 36px 3px ${transparent2},0px 9px 44px 8px ${transparent3}`,
      `0px 11px 15px -7px ${transparent1},0px 24px 38px 3px ${transparent2},0px 9px 46px 8px ${transparent3}`
    ],


    typography: {
      fontSize: parseInt(tema.fontSize.general),
      fontWeightMedium: "bold",
      fontWeightRegular: "500",
      fontFamily: FONT_PRIMARY,
      caption: {
        fontSize: 12,
      },
      body1: {
        fontSize: 14,
      },
      h5: {
        fontWeight: "bold",
      },
    },



    paleta: {
      mode: tema.mode,
      background: {
        paper: PaperBgColor,
        default: DefaultBgColor,
        transparent: Transparent,
      },
      primary: {
        light: colores[tema.colors].primary.light,
        main: colores[tema.colors].primary.main,
        dark: colores[tema.colors].primary.dark,
        contrastText: colores[tema.colors].primary.contrastText,
      },
      secondary: {
        light: colores[tema.colors].secondary.light,
        main: colores[tema.colors].secondary.main,
        dark: colores[tema.colors].secondary.dark,
        contrastText: colores[tema.colors].secondary.contrastText,
      },
      text: {
        primary: colores[tema.mode].textPrimary,
        secondary: colores[tema.mode].textSecondary,
      },
      colorText: colorText,
    },


    

    componentes: {
      MuiDialog: {
        styleOverrides: {
          root: {},
          paper: {
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            padding: "16px",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            color: colorText,
          },
        },
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {},
          invisible: {
            background: "transparent",
          },
        },
      },
      MuiTypography: {
        defaultProps: {
          color: colorText,
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "16px",
            boxShadow:
              "7px 6px 8px 1px rgb(0 0 0 / 10%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 3px 3px 3px 0px rgb(0 0 0 / 12%)",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            transition: "all 0.2s",
            backgroundColor: PaperBgColor,
            backgroundImage: "none",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            "&:hover": {
              boxShadow: `#dbdbdb29 1px 9px 16px 0px`,
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            borderWidth: 0,
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            border: "none",
          },
        },
      },

      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: "35px",
            "& span": {
              //fontSize:tema.fontSize.menu
            },
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          root: {
            "& span": {
              fontSize: tema.fontSize.menu,
            },
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            "&:hover": {
              borderRadius: "0 18px 18px 0",
            },
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            borderRadius: "0 18px 18px 0",
            transition: "all 0.02s linear",
            "&.Mui-selected": {
              backgroundColor:
                tema.mode === "light"
                  ? colores[tema.colors].primary.light
                  : colores[tema.colors].primary.main,
              "& span": {
                /* fontWeight:"bold", */
                color:
                  tema.mode === "light"
                    ? colores[tema.colors].primary.main
                    : colorText,
              },
              borderLeft: `4px solid ${colores[tema.colors].primary.main}`,
            },
            "&:hover": {
              backgroundColor: colores[tema.colors].primary.light,
              "& span": {
                color:
                  tema.mode === "light"
                    ? colores[tema.colors].primary.main
                    : colorText,
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


    },
  };
};
