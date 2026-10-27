import { Dialog, DialogActions, DialogContent, DialogTitle, Icon, IconButton, Tooltip, Zoom,Grid, Typography, TextField, LinearProgress } from '@mui/material'
import { Fragment, useState } from 'react'
import { AlertError } from '../../../Components/MuiCustom/AlertsCustom';
import ButtonCustom from '../../../Components/MuiCustom/ButtonCustom';
import { DatePickerCustom } from '../../../Components/MuiCustom/DatePickerCustom';
import { APICALLER } from '../../../Services/api';
import Proveedores from './Proveedores';
import { useCompras } from '../ComprasProvider';
import Comprobantes from './Comprobantes';
import ListaCajas from './ListaCajas';
import ListaCajasTipoPago from './ListaCajasTipoPago';
import { useLogin } from '../../../Contexts/LoginProvider';
import swal from 'sweetalert';


const DialogFinalizar = () => {

    const {userData} = useLogin();
    const {id_user} = userData
    const {dialogs,setDialogs,lang,funciones,compras,token_user,setearCompras,inputCodigo} = useCompras();
    const [isLoading,setIsLoading] = useState(false)
    const fecha = funciones.getFechaHorarioString();
    const initialForm = {
      tipo_factura_compra:"",
      tipo_pago:1,
      comprobante_nro:"",
      id_proveedor_compra:"",
      id_cajas_moneda:"",
      fecha_pago:funciones.fechaActualYMD(),
      fecha:fecha
    }
    const initialError = {
      active: false,
      id_error: null,
      msj:""
    }
    const [error,setError] = useState(initialError);
    const [form,setForm] = useState(initialForm)

    const change = e=>{ 
      const {value,name} = e.target
     setForm({...form,[name]:value})
    }






    const finalizarEnviar = async()=>{
      
      setError({active:false,msj:"",id_error:0})
      const f = {...form}

      let estado_compra = parseInt(f.tipo_factura_compra) > 1 ? 2 : 1 ;

         let nformcompra = {
          id_proveedor_compra: f.id_proveedor_compra,
          tipo_factura_compra: f.tipo_factura_compra,
          fecha_pago_compra:f.fecha_pago,
          nro_factura_compra:f.comprobante_nro,
          fecha_compra:f.fecha,
          total_factura_compra:compras.sumatotal,
          estado_compra
        }
        
        setIsLoading(true)
        let res = await APICALLER.insert({table:"compras",data:nformcompra,token:token_user})
         
        if(res.response){
          let id = res.last_id;

          const promises = [];
          let index_caja, caja_seleccionada;
          const sumatotal = compras.sumatotal;
          let nuevo_monto_efectivo = 0; let nuevo_monto_no_efectivo = 0;
          if(estado_compra < 2){
            index_caja = compras.cajas.findIndex(e=> e.id_cajas_moneda === f.id_cajas_moneda)
            if(index_caja>=0){
              caja_seleccionada = compras.cajas[index_caja]
            }else{
              setError({active:true,msj:"No hay caja seleccionada",id_error:7})
              return false;
            }
            let data_mov = {
              id_tipo_registro: 6, // compras
              detalles_movimiento: `Compras de productos según comprobante nro: ${f.comprobante_nro}`,
              fecha_movimiento: fecha,
              id_user_movimiento: id_user,
              id_caja_movimiento: caja_seleccionada.id_caja_moneda,
              id_moneda_movimiento: caja_seleccionada.id_moneda
            }
            if(f.tipo_pago === 1){
              nuevo_monto_efectivo = parseFloat(caja_seleccionada.monto_caja_moneda) - sumatotal;
              data_mov.monto_movimiento = sumatotal;
              promises.push(APICALLER.update({table:'cajas_monedas',data: {monto_caja_moneda:nuevo_monto_efectivo}, id: caja_seleccionada.id_cajas_moneda,token:token_user}))
            }else{
              nuevo_monto_no_efectivo = parseFloat(caja_seleccionada.monto_no_efectivo) - sumatotal; 
              data_mov.monto_sin_efectivo = sumatotal;
              promises.push(APICALLER.update({table:'cajas_monedas',data: {monto_no_efectivo:nuevo_monto_no_efectivo}, id: caja_seleccionada.id_cajas_moneda,token:token_user}))
            }
            promises.push(APICALLER.insert({table:'cajas_movimientos',token:token_user,data:data_mov}))
          }
          
          compras.items.forEach(e => {
            promises.push(
              APICALLER.insert({table:"compras_items",token:token_user,
              data:{
                id_item_compra:id,
                id_producto_compra:e.id_producto_compra,
                precio_compra:e.precio_compra,
                preciom_venta:e.preciom_venta,
                precio_venta:e.precio_venta,
                cantidad_compra:e.cantidad_compra,
              }
            })
            )

            promises.push(
              APICALLER.insert({table:"productos_registros",token:token_user,
              data:{
                id_producto_registro:e.id_producto_compra,
                id_deposito_registro:e.id_compras_deposito,
                cantidad_cargada: e.cantidad_compra,
                fecha_cargada: form.fecha,
                
              }
            })
            )
            
            promises.push(
              APICALLER.updateOrInsert({
              table:'productos_depositos',
              id:e.id_productos_deposito ?? null,
              token: token_user,
              data: { 
                stock_producto_deposito: e.stock_producto_deposito, id_producto_deposito:e.id_producto_compra, id_deposito_deposito: e.id_compras_deposito,
               }
            })
            )
          });

          Promise.all(promises);
        } 
        setIsLoading(false)
        

        swal({text:'Compra hecha correctamente',icon:'success', title:'Éxito', timer:1800}).then(()=>{
          let d = {...compras}
          d.items = []
          setearCompras(d);
          setDialogs({...dialogs,finalizar:false})
          inputCodigo.current.value =""
          inputCodigo.current.focus() 
        })
    }







  const close = ()=>setDialogs({...dialogs,finalizar:false})

  return (
    <Dialog onClose={close} open={dialogs.finalizar} fullScreen>
      <DialogTitle>
        <Tooltip
          title={<h2>{lang.volver_atras}</h2>}
          TransitionComponent={Zoom}
          arrow
          placement="right-start"
        >
          <IconButton onClick={close} color="primary">
            <Icon>arrow_back_ios_new</Icon>
          </IconButton>
        </Tooltip>
        {lang.finalizar_compras}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            {isLoading && <LinearProgress />}
          </Grid>
          <Grid item xs={12}>
            {error.active && <AlertError>{error.msj}</AlertError>}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="button">{lang.datos_comprobante}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Proveedores form={form} setForm={setForm} error={error} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Comprobantes form={form} setForm={setForm} error={error} />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={3}>
            <TextField
              name="comprobante_nro"
              value={form.comprobante_nro}
              onChange={change}
              label={lang.nro_comprobante}
              fullWidth
            />
          </Grid>

          {parseInt(form.tipo_factura_compra) > 1 && (
            <Fragment>
              <Grid item xs={12}>
                <Typography variant="button">{lang.fecha_pago}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <DatePickerCustom
                  value={form.fecha_pago}
                  label={lang.fecha_pago}
                  onChange={(d) => {
                    setForm({ ...form, fecha_pago: funciones.getFechaHorarioString( d ) });
                  }}
                  name="fecha_pago"
                />
              </Grid>
            </Fragment>
          )}
          {
            parseInt(form.tipo_factura_compra)<2 && (
              <>
              <Grid item xs={12}>
                <Typography variant="button">{lang.caja}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <ListaCajas form={form} setForm={setForm} error={error} />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <ListaCajasTipoPago form={form} setForm={setForm} />
              </Grid>
              </>
            )
          }

          
        </Grid>
      </DialogContent>
      <DialogActions>
        <ButtonCustom
          variant="contained"
          color="success"
          onClick={finalizarEnviar}
          fullWidth
        >
          {lang.finalizar}{" "}
        </ButtonCustom>
        <ButtonCustom variant="outlined" onClick={close} fullWidth>
          {lang.cancelar}{" "}
        </ButtonCustom>
      </DialogActions>
    </Dialog>
  );
}

export default DialogFinalizar
