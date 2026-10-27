import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Icon, LinearProgress, Stack, Zoom } from "@mui/material";
import { useProductos } from "./ProductosProvider";
import { useEffect, useState } from "react";
import { APICALLER } from "../../../../Services/api";
import { useLogin } from "../../../../Contexts/LoginProvider";


function DialogBorrar() {
    const { userData } = useLogin(); 
    const {token_user} = userData;
    const {dialogs,setDialogs,formSelect,getLista} = useProductos()
    const [loading,setLoading] = useState(false)
    const [form,setForm] = useState({nombre_producto:'',codigo_producto:'',id_producto:''})

    const borrar = async()=>{
        setLoading(true)
        let f = {...form}
        let res = await APICALLER.delete({table: `productos`,id: f.id_producto,token: token_user});
        if (res.response ) {
          Promise.all([
            APICALLER.delete({table: `productos_images`,namecolumns:"id_image_producto",ids:f.id_producto,token: token_user}),
            APICALLER.delete({table: `productos_depositos`,namecolumns:"id_producto_deposito",ids:f.id_producto,token: token_user})
          ])
          getLista();
          close()
        } else {
          console.log(res);
        }
        setLoading(false)
    }

    const close = ()=>{setDialogs({...dialogs,borrar:false})}


    useEffect(()=>{
        if(dialogs.borrar){
            setForm(formSelect)
        }
    },
    [formSelect,dialogs])


    return ( <Dialog onClose={close} open={dialogs.borrar} fullWidth TransitionComponent={Zoom} >
        <DialogTitle>Desea borrar este producto?</DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {loading && <LinearProgress />}
                </Grid>
                <Grid item xs={12}>
                    <Stack direction='column' spacing={1} justifyContent='center' alignItems='center'>
                        <p><Icon color="warning" sx={{ fontSize:'48px' }} >report_problem</Icon></p>
                        <h4>
                           COD: {form.codigo_producto}
                        </h4>
                        <h4>
                            Producto: {form.nombre_producto}
                        </h4>
                    </Stack>
                    
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" onClick={close}>No, cancelar</Button>
            <Button variant="contained" onClick={borrar}>Si, borrar</Button>
        </DialogActions>
    </Dialog> );
}

export default DialogBorrar;