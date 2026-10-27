import { IconButton, Box, Icon, Grid, Stack,Tooltip, Typography } from "@mui/material";
import { useTheme } from "../../../Contexts/TemaProvider";
import {useLang} from "../../../Contexts/LangProvider"
const Tema = () => {
  const { changeColor, AvaibleColors, tema,changeFont } = useTheme();
  const {lang} = useLang()
  const fontSizeGeneral = parseInt(tema.fontSize.general);
  const fontSizeMenu = parseInt(tema.fontSize.menu);
  return (
    <Box p={2} boxShadow={4} borderRadius={4} m={1} bgcolor="background.paper">
      <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">{lang.tema_y_colores}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">{lang.seleccionar_color}</Typography>
      </Grid>
        <Grid item xs={12}>
          {AvaibleColors.map((e, i) => (
            <IconButton key={i} onClick={() => {changeColor(e.name);}}>
              <Icon sx={{ color: e.color }}>palette</Icon>
            </IconButton>))}
        </Grid>

        <Grid item xs={12}>
          <span>
            <Stack direction="row">
              <Tooltip title="Restar 1">
                  <IconButton onClick={() => {changeFont("general",fontSizeGeneral-1)}}>
                    <Icon>remove_circle_outline</Icon>
                  </IconButton>
                  </Tooltip>
                  <h6 style={{ fontSize:fontSizeGeneral }}> {lang.tamano_fuente_general} {fontSizeGeneral}</h6>
                  <Tooltip title="Sumar 1">
                  <IconButton onClick={() => {changeFont("general",fontSizeGeneral+1)}}>
                    <Icon>add_circle_outline</Icon>
                    
                  </IconButton>
                  </Tooltip>
                </Stack>
          </span>
        </Grid>

        <Grid item xs={12}>
          <span>
            <Stack direction="row">
              <Tooltip title="Restar 1">
                  <IconButton onClick={() => {changeFont("menu",fontSizeMenu-1)}}>
                    <Icon>remove_circle_outline</Icon>
                  </IconButton>
                  </Tooltip>
                  <h6 style={{ fontSize:fontSizeMenu }}>{lang.tamano_fuente_menu} {fontSizeMenu}</h6>
                  <Tooltip title="Sumar 1">
                  <IconButton onClick={() => {changeFont("menu",fontSizeMenu+1)}}>
                    <Icon>add_circle_outline</Icon>
                  </IconButton>
                  </Tooltip>
                </Stack>
          </span>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Tema;
