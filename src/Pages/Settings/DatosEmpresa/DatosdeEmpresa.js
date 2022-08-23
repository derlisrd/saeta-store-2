import { Grid,TextField,Icon,Button, InputAdornment,Snackbar,Alert } from "@mui/material"
import { useSettings } from "./SettingsProvider"
import LoadingBackDrop from "../../../Components/UI/LoadingBackDrop";
import { funciones as Funciones } from "../../../Functions";
import { TextFieldIconStart } from "../../../Components/MuiCustom/TextFieldIconStart";
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
        <Grid item xs={12} md={6}>

          <TextFieldIconStart autoFocus icon="info"
                label={lang.nombre_de_empresa}
                fullWidth
                value={datosEmpresa.nombre_empresa}
                onChange={handleOnchange}
                name="nombre_empresa"
            />
        </Grid>
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
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
          <TextField label="url_logo" name='logo_url_empresa' onChange={handleOnchange} fullWidth value={datosEmpresa.logo_url_empresa ? datosEmpresa.logo_url_empresa : ''} />
        </Grid>
        <Grid item xs={12} >
          {datosEmpresa.logo_url_empresa && <img src={datosEmpresa.logo_url_empresa} alt="logo" />}
        </Grid>
        <Grid item xs={12} >
          <Button variant="contained" component="label">
            {lang.subir_logo}
                <input hidden accept="image/*" multiple type="file" />
          </Button>
        </Grid>
        <Grid item xs={12} >
            <Button size="large" onClick={Guardar} variant="outlined" color="primary" startIcon={<Icon>save</Icon>} >
                {lang.guardar}
            </Button>
        </Grid>
    </Grid>

    </>
  )
}

export default DatosEmpresa
