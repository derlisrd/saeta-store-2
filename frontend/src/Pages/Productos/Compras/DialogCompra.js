import { Dialog, DialogContent, Icon,IconButton,Grid,TextField, DialogActions,Button, DialogTitle, Typography, Alert, Stack } from "@mui/material";
import swal from "sweetalert";
import NumberFormatCustom from "../../../Components/thirty/NumberFormatCustom";
import { useCompras } from "./ComprasProvider";
import InfoDeposito from "./InfoDeposito";

const DialogCompra = () => {

  const {dialogs,setDialogs,formulario, setFormulario,inputCodigo,Hacer_total,datosCompra,idDeposito} = useCompras()

  const cerrar = () => {
    inputCodigo.current.value=""
    setFormulario({
    codigo_producto:"",
    nombre_producto:"",
    preciom_producto:"",
    precio_producto:"",
    costo_producto:"",
    stock_nuevo:"",
    proveedor:"",
    iva_producto:"",
    stock_producto_deposito:"",
  })
    setDialogs({...dialogs,compra:false,buscar:false})
    inputCodigo.current.focus()
  };

  const Validar = ()=>{
    //console.log(formulario);
    if(formulario.stock_nuevo===""){
      return false;
    }
    if(formulario.preciom_producto===""){
      return false
    }
    if(formulario.precio_producto===""){
      return false
    }
    if(formulario.costo_producto===""){
      return false
    }
    /* if(formulario.stock_producto===""){
      return false
    } */
    if(idDeposito===""){
      swal({text:"Seleccione un deposito.", timer:1200})
      return false;
    }
    return true;
  }

  const AgregarAFactura = ()=>{
    
    if(Validar()){
      let fa = {...datosCompra}
      let form = {...formulario}
      form.id_deposito_deposito = idDeposito;
      fa.itemsFactura.push(form);
      Hacer_total(fa)
      cerrar()
    }
  }

  const onchange = (e)=>{
    const {name,value} = e.target
    setFormulario({...formulario,[name]:value})
  }

  return (
    <Dialog fullWidth  open={dialogs.compra} onClose={cerrar} scroll="body">
      <DialogTitle>
        <Stack direction="row" justifyContent={"space-between"} >
          Datos de compra
          <IconButton onClick={cerrar}>
            <Icon>close</Icon>
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}  >
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr)",gap:"5px"}}>
            <Alert icon={false} variant="outlined">
              <p>Codigo: {formulario.codigo_producto} </p>
              <p>Nombre: {(formulario.nombre_producto).toUpperCase()} </p>
              <InfoDeposito />
            </Alert>
            <Alert icon={false} variant="outlined">
              <p>Proveedor: {formulario.proveedor}</p>
              <p>Impuesto: {formulario.iva_producto} %</p>
              <p>Stock actual: {formulario.stock_producto_deposito} {formulario.descripcion_medida}</p>
            </Alert>
            </div>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="overline">Ingrese los datos de compra</Typography>
          </Grid>
         
          <Grid item xs={12} md={6}>
            <TextField 
            autoFocus fullWidth variant="outlined" onChange={onchange}  value={formulario.stock_nuevo} name="stock_nuevo" label="Stock o cantidad comprada" 
            InputProps={{inputProps: { min: 0},inputComponent: NumberFormatCustom }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth variant="outlined"   onChange={onchange} name="costo_producto" value={formulario.costo_producto}  label="Precio de compra o costo"  
              InputProps={{inputProps: { min: 0},inputComponent: NumberFormatCustom}}
            />
          </Grid> 
          <Grid item xs={12} md={6}>
            <TextField fullWidth variant="outlined"  onChange={onchange}  value={formulario.precio_producto} name="precio_producto" label="Precio de venta" 
              InputProps={{inputProps: { min: 0},inputComponent: NumberFormatCustom}}
              helperText="Precio con impuesto incluido"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth variant="outlined" onChange={onchange}  value={formulario.preciom_producto} name="preciom_producto" label="Precio de venta mayorista" 
              InputProps={{inputProps: { min: 0},inputComponent: NumberFormatCustom}}
              helperText="Precio con impuesto incluido"
            />
          </Grid> 
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={AgregarAFactura}>Agregar</Button>
        <Button variant="outlined" onClick={cerrar}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogCompra;
