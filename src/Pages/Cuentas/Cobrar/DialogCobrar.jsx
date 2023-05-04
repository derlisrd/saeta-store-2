import {Dialog,Grid,TextField,FormControl,InputLabel,Select,MenuItem,Zoom,DialogContent,DialogTitle,DialogActions,Button,LinearProgress,Alert,Icon} from "@mui/material";
import NumberFormatCustom from '../../../Components/thirty/NumberFormatCustom'
import {useState} from 'react'
import { useCobrar } from "./CobrarProvider";
import { useLang } from "../../../Contexts/LangProvider";
import { funciones } from "../../../Functions";
import { useLogin } from "../../../Contexts/LoginProvider";
import { APICALLER } from "../../../Services/api";
import swal from "sweetalert";

function DialogCobrar() {

    const {lang} = useLang()
    const {userData} = useLogin()
    const {token_user,id_user} = userData
    const {dialogs,setDialogs,formSelect,listas,getLista} = useCobrar()
    const  [loading,setLoading] = useState(false)
    const [form,setForm] = useState({
        id_forma_pago:"",
        obs:"",
        monto_cobrado:"",
        id_cajas_moneda:"",
        descuento:0
      })
    
      const change = e=>{
        const {value,name} = e.target
        setForm({...form,[name]:value})
      }
    
      const cobrar = async(e)=>{
        e.preventDefault();
        
        let monto_cobrado = parseFloat(form.monto_cobrado),
     id_forma_pago = parseInt(form.id_forma_pago),
     obs = form.obs,
     id_cajas_moneda = form.id_cajas_moneda,
     cajas_monedas = [...listas.monedas],
     idcaja = formSelect.id_caja,
     monto_total_factura = parseFloat(formSelect.monto_total_factura),
     descuento = parseFloat(form.descuento)
     ;
     
     // efectivo
     
      let newrecibido_factura = parseFloat(formSelect.recibido_factura) + monto_cobrado;
      let foundMonedaIndex = listas.monedas.findIndex(e=> e.id_cajas_moneda === id_cajas_moneda);
      let id_moneda_caja = cajas_monedas[foundMonedaIndex].id_moneda;
      let montoActual = parseFloat(cajas_monedas[foundMonedaIndex].monto_caja_moneda),
      montoActualNoEfectivo = parseFloat(cajas_monedas[foundMonedaIndex].monto_no_efectivo);
      
      let montoNuevo = id_forma_pago===1 ?  ((monto_cobrado + montoActual) - descuento) : montoActual,
       monto_no_efectivo = id_forma_pago!==1 ? ((monto_cobrado + montoActualNoEfectivo)-descuento) : montoActualNoEfectivo;

      let dataCajaMoneda = {monto_caja_moneda: montoNuevo,monto_no_efectivo}
      let dataCajaMovimiento = {
        id_caja_movimiento:idcaja,
        id_user_movimiento:id_user,
        id_moneda_movimiento: id_moneda_caja,
        id_tipo_registro:2, 
        monto_movimiento: id_forma_pago===1 ? monto_cobrado : 0,
        monto_sin_efectivo: id_forma_pago!==1 ? monto_cobrado : 0,
        detalles_movimiento: obs,
        fecha_movimiento: funciones.getFechaHorarioString()
      }
      let dataFactura = {
        recibido_factura: newrecibido_factura,
        estado_factura: newrecibido_factura >= monto_total_factura   ? 1 :  2 
      }
      //console.log(dataCajaMoneda,dataCajaMovimiento,dataFactura);
      
      setLoading(true)
      let promesas = [
        APICALLER.update({table:'facturas',data:dataFactura,id:formSelect.id_factura,token:token_user}),
        APICALLER.update({table:'cajas_monedas',data:dataCajaMoneda ,token: token_user,id:id_cajas_moneda}),
        APICALLER.insert({table:'cajas_movimientos',token:token_user,data:dataCajaMovimiento})
      ]
      if(descuento>0){
        promesas.push(APICALLER.insert({table:'cajas_movimientos',token:token_user,
        data:{
          id_caja_movimiento:idcaja,
          id_user_movimiento:id_user,
          id_moneda_movimiento: id_moneda_caja,
          id_tipo_registro:17, 
          monto_movimiento: id_forma_pago===1 ? descuento : 0,
          monto_sin_efectivo: id_forma_pago!==1 ? descuento : 0,
          detalles_movimiento: 'Descuento de venta',
          fecha_movimiento: funciones.getFechaHorarioString()
        }
      }))
      } 
       await Promise.all(promesas) 
      setLoading(false)
      swal({text:lang.cobrado_correctamente,icon:'success',timer:1800});
      setDialogs({...dialogs,cobrar:false});
      getLista();
      }

    const close = () => {setDialogs({ ...dialogs, cobrar: false });};

    const listaMonedas = listas.monedas.filter(e=> parseInt(e.id_caja_moneda) === parseInt(formSelect.id_caja))

  const montoFaltante = parseFloat(formSelect.monto_total_factura) - parseFloat(formSelect.recibido_factura) - parseFloat(formSelect.descuento_factura)


    return (<Dialog onClose={close} TransitionComponent={Zoom} maxWidth="lg" fullWidth open={dialogs.cobrar}>
    <form onSubmit={cobrar}>
        <DialogTitle>{lang.cobrar}</DialogTitle>
        <DialogContent >
          <Grid container spacing={2}>
          <Grid item xs={12}>
              { loading && <LinearProgress /> }
          </Grid>
          <Grid item xs={12} >
              <Alert severity="success" icon={<Icon>person</Icon>}>
                {lang.cliente}: {formSelect.nombre_cliente}
              </Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Alert severity="info">
                {lang.nro}: {formSelect.nro_factura}
              </Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Alert severity="warning" icon={false}>
                {lang.caja}: {formSelect.nombre_caja}
              </Alert>
            </Grid>


            <Grid item xs={12} sm={4} >
              <Alert severity="success" icon={false}>
                {lang.total}: { funciones.numberFormat( formSelect.monto_total_factura)}  {formSelect.abreviatura_moneda}
              </Alert>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Alert severity="success" icon={false}>
                {lang.recibido}: {funciones.numberFormat(formSelect.recibido_factura)} {formSelect.abreviatura_moneda}
              </Alert>
            </Grid>
            <Grid item xs={12} sm={4} >
              <Alert severity="success" icon={false}>
                {lang.descuento}: { funciones.numberFormat( formSelect.descuento_factura)}  {formSelect.abreviatura_moneda}
              </Alert>
            </Grid>

            <Grid item xs={12} >
              <Alert severity="error" icon={false}>
                {lang.monto_faltante}: {funciones.numberFormat(montoFaltante)} {formSelect.abreviatura_moneda}
              </Alert>
            </Grid>


            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel >{lang.formas_de_pago}</InputLabel>
                <Select required name="id_forma_pago" value={form.id_forma_pago}
                  onChange={change}
                >
                  {listas.formasPago.map((d, index) => (
                    <MenuItem key={index} value={d.id_facturas_formas_pago}>
                      {d.descripcion_forma_pago}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel >{lang.moneda}</InputLabel>
                <Select required name="id_cajas_moneda" value={form.id_cajas_moneda}
                  onChange={change}
                >
                  {listaMonedas.map((d, index) => (
                    <MenuItem key={index} value={d.id_cajas_moneda}>
                      {d.nombre_moneda}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label={lang.monto_a_cobrar} autoComplete="off" required fullWidth onChange={change}  value={form.monto_cobrado} name="monto_cobrado" 
                InputProps={{inputComponent: NumberFormatCustom}}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField name="descuento" value={form.descuento} onChange={change} label="Descuento" fullWidth 
                InputProps={{inputComponent: NumberFormatCustom}}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField autoComplete="off" label={lang.observaciones} fullWidth value={form.obs} name="obs" onChange={change}/>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button  onClick={close}>{lang.cancelar}</Button>
          <Button disabled={loading} variant="contained" type="submit">
            {lang.cobrar}
          </Button>
        </DialogActions>
      </form>

        </Dialog>);
}

export default DialogCobrar;