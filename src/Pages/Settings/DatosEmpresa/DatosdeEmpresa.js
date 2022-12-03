import { Grid,TextField,Icon,Button, InputAdornment,Snackbar,Alert, Stack, Avatar } from "@mui/material"
import { useSettings } from "./SettingsProvider"
import { funciones as Funciones } from "../../../Functions";
import { TextFieldIconStart } from "../../../Components/MuiCustom/TextFieldIconStart";
import LoadingLinear from "../../../Components/UI/LoadingLinear";
const DatosEmpresa = () => {

    const {datosEmpresa,snack,setSnack, Guardar,handleOnchange,cargando,lang,imagesURL,/* setImages,setImagesURL,images */} = useSettings()

    

    /* const deleteImage = e =>{
      let fileArray = [...images]; // images file
      let imagesArray = [...imagesURL]; // images url
      fileArray.splice(e, 1);
      imagesArray.splice(e,1);
      setImages(fileArray)
      setImagesURL(imagesArray);
    } */

    /* const changeImage = (e) => {
      let fileObj = [];
      let fileArray = [...images]; // images file
      let imagesArray = [...imagesURL]; // images url
      fileObj.push(e.target.files);
      for (let i = 0; i < fileObj[0].length; i++) {
        imagesArray.push(URL.createObjectURL(fileObj[0][i]));
        fileArray.push(fileObj[0][i]);
      }
      setImages(fileArray)
      setImagesURL(imagesArray);
    }; */

    if(cargando){
      return <LoadingLinear />
    }
  return (
      <>
      <Snackbar anchorOrigin={{horizontal:"center",vertical:"top"}} open={snack} onClose={()=>{setSnack(false)}} autoHideDuration={3000} >
        <Alert severity="success"> {lang.actualizado_correctamente} !</Alert>
        </Snackbar>
    <Grid container spacing={2} >
      <Grid item xs={12}>
        <Alert severity="info">
          {lang.licencia_valida_hasta}: { Funciones.fechaYMDMySQLtoEs( datosEmpresa.licencia)} 
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
        <Grid item>
        <div style={{ display:"flex",flexWrap:"wrap",flexDirection:'row', gap:"10px",justifyContent:"center" }}>
        {(imagesURL || []).map((url, i) => (
          <Stack key={i} direction="column" sx={{ padding:"5px",border:"1px solid whitesmoke",borderRadius:'3px' }}>
            <Avatar
              variant="square"
              alt="..."
              src={url}
              sx={{ width: 256, height: 256 }}
            />
          </Stack>
            ))}
        </div>
      </Grid>
        <Grid item xs={12} >
          
          {/* <label htmlFor="btn-upload">
            <input
              id="btn-upload"
              name="btn-upload"
              style={{ display: "none" }}
              type="file"
              onChange={changeImage}
              multiple
              accept="image/jpeg, image/png"
            />
            <Button startIcon={<Icon>image</Icon>}  variant="outlined" component="span">
              {lang.subir_logo}
            </Button>
          </label> */}
        
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
