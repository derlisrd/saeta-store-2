import React from 'react'
import {FormControl, Grid, Icon, InputAdornment, TextField,InputLabel,Select,MenuItem, Radio, FormControlLabel, FormLabel, Button, List, ListItemButton, ListItemText, ListItemIcon, Typography, CircularProgress} from "@mui/material";
import { useProductForm } from './ProductFormProvider';

const Datos = () => {
  const {listas, dialogs,setDialogs, formulario,change,inputCodigo,verificarProducto,cargas,snack,inputNombre,generateCode,lang} = useProductForm();
  
  const filterCategory = listas.categorias.filter(e=> e.tipo_categoria === formulario.tipo_producto);

  return (
    <Grid container spacing={2} alignItems='center' >
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          required
          autoFocus
          error={snack.id==="codigo_producto"}
          disabled={cargas.guardar}
          inputRef={inputCodigo}
          onChange={change}
          value={formulario.codigo_producto}
          onBlur={verificarProducto}
          label="Código"
          autoComplete="off"
          name="codigo_producto"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon color="primary">qr_code</Icon>
              </InputAdornment>
            ),
            endAdornment:(
              cargas.verificarCodigo && <CircularProgress size={24} />
            )
          }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <Button variant="outlined" size="large" onClick={generateCode}>{lang.generar_codigo}</Button>
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <FormLabel component="legend">{lang.tipo}:</FormLabel>
        <FormControlLabel
          value="1"
          control={
            <Radio name="tipo_producto" checked={formulario.tipo_producto === "1"}  onChange={change}  color="primary"  />
          }
          label="Artículo"
          labelPlacement="end"
        />
        <FormControlLabel
          value="2"
          control={
            <Radio name="tipo_producto" checked={formulario.tipo_producto === "2"} onChange={change} color="primary" />
          }
          label="Servicio"
          labelPlacement="end"
        />
      </Grid>
      <Grid item xs={12} >
            <Typography variant="button">INFORMACION DE PRODUCTO</Typography>
          </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <TextField          required          error={snack.id==="nombre_producto"}
          disabled={cargas.guardar}          onChange={change}          inputRef={inputNombre}
          label="Nombre"autoComplete="off" name="nombre_producto" value={formulario.nombre_producto}          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon color="action">inventory_2</Icon>
              </InputAdornment>
            ),
          }}
          fullWidth    
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <TextField  onChange={change} autoComplete="off" name="descripcion_producto" value={formulario.descripcion_producto} label="Descripción detallada" fullWidth />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
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
                <List>
                  <ListItemButton onClick={()=> setDialogs({...dialogs,proveedores:true})}>
                  <ListItemIcon>
                    <Icon>add</Icon>
                  </ListItemIcon>
                    <ListItemText primary="Agregar proveedor" />
                  </ListItemButton>
                </List>
              </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
      <FormControl fullWidth>
              <InputLabel variant="outlined">Selecccionar categoría</InputLabel>
              <Select required name="id_categoria_producto" value={formulario.id_categoria_producto} onChange={change} variant="outlined">
                {filterCategory.map((d) => (
                  <MenuItem key={d.id_categoria} value={d.id_categoria}>
                    {d.nombre_categoria}
                  </MenuItem>
                ))}
                <List>
                  <ListItemButton onClick={()=> setDialogs({...dialogs,categorias:true})}>
                  <ListItemIcon>
                    <Icon>add</Icon>
                  </ListItemIcon>
                    <ListItemText primary="Agregar nueva categoría" />
                  </ListItemButton>
                </List>
              </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <FormControl fullWidth>
              <InputLabel variant="outlined">Marca</InputLabel>
              <Select required name="id_marca_producto" value={formulario.id_marca_producto}
                onChange={change} variant="outlined" fullWidth
              >
                {listas.marcas.map((d) => (
                  <MenuItem key={d.id_marca} value={d.id_marca}>
                    {d.nombre_marca}
                  </MenuItem>
                ))}
                <List>
                  <ListItemButton onClick={()=> setDialogs({...dialogs,marcas:true})}>
                  <ListItemIcon>
                    <Icon>add</Icon>
                  </ListItemIcon>
                    <ListItemText primary="Agregar nueva marca" />
                  </ListItemButton>
                </List>
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
                <List>
                  <ListItemButton>
                  <ListItemIcon>
                    <Icon>add</Icon>
                  </ListItemIcon>
                    <ListItemText primary="Agregar nueva medida" />
                  </ListItemButton>
                </List>
              </Select>
        </FormControl>
      </Grid>
      
    </Grid>
  )
}

export default Datos
