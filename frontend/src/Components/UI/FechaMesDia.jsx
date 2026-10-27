import { Stack, Typography } from "@mui/material";
import { funciones } from "../../Functions";

function FechaMesDia({fecha}) {

  const {month,day} = funciones.dateToShortFormat(fecha)
  

  return (
    <Stack
      sx={{ bgcolor: "background.default", borderRadius: 3, p: 1, maxWidth:'60px',mr:1 }}
      alignItems="center"
      direction="column"
    >
      <Typography variant="button">{month}</Typography>
      <Typography variant="body1">{day}</Typography>
    </Stack>
  );
}

export default FechaMesDia;
