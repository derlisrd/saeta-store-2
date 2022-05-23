
import { useEffect,useCallback,useState } from 'react';
import { APICALLER } from '../../../../Services/api';
import { useProductos } from './ProductosProvider'
import ImagenViewer from '../../../../Components/UI/ImageViewer';
import LoadingBackDrop from '../../../../Components/UI/LoadingBackDrop';
import swal from 'sweetalert';
const ProductoImages = () => {
    const {dialogs,setDialogs,formDetalles} = useProductos();
    const [cargando,setCargando] = useState(false)
    const [imagen,setImagen] = useState({url_imagen:""})

    const getDataImage = useCallback(async()=>{
        setCargando(true);
        if(dialogs.imagen){
        let res = await APICALLER.get({table:"productos_images",where:`id_image_producto,=,${formDetalles.id_producto},and,portada_imagen_producto,=,1`});
        if(res.found>0 && res.response==="ok"){
            setImagen(res.results[0]);
        }else{
            setDialogs({detalles:false,code:false,imagen:false,stock:false});
            swal({text:"Producto sin imagen",icon:"warning",timer:1300});
        }
        }
        setCargando(false)
    },[dialogs,formDetalles,setDialogs])

    useEffect(()=>{
        getDataImage();
    },[getDataImage])
    const cerrar = ()=>{ setDialogs({...dialogs,imagen:false})}

  return (
    cargando ? <LoadingBackDrop /> : dialogs.imagen && <ImagenViewer open={dialogs.imagen} isClose={cerrar} imgSrc={imagen.url_imagen} />
  )
}

export default ProductoImages
