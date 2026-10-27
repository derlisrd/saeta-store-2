
import { useEffect,useCallback,useState } from 'react';
import { APICALLER } from '../../../../Services/api';
import { useProductos } from './ProductosProvider'
//import ImagenViewer from '../../../../Components/UI/ImageViewer';
import LoadingBackDrop from '../../../../Components/UI/LoadingBackDrop';
import swal from 'sweetalert';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
const ProductoImages = () => {
    const {dialogs,setDialogs,formDetalles} = useProductos();
    const [cargando,setCargando] = useState(false)
    const [images,setImages] = useState([])

    const getDataImage = useCallback(async()=>{
        setCargando(true);
        if(dialogs.imagen){
        let res = await APICALLER.get({table:"productos_images",where:`id_image_producto,=,${formDetalles.id_producto}`});
        if(res.found>0 && res.response){
            //console.log(res.results);
            let img = [];
            res.results.forEach(e=>{
              img.push({src:e.url_imagen})
            })
            setImages(img)
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
    cargando ? <LoadingBackDrop /> : dialogs.imagen && 


    <Lightbox
        open={dialogs.imagen}
        close={cerrar}
        slides={images}
      />


  )
}

export default ProductoImages
