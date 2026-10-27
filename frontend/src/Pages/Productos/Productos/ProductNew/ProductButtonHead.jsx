import { Box, Stack } from "@mui/material";
import  ButtomCustom  from "../../../../Components/MuiCustom/ButtonCustom";
import { useProductForm } from "./ProductFormProvider";
import useGoto from "../../../../Hooks/useGoto";

const ProductButtonHead = () => {
  const { cargas,stock,formulario,lang} = useProductForm();
  const go = useGoto();
  let GUARDAR_ACTIVO = (formulario.tipo_producto==="1" && stock.length===0) || cargas.guardar
  return (
    <Box sx={{ position: 'fixed',bottom: 18, zIndex:1000, right: 18, }} bgcolor="background.paper" boxShadow={3} borderRadius={2} p={2}>
    <Stack direction="row" spacing={1}>
    <ButtomCustom
              type="submit"
              variant="outlined"
              disabled={GUARDAR_ACTIVO}
            >
              {lang.guardar}
            </ButtomCustom>

            <ButtomCustom
              color="error"
              onClick={() => {go.to("productos")}}
              variant="outlined"
              disabled={cargas.guardar}
            >
              {lang.cerrar}
            </ButtomCustom>
    </Stack>
    </Box>
  );
};

export default ProductButtonHead;
