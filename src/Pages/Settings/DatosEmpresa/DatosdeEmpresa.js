import { Grid,TextField,Icon,Button, InputAdornment,Snackbar,Alert } from "@mui/material"
import { useSettings } from "./SettingsProvider"
import LoadingBackDrop from "../../../Components/UI/LoadingBackDrop";
import { funciones as Funciones } from "../../../Functions";
const DatosEmpresa = () => {

    const {datosEmpresa,snack,setSnack, Guardar,handleOnchange,cargando} = useSettings()

    if(cargando){
      return <LoadingBackDrop />
    }
  return (
      <>
      <Snackbar anchorOrigin={{horizontal:"center",vertical:"top"}} open={snack} onClose={()=>{setSnack(false)}} autoHideDuration={3000} >
        <Alert severity="success">Actualizado correctamente!</Alert>
        </Snackbar>
    <Grid container spacing={2} >
      <Grid item xs={12}>
        <Alert severity="info">
          Licencia válida hasta: { Funciones.fechaEsDMY( datosEmpresa.licencia)} 
        </Alert>
      </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
                autoFocus 
                label="Nombre de empresa"
                variant="outlined"
                fullWidth
                helperText="Fulanito de tal SRL"
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
                label="Propietario de empresa"
                variant="outlined"
                fullWidth
                helperText="Caso ser unipersonal, sino deje en blanco"
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
                label="Ruc de empresa"
                variant="outlined"
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
                label="Dirección de empresa"
                variant="outlined"
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
                label="Teléfono de empresa"
                variant="outlined"
                fullWidth
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon color="secondary">phone</Icon>
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
                label="Categoria"
                variant="outlined"
                fullWidth
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon color="action">category</Icon>
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
                label="Dimension de ticket"
                variant="outlined"
                helperText='En mm'
                fullWidth
                type='number'
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon color="secondary">print</Icon>
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
