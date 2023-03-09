import { Grid, Box } from "@mui/material";
import ButtonCustom from "../../../../Components/MuiCustom/ButtonCustom";
import { useProductFormEdit } from "./ProductFormEditProvider";
import useGoto from "../../../../Hooks/useGoto";

const ProductButtonHead = () => {
  const { cargas,lang} = useProductFormEdit();
  const go = useGoto()
  return (
    <Box sx={{ position: 'fixed',bottom: 18, zIndex:1000, right: 18, }} bgcolor="background.paper" boxShadow={3} borderRadius={2} p={2}>
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        <Grid
          container
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          alignItems="flex-start"
        >
          <Grid item>
            <ButtonCustom
              variant="contained"
              type="submit"
              disabled={cargas.guardar}
            >
              {lang.actualizar}
            </ButtonCustom>
          </Grid>
          <Grid item>
            <ButtonCustom
              color="error"
              variant="outlined"
              onClick={() => {go.to("productos")}}
              disabled={cargas.guardar}
            >
              {lang.volver}
            </ButtonCustom>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </Box>
  );
};

export default ProductButtonHead;
