import { Alert, AlertTitle, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Icon, IconButton, InputAdornment, TextField, Tooltip, Zoom } from '@mui/material'
import {useRef} from 'react'
import { useNotas } from '../NotasProvider';


const CambioCliente = () => {
    const {dialogs,setDialogs,datosNotas,indexFactura,cargas,consultarCliente,errors} = useNotas();
    const inputDocClienteRef = useRef(null);
    const fd = datosNotas;
  const fa = fd.facturas[indexFactura];
    const cerrar = ()=>{ setDialogs({...dialogs,cambioCliente:false})}
  return (
    <Dialog open={dialogs.cambioCliente} onClose={cerrar} fullWidth>
        <DialogTitle>
            Cliente
        </DialogTitle>
        <DialogContent dividers>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                  <TextField
                    onKeyPress={(e) => {
                      e.key === "Enter" && consultarCliente(inputDocClienteRef.current.value);}}
                    label="Documento de cliente"
                    placeholder="Documento de cliente"
                    fullWidth
                    inputRef={inputDocClienteRef}
                    variant="outlined"
                    autoFocus
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {cargas.cargandoCliente ? (
                            <CircularProgress size={24} />
                          ) : (
                            <Tooltip
                              TransitionComponent={Zoom}
                              arrow
                              title={<h2>Buscar cliente</h2>}
                            >
                              <IconButton
                                onClick={() =>
                                  setDialogs({
                                    ...dialogs,
                                    buscarCliente: true,
                                  })
                                }
                              >
                                <Icon>search</Icon>
                              </IconButton>
                            </Tooltip>
                          )}
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <Tooltip
                          TransitionComponent={Zoom}
                          arrow
                          title={<h2>Registrar cliente</h2>}
                        >
                          <IconButton
                            onClick={() => {
                              setDialogs({
                                ...dialogs,
                                registrarCliente: true,
                              });
                            }}
                          >
                            <Icon color="primary">person_add_alt_1</Icon>
                          </IconButton>
                        </Tooltip>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Alert
                    severity={errors.cliente ? "error" : "info"}
                    icon={false}
                    variant="outlined"
                  >
                    <AlertTitle>
                      DOC: {fa.datosCliente.ruc_cliente} <br />
                      NOMBRE: {fa.datosCliente.nombre_cliente} 
                    </AlertTitle>
                    <AlertTitle>{errors.clienteMensaje}</AlertTitle>
                  </Alert>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={cerrar} variant="outlined">Cerrar</Button>
        </DialogActions>
    </Dialog>
  )
}

export default CambioCliente
