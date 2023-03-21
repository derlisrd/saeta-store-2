import {Dialog,DialogTitle,DialogActions,DialogContent,Grid, TextField,Button, InputLabel, FormControl, Select, MenuItem} from '@mui/material'
import { useVentas } from './VentasProvider';

function DialogRegistrarProducto() {

    const {dialogs,llaveDialog,datosFacturas} = useVentas()

    let dep = (datosFacturas.listaDepositos);

    const close = ()=> llaveDialog('registrarProducto',false)

    return ( <Dialog open={dialogs.registrarProducto} fullWidth onClose={close} >
        <DialogTitle>Registrar producto</DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth autoFocus label="Código" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Nombre" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Costo" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Precio de venta" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Cantidad de Stock" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                    <InputLabel id="id_deposito">Depósito</InputLabel>
                    <Select
                        value="1"
                        label="Depósito"
                        onChange={()=>{}}
                    >
                        {
                            dep.map((e,i)=>(
                                <MenuItem key={i} value={e.id_deposito}>{e.nombre_deposito}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={close}>Cerrar</Button>
            <Button variant='contained'>Guardar</Button>
        </DialogActions>
    </Dialog> );
}

export default DialogRegistrarProducto;