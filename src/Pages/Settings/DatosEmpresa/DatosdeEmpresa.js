import { Grid,TextField,Icon,Button, InputAdornment,Snackbar,Alert } from "@mui/material"
import { useSettings } from "./SettingsProvider"
import LoadingBackDrop from "../../../Components/UI/LoadingBackDrop";
import { funciones as Funciones } from "../../../Functions";
const DatosEmpresa = () => {

    const {datosEmpresa,snack,setSnack, Guardar,handleOnchange,cargando,lang} = useSettings()

    if(cargando){
      return <LoadingBackDrop />
    }
  return (
      <>
      <Snackbar anchorOrigin={{horizontal:"center",vertical:"top"}} open={snack} onClose={()=>{setSnack(false)}} autoHideDuration={3000} >
        <Alert severity="success"> {lang.actualizado_correctamente} !</Alert>
        </Snackbar>
    <Grid container spacing={2} >
      <Grid item xs={12}>
        <Alert severity="info">
          {lang.licencia_valida_hasta}: { Funciones.fechaEsDMY( datosEmpresa.licencia)} 
        </Alert>
      </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
                autoFocus 
                label={lang.nombre_de_empresa}
                fullWidth
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon color="primary">info</Icon>
                      </InputAdornment>
                    ),
                  }}
                value={datosEmpresa.nombre_empresa}
                onChange={handleOnchange}
                name="nombre_empresa"
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField 
                label={lang.propietario}
                fullWidth
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon color="primary">business_center</Icon>
                      </InputAdornment>
                    ),
                  }}
                  value={datosEmpresa.propietario_empresa}
                  onChange={handleOnchange}
                  name="propietario_empresa"
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField 
                label={lang.ruc_de_empresa}
                fullWidth
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon color="primary">credit_card</Icon>
                      </InputAdornment>
                    ),
                  }}
                  value={datosEmpresa.ruc_empresa}
                  onChange={handleOnchange}
                  name="ruc_empresa"
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField 
                label={lang.direccion}
                fullWidth
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon color="primary">push_pin</Icon>
                      </InputAdornment>
                    ),
                  }}
                value={datosEmpresa.direccion_empresa}
                onChange={handleOnchange}
                name="direccion_empresa"
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField 
                label={lang.telefono}
                fullWidth
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon color="primary">phone</Icon>
                      </InputAdornment>
                    ),
                  }}
                  value={datosEmpresa.telefono_empresa}
                  onChange={handleOnchange}
                  name="telefono_empresa"
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField 
                label={lang.categoria}
                variant="outlined"
                fullWidth
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon color="primary">category</Icon>
                      </InputAdornment>
                    ),
                  }}
                  value={datosEmpresa.categoria_empresa}
                  onChange={handleOnchange}
                  name="categoria_empresa"
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField 
                label={lang.dim_ticket}
                helperText={lang.en_mm}
                fullWidth
                type='number'
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon color="primary">print</Icon>
                      </InputAdornment>
                    ),
                  }}
                  value={datosEmpresa.dimension_ticket}
                  onChange={handleOnchange}
                  name="dimension_ticket"
            />
        </Grid>
        <Grid item xs={12} >
            <Button size="large" onClick={Guardar} variant="outlined" color="primary" startIcon={<Icon color="primary" >save</Icon>} >
                Guardar
            </Button>
        </Grid>
    </Grid>

    </>
  )
}

export default DatosEmpresa
