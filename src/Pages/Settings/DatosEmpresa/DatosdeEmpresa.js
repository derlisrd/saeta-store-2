import { Grid,TextField,Icon,Button, InputAdornment,Snackbar,Alert, FormControl, RadioGroup, FormControlLabel, Radio, FormLabel } from "@mui/material"
import { useSettings } from "./SettingsProvider"
import { funciones  } from "../../../Functions";
import { TextFieldIconStart } from "../../../Components/MuiCustom/TextFieldIconStart";
import LoadingLinear from "../../../Components/UI/LoadingLinear";
import { APICALLER } from "../../../Services/api";
import { useLogin } from "../../../Contexts/LoginProvider";
import { useState } from "react";
const DatosEmpresa = () => {

    const {userData} = useLogin()
    const {snack,setSnack, Guardar,handleOnchange,cargando,lang,setDatosEmpresa,datosEmpresa} = useSettings()
    const [loadindImg,setLoadindImg] = useState(false)

    /* const deleteImage = e =>{
      let fileArray = [...images]; // images file
      let imagesArray = [...imagesURL]; // images url
      fileArray.splice(e, 1);
      imagesArray.splice(e,1);
      setImages(fileArray)
      setImagesURL(imagesArray);
    }  */ 

    const changeImage = async(e) => {
      /* let fileObj = [];
      let fileArray = [...images]; // images file
      let imagesArray = [...imagesURL]; // images url
      fileObj.push(e.target.files);
      for (let i = 0; i < fileObj[0].length; i++) {
        imagesArray.push(URL.createObjectURL(fileObj[0][i]));
        fileArray.push(fileObj[0][i]);
      }
      setImages(fileArray)
      setImagesURL(imagesArray);*/
      let file = (e.target.files[0])
      setLoadindImg(true)
      let res = await APICALLER.uploadJustOneImage({file, token:userData.token_user})
      if(res.response){
        setDatosEmpresa({...datosEmpresa,logo_url_empresa:res.results.url})
      }
      setLoadindImg(false)
    };

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
        <Alert variant="outlined" severity="info">
          {lang.licencia_valida_hasta}: { funciones.fechaYMDMySQLtoEs( datosEmpresa.licencia)} 
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
          <FormControl>
            <FormLabel id="tipo_papel">Tipo de papel</FormLabel>
            <RadioGroup
              row aria-labelledby="tipo_papel" name="tipo_papel" onChange={handleOnchange}
            >
              <FormControlLabel value="0" checked={datosEmpresa.tipo_papel === "0"} control={<Radio />} label="Ticket" />
              <FormControlLabel value="1" checked={datosEmpresa.tipo_papel === "1"}  control={<Radio />} label="A4" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
            <TextField
              disabled={datosEmpresa.tipo_papel === "1"}  
              label={lang.dim_ticket}
              helperText={lang.en_mm}
              fullWidth
              type='number'
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon color="primary">print</Icon>
                  </InputAdornment>),
                }}
              value={datosEmpresa.dimension_ticket}
              onChange={handleOnchange}
              name="dimension_ticket"
            />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Mensaje en el recibo" name="mensaje_recibo_empresa" onChange={handleOnchange} value={datosEmpresa.mensaje_recibo_empresa} fullWidth />
        </Grid>
        
        <Grid item xs={12} >
          <TextField label="url_logo" name='logo_url_empresa' onChange={handleOnchange} fullWidth value={datosEmpresa.logo_url_empresa ? datosEmpresa.logo_url_empresa : ''} />
        </Grid>
        
        <Grid item xs={12} >
          {datosEmpresa.logo_url_empresa && <img src={datosEmpresa.logo_url_empresa} alt="logo" />}          
        </Grid>
        <Grid item xs={12} >
          
          <label htmlFor="btn_upload">
            <input
              name="btn_upload"
              id="btn_upload"
              style={{ display: "none" }}
              type="file"
              onChange={changeImage}
              accept="image/jpeg, image/png"
            />
            
            <Button startIcon={<Icon>file_upload</Icon>} disabled={loadindImg}  variant="outlined" component="span">
              { !loadindImg ? lang.subir_logo : lang.cargando}
            </Button>
            
          </label>
        
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
