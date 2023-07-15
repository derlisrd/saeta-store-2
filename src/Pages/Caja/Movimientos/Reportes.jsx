import {Dialog,DialogActions,DialogTitle,DialogContent,Button, Grid, InputLabel, Select, MenuItem, FormControl,LinearProgress,Alert} from '@mui/material'
import { useMovimientos } from './MovimientosProvider';
import { useState,useRef } from 'react';
import ButtonTip from '../../../Components/Botones/ButtonTip';
import TablaImprimir from './Components/TablaImprimir';
import { DatePickerCustom } from '../../../Components/MuiCustom/DatePickerCustom';
import { APICALLER } from '../../../Services/api';
import { funciones } from '../../../Functions';
import { useReactToPrint } from 'react-to-print';


function Reportes() {
    const {dialog,setDialog,lang,listaCajas} = useMovimientos()
    const [loading,setLoading] = useState(false)
    const divRef = useRef();
    const today = new Date()
    const [lista,setLista] = useState([])
    const [desde, setDesde] = useState(today);
    const [hasta, setHasta] = useState(today);
    const changeDatadesde = (e) => setDesde(e);
    const changeDatahasta = (e) => setHasta(e);
    const [form,setForm] = useState({id_caja:''})
    const [caja,setCaja] = useState('')
    const [cajasTotales,setCajasTotales] = useState([])
    const [totales,setTotales] = useState({ingresoEfectivo:0,egresoEfectivo:0,ingresoNoEfectivo:0,salidaNoEfectivo:0})
    const change = e=>{
        const {value,name} = e.target
        setForm({...form,[name]:value})
    }
    const close = ()=> { 
        setDialog({...dialog,reportes:false})
        setForm({id_caja:''})
        setLista([])
        setCajasTotales([])
    }
    
    const print = useReactToPrint({content: () => divRef.current});
    const consultar = async()=>{
        if(form.id_caja===''){return false;}
        let findCaja = listaCajas.find(e=> e.id_caja === form.id_caja)
        setCaja(findCaja.nombre_caja)
        let desdeFecha = funciones.getDateYMD( desde ),
        hastaFecha =funciones.getDateYMD( hasta );
        setLoading(true)
        let [res,montos] = await Promise.all([
            APICALLER.get({
                table:'cajas_movimientos', include:'cajas_registros,monedas',on:'id_cajas_registro,id_tipo_registro,id_moneda_movimiento,id_moneda',
                fields:'abreviatura_moneda,valor_moneda,id_cajas_movimiento,monto_movimiento,monto_sin_efectivo,tipo_registro,descripcion_registro,detalles_movimiento,fecha_movimiento',
                where:`id_caja_movimiento,=,${form.id_caja},and,fecha_movimiento,between,'${desdeFecha} 00:00:00',and,'${hastaFecha} 23:59:59'`
            }),
            APICALLER.get({
                table:'cajas_monedas',include:"monedas",on:"id_moneda,id_moneda_caja_moneda",
                where:`id_caja_moneda,=,${form.id_caja}`,fields:"monto_caja_moneda,monto_inicial_caja,active_moneda_caja,abreviatura_moneda,monto_no_efectivo"
            })
        ]);
        if(res.response){
            let array = [],totalIngresoEfectivo=0, totalEgresoEfectivo=0,totalIngresoNoEfectivo=0,salidaNoEfectivo=0;
            setCajasTotales(montos.results)
            res.results.forEach(elm=>{
                let noEfectivo=0,ingresoEfectivo=0,egresoEfectivo=0,noEfectivoSalida=0;
                if(elm.tipo_registro==='1'){
                    totalIngresoEfectivo += (parseInt(elm.monto_movimiento)*parseFloat(elm.valor_moneda))
                    ingresoEfectivo = parseInt(elm.monto_movimiento)*parseFloat(elm.valor_moneda)
                    noEfectivo = parseInt(elm.monto_sin_efectivo)*parseFloat(elm.valor_moneda)
                    totalIngresoNoEfectivo += (parseInt(elm.monto_sin_efectivo)*parseFloat(elm.valor_moneda))
                }
                if(elm.tipo_registro==='0'){
                    totalEgresoEfectivo += (parseInt(elm.monto_movimiento)*parseFloat(elm.valor_moneda))
                    salidaNoEfectivo += (parseInt(elm.monto_sin_efectivo)*parseFloat(elm.valor_moneda))
                    egresoEfectivo = parseInt(elm.monto_movimiento)*parseFloat(elm.valor_moneda)
                    noEfectivoSalida = parseInt(elm.monto_sin_efectivo)*parseFloat(elm.valor_moneda)
                }
                array.push({
                    ...elm,
                    ingresoEfectivo,
                    egresoEfectivo,
                    noEfectivo,
                    noEfectivoSalida
                })
            })
            setTotales({ingresoEfectivo:totalIngresoEfectivo,egresoEfectivo:totalEgresoEfectivo,ingresoNoEfectivo:totalIngresoNoEfectivo,salidaNoEfectivo})
            setLista(array)
        }else{
            console.log(res);
        }
        setLoading(false)
        
    }

    return ( <Dialog fullScreen open={dialog.reportes} onClose={close}>
        <DialogTitle><ButtonTip icon='arrow_back_ios_new' title='Cerrar' onClick={close} /> Generar reporte</DialogTitle>
        <DialogContent>
            <Grid container spacing={2} alignItems='center'>
               <Grid item xs={12}>{loading && <LinearProgress />}</Grid>
               <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                <InputLabel >
                    {lang.seleccione_caja}
                    </InputLabel>
                    <Select
                        name="id_caja"
                        value={form.id_caja}
                        onChange={change}
                    >
                        {listaCajas.map((d, index) => (
                        <MenuItem key={index} value={d.id_caja}>
                            {d.nombre_caja}
                        </MenuItem>
                        ))}
                    </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <DatePickerCustom 
                    label={lang.desde}
                    value={ (desde)}
                    defaultValue={desde}
                    onChange={changeDatadesde}
                    name="desdeFecha"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                <DatePickerCustom 
                    label={lang.hasta}
                    value={hasta}
                    defaultValue={hasta}
                    onChange={changeDatahasta}
                    name="hastaFecha"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Button variant='outlined' onClick={consultar}>CONSULTAR</Button>
                </Grid>
                <Grid item xs={12}>
                    {
                        lista.length>0 ? <div ref={divRef}><TablaImprimir cajasTotales={cajasTotales} caja={caja} desde={desde} hasta={hasta}  listado={lista} totales={totales} /> </div>: <Alert severity='warning'>SIN REGISTROS</Alert> 
                    }
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={print} variant='contained'>IMPRIMIR</Button>
            <Button variant='outlined' onClick={close} >CERRAR</Button>
        </DialogActions>
    </Dialog> );
}

export default Reportes;