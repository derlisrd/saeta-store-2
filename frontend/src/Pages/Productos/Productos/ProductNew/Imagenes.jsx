import { Avatar, Button, Grid, Icon, IconButton, Stack,Tooltip } from "@mui/material";
import React from "react";
import { useProductForm } from "./ProductFormProvider";

const Imagenes = () => {
  const { setImages,imagesURL,setImagesURL,images } = useProductForm();
  const deleteImage = e =>{
    let fileArray = [...images]; // images file
    let imagesArray = [...imagesURL]; // images url
    fileArray.splice(e, 1);
    imagesArray.splice(e,1);
    setImages(fileArray)
    setImagesURL(imagesArray);
    
  }
  const changeImage = (e) => {
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
  };
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div>
          <label htmlFor="btn-upload">
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
               Agregar imagen
            </Button>
          </label>
        </div>
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
            <Tooltip title="Borrar imagen">
            <IconButton onClick={()=> deleteImage(i) }>
              <Icon>delete</Icon>
            </IconButton>
            </Tooltip>
          </Stack>
            ))}
        </div>
      </Grid>
    </Grid>
  );
};

export default Imagenes;
