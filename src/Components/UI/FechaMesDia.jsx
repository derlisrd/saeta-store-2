import { Stack, Typography } from "@mui/material";

function FechaMesDia() {
  return (
    <Stack
      sx={{ bgcolor: "background.default", borderRadius: 3, p: 1, maxWidth:'60px' }}
      alignItems="center"
      direction="column"
    >
      <Typography variant="subtitle2">MAR</Typography>
      <Typography variant="button">10</Typography>
    </Stack>
  );
}

export default FechaMesDia;
