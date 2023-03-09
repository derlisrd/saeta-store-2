
import { useEffect,useCallback,useState } from 'react';
import { APICALLER } from '../../../../Services/api';
import { useProductos } from './ProductosProvider'
//import ImagenViewer from '../../../../Components/UI/ImageViewer';
import LoadingBackDrop from '../../../../Components/UI/LoadingBackDrop';
import swal from 'sweetalert';
import { Box, Modal } from '@mui/material';
const ProductoImages = () => {
    const {dialogs,setDialogs,formDetalles} = useProductos();
    const [cargando,setCargando] = useState(false)
    const [imagen,setImagen] = useState({url_imagen:""})

    const getDataImage = useCallback(async()=>{
        setCargando(true);
        if(dialogs.imagen){
        let res = await APICALLER.get({table:"productos_images",where:`id_image_producto,=,${formDetalles.id_producto},and,portada_imagen_producto,=,1`});
        if(res.found>0 && res.response){
            setImagen(res.results[0]);
        }else{
            setDialogs({detalles:false,code:false,imagen:false,stock:false});
            swal({text:"Producto sin imagen",icon:"warning",timer:1300});
        }
        }
        setCargando(false)
    },[dialogs,formDetalles,setDialogs])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 480,
        bgcolor: 'background.paper',
        border: '2px solid silver',
        borderRadius:3,
        boxShadow: 24,
        p: 1,
      };

    useEffect(()=>{
        getDataImage();
    },[getDataImage])
    const cerrar = ()=>{ setDialogs({...dialogs,imagen:false})}

  return (
    cargando ? <LoadingBackDrop /> : dialogs.imagen && 
    <Modal
    open={dialogs.imagen}
    onClose={cerrar}
    >
    <Box sx={style}>
      <img src={imagen.url_imagen} alt={imagen.url_imagen} style={{ width:'100%' }} />
    </Box>
  </Modal>
  )
}

export default ProductoImages
