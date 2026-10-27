import { Grid, Icon, InputAdornment, TextField,Checkbox,FormControlLabel, FormControl, InputLabel, Select, MenuItem, Tooltip, Switch } from "@mui/material";
import React from "react";
import NumberFormatCustom from "../../../../Components/thirty/NumberFormatCustom";
import { useProductFormEdit } from "./ProductFormEditProvider";

const Precios = () => {
  const {change,formulario,changeCheck} = useProductFormEdit();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Tooltip placement="top" title="Preguntar precio a la hora de la venta">
            <FormControlLabel
              control={
                <Switch
                  checked={formulario.preguntar_precio === "1"}
                  onChange={changeCheck}
                  name="preguntar_precio"
                  color="primary"
                />
              }
              label="Preguntar precio"
            />
            </Tooltip>
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
            <TextField
              onChange={change}
              fullWidth
              label="Costo"
             
              autoComplete="off"
              name="costo_producto"
              value={formulario.costo_producto}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon style={{ color: "#ffa501" }}>attach_money</Icon>
                  </InputAdornment>
                ),
                inputProps: { min: 0 },
                inputComponent: NumberFormatCustom,
              }}
              
              error={false}
              helperText="Costo del producto"
            />
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <TextField
              fullWidth
              onChange={change}
              label="Precio"
              autoComplete="off"
              name="precio_producto"
              value={formulario.precio_producto}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon color="primary">point_of_sale</Icon>
                  </InputAdornment>
                ),
                inputProps: { min: 0 },
                inputComponent: NumberFormatCustom,
              }}
              variant="outlined"
              error={false}
              helperText="Precio del producto"
            />
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <TextField
              fullWidth
              onChange={change}
              label="Precio Mayorista"
              autoComplete="off"
              name="preciom_producto"
              value={formulario.preciom_producto}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon color="primary">point_of_sale</Icon>
                  </InputAdornment>
                ),
                inputProps: { min: 0 },
                inputComponent: NumberFormatCustom,
              }}
              variant="outlined"
              error={false}
              helperText="Precio para mayoristas"
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formulario.notificar_producto === "1"}
                  onChange={changeCheck}
                  name="notificar_producto"
                  color="primary"
                />
              }
              label="Notificar stock mínimo"
            />
          </Grid>

          <Grid item xs={12} sm={8} md={8}>
            <TextField
              fullWidth
              onChange={change}
              label="Stock mínimo"
              disabled={
                formulario.tipo_producto === "2" ||
                formulario.notificar_producto === "0"
              }
              autoComplete="off"
              name="minimo_producto"
              value={formulario.minimo_producto}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon color="primary">inventory_2</Icon>
                  </InputAdornment>
                ),
                inputProps: { min: 0 },
                inputComponent: NumberFormatCustom,
              }}
              variant="outlined"
              error={false}
              helperText="Cantidad mínima de existencia"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
          <TextField
              fullWidth
              onChange={change}
              label="Comisión"
              autoComplete="off"
              name="porcentaje_comision"
              value={formulario.porcentaje_comision}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon color="secondary">money</Icon>
                  </InputAdornment>
                ),
                inputProps: { min: 0, max: 100},
                inputComponent: NumberFormatCustom,
              }}
              variant="outlined"
              helperText="Si el producto tiene comisión"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
              <InputLabel variant="outlined">Estado de stock</InputLabel>
              <Select
                required
                name="disponible_producto"
                value={formulario.disponible_producto}
                onChange={change}
                variant="outlined"
              >
                <MenuItem value={1}>Disponible</MenuItem>
                <MenuItem value={0}>No Disponible</MenuItem>
                </Select>
            </FormControl>
          </Grid>
    </Grid>
  );
};

export default Precios;
