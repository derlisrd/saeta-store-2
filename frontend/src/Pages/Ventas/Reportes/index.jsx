import {
  Avatar,
  Box,
  Container,
  Grid,
  Icon,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { APIURL } from "../../../App/Config/config";
import ButtonCustom from "../../../Components/MuiCustom/ButtonCustom";
import { DatePickerCustom } from "../../../Components/MuiCustom/DatePickerCustom";
import { useLang } from "../../../Contexts/LangProvider";
import { funciones } from "../../../Functions";
//import { useLogin } from '../../../Contexts/LoginProvider'

const Reportes = () => {
  const { lang } = useLang();
  const today = new Date();
  const initial = funciones.getDateYMD(today)
  const [desde, setDesde] = useState(initial);
  const [hasta, setHasta] = useState(initial);
  const [disableButton, setDisableButton] = useState(true);
  const [url, setUrl] = useState("");
  const changeDatadesde = (e) => setDesde(e);
  const changeDatahasta = (e) => setHasta(e);
  
  const filtrar = ()=>{
    setDisableButton(false)
    let desdeFiltered = funciones.getDateYMD(desde);
    let hastaFiltered = funciones.getDateYMD(hasta) ;
    setUrl(APIURL+`generateReport/${desdeFiltered}/${hastaFiltered}`)
  }

  return (
    <Container>
      <Box padding={1} margin={1}>
        <Stack direction="row" spacing={2}>
          <Box>
            <Avatar variant="rounded" sx={{ bgcolor: "primary.main", p: 3 }}>
              <Icon fontSize="large">description</Icon>
            </Avatar>
          </Box>
          <Box>
            <Typography variant="h6">Reportes</Typography>
            <Typography variant="caption">
              Generar reportes de ventas
            </Typography>
          </Box>
        </Stack>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <DatePickerCustom
            fullWidth
            label={lang.desde}
            value={desde}
            defaultValue={desde}
            onChange={changeDatadesde}
            name="desdeFecha"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DatePickerCustom
            fullWidth
            label={lang.hasta}
            value={hasta}
            defaultValue={hasta}
            onChange={changeDatahasta}
            name="hastaFecha"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ButtonCustom onClick={filtrar}>Filtrar</ButtonCustom>
        </Grid>
        <Grid item xs={12}>
          <ButtonCustom
            component={Link}
            href={url}
            startIcon={<Icon>description</Icon>}
            onClick={() => {setDisableButton(true)}}
            disabled={disableButton}
          >
            Generar excel
          </ButtonCustom>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Reportes;
