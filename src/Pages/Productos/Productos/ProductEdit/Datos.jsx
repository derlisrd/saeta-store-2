import React from 'react'
import {FormControl, Grid, Icon, InputAdornment, TextField,InputLabel,Select,MenuItem, FormLabel, FormControlLabel, Radio} from "@mui/material";
import { useProductFormEdit } from './ProductFormEditProvider';

const Datos = () => {
  const {listas, formulario,change,inputCodigo,cargas,snack,inputNombre,verificarProducto,lang} = useProductFormEdit();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          required
          autoFocus
          error={snack.id_code === "codigo_producto"}
          disabled={cargas.guardar}
          inputRef={inputCodigo}
          onChange={change}
          onBlur={verificarProducto}
          value={formulario.codigo_producto}
          label="Código"
          autoComplete="off"
          name="codigo_producto"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon color="primary">qr_code</Icon>
              </InputAdornment>
            ),
          }}
          fullWidth
          helperText="Código de único del producto"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <FormLabel component="legend">{lang.tipo}:</FormLabel>
        <FormControlLabel
          value="1"
          control={
            <Radio
              name="tipo_producto"
              checked={formulario.tipo_producto === "1"}
              onChange={change}
              color="primary"
            />
          }
          label="Artículo"
          labelPlacement="end"
        />
        <FormControlLabel
          value="2"
          control={
            <Radio
              name="tipo_producto"
              checked={formulario.tipo_producto === "2"}
              onChange={change}
              color="primary"
            />
          }
          label="Servicio"
          labelPlacement="end"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <TextField
          required error={snack.id === "nombre_producto"} disabled={cargas.guardar} onChange={change}
          inputRef={inputNombre} label="Nombre" autoComplete="off"
          name="nombre_producto" value={formulario.nombre_producto}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon color="action">inventory_2</Icon>
              </InputAdornment>
            ),
          }}
          fullWidth variant="outlined" helperText="nombre del producto"
        />
      </Grid>
      <Grid item xs={12}sm={12} md={8}>
        <TextField 
          disabled={cargas.guardar}
          onChange={change}
          autoComplete="off"
          name="descripcion_producto"
          value={formulario.descripcion_producto} label="Descripción detallada" fullWidth />
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel variant="outlined">Impuesto</InputLabel>
          <Select
            required
            name="id_impuesto_producto"
            value={formulario.id_impuesto_producto}
            onChange={change}
            variant="outlined"
          >
            {listas.impuestos.map((d) => (
              <MenuItem key={d.id_impuesto} value={d.id_impuesto}>
                {d.nombre_impuesto}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      
      <Grid item xs={12} sm={12} md={4}>
        <FormControl fullWidth>
          <InputLabel variant="outlined">Seleccionar proveedor</InputLabel>
          <Select
            name="id_proveedor_producto"
            value={formulario.id_proveedor_producto}
            onChange={change}
            variant="outlined"
            required
          >
            {listas.proveedores.map((d) => (
              <MenuItem key={d.id_proveedor} value={d.id_proveedor}>
                {d.nombre_proveedor}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <FormControl fullWidth>
          <InputLabel variant="outlined">Selecccionar categoría</InputLabel>
          <Select
            required
            name="id_categoria_producto"
            value={formulario.id_categoria_producto}
            onChange={change}
            variant="outlined"
          >
            {listas.categorias.map((d) => (
              <MenuItem key={d.id_categoria} value={d.id_categoria}>
                {d.nombre_categoria}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <FormControl fullWidth>
          <InputLabel variant="outlined">Marca</InputLabel>
          <Select
            required
            name="id_marca_producto"
            value={formulario.id_marca_producto}
            onChange={change}
            variant="outlined"
            fullWidth
          >
            {listas.marcas.map((d) => (
              <MenuItem key={d.id_marca} value={d.id_marca}>
                {d.nombre_marca}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <FormControl fullWidth>
          <InputLabel variant="outlined">Unidad de medida</InputLabel>
          <Select
            name="id_unidad_medida_producto"
            value={formulario.id_unidad_medida_producto}
            onChange={change}
            variant="outlined"
            required
          >
            {listas.medidas.map((d) => (
              <MenuItem key={d.id_unidad_medida} value={d.id_unidad_medida}>
                {d.descripcion_medida}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

    </Grid>
  );
}

export default Datos
