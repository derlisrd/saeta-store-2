import React,{createContext,useContext,useCallback,useState,useEffect,useRef} from 'react'
import { useLocation, useParams,useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { APICALLER } from '../../../../Api/ApiCaller';
import { useLogin } from '../../../../Contextos/LoginProvider';
import Funciones from '../../../../Funciones';
//import Funciones from '../../../../Funciones';

const ProductFormEditContexto = createContext();
const ProductFormEditProvider = (props) => {
    const {id} = useParams();
    const {state} = useLocation();
    const page = state?.page || 0;
    const navigate = useNavigate();
    const { token_user } = useLogin();
    const [tabValue,setTabValue] = useState(0);
    const initialSnack = {open:false,severity:"success",mensaje:"",id_code:"",send:false}
    const [snack,setSnack] = useState(initialSnack);
    const initialCargas = {main:true,guardar:false}
    const [cargas,setCargas] = useState(initialCargas);
    const inputCodigo = useRef(null);
    const inputNombre = useRef(null);
    const storage = JSON.parse(localStorage.getItem("dataProductos"));
    const initialListas = {
      medidas: storage?.medidas || [],
      categorias:storage?.categorias || [],
      marcas: storage?.marcas || [],
      proveedores:storage?.proveedores || [],
      impuestos:storage?.impuestos || [],
      depositos: storage?.depositos || [],
  }
    const [listas,setListas] = useState(initialListas);
    const [listaImagenes,setListaImagenes] = useState([]);

    const initialForm = {
        id_categoria_producto: "",
        id_proveedor_producto: "",
        id_marca_producto: "",
        id_impuesto_producto: "",
        id_unidad_medida_producto: "",
        id_deposito_producto: "",
        codigo_producto: "",
        nombre_producto: "",
        descripcion_producto:"",
        costo_producto: "0",
        precio_producto: "0",
        preciom_producto: "0",
        minimo_producto: "0",
        porcentaje_comision:"0",
        stock_producto: "0",
        notificar_producto: "",
        tipo_producto: "1",
        disponible_producto:"1"
      };
      const [formulario, setFormulario] = useState(initialForm);
    const [code,setCode] = useState(null);
    const [images,setImages] = useState([]); 
    const [imagesURL,setImagesURL] = useState([]);
    const change = e=>{ const {name,value} = e.target; setFormulario({...formulario,[name]:value});}
    const changeCheck = (e) => {
        const { checked, name } = e.target; 
        setFormulario({ ...formulario, [name]: checked ? "1" : "0" });
    };


    const verificarProducto = useCallback(async()=>{
      
      setSnack({open:false,id_code:"",mensaje:"",severity:"success",send:true});
      if(code===formulario.codigo_producto) return false;
      let res = await APICALLER.get({table: `productos`,where: `codigo_producto,=,'${formulario.codigo_producto}'`,fields: `id_producto`});
  
      if (res.response === "ok") {
        if (res.found > 0) {
          if(res.results[0].id_producto === id){
            setSnack({open:false,id_code:"",mensaje:"",severity:"success",send:true});
          }else{
            setSnack({open:true,mensaje:"Ese código del producto ya existe.",severity:"warning",id_code:"codigo_producto",send:false});
            inputCodigo?.current?.focus();
            return false;
          }
        }
        else{
          setSnack({open:false,id_code:"",mensaje:"",severity:"success",send:true});
        }
      } else {
        console.log(res);
      }
    },[formulario,id,code]);

    const eliminarImagen = async(idImage)=>{
      let borrar = await swal({icon: "warning",text:"Desea borrar la imagen?",buttons: [`Cancelar`, `Ok`],dangerMode: true})
       if(borrar){
         setCargas({main:false,guardar:true});
          let res = await APICALLER.deleteImage({table:"productos_images",path:id,token:token_user,idImage:idImage});
         if(res.response==="ok"){
           swal({text:"Eliminado correctamente",timer:1200,icon:"success"});
          }else{
            console.log(res);
          }
          let ima = [...listaImagenes];
          let index = ima.findIndex(e=> e.id_productos_image === id)
          ima.splice(index, 1);
          setListaImagenes(ima);
       }
       setCargas({main:false,guardar:false});
     }


    const sendForm = useCallback(async(e)=>{
        e.preventDefault(); let f = {...formulario}
        
        if(f.codigo_producto==='') {
          setTabValue(0); 
          setSnack({open:true,severity:"warning",mensaje:"Rellene el código",id:"codigo_producto",send:false});
          return false;
        }
        if(f.nombre_producto==='') {
          setTabValue(0);
          inputNombre?.current?.focus(); 
          setSnack({open:true,severity:"warning",mensaje:"Rellene el nombre del producto",id:"nombre_producto",send:false});
          return false;
        }
        if(f.id_categoria_producto==="" || f.id_impuesto_producto==="" ||
        f.id_marca_producto==="" ||
        f.id_proveedor_producto==="" ||
        f.id_unidad_medida_producto===""){
          setTabValue(0); 
          setSnack({open:true,severity:"warning",mensaje:"Rellene todos los campos",id:"3",send:false});
          return false;
        }
        if(snack.send===false){
          return false;
        }
        setCargas({main:false,guardar:true});
        
        let res = await APICALLER.update({table:'productos',data:formulario,id:id,token:token_user});
          
          if(images.length>0){
            let portada ="1";
            images.forEach(async(e)=>{
              let data = {id_image_producto:id,image_name:e.name,portada_imagen_producto:portada}
              APICALLER.uploadImage({table:"productos_images",file:e,data,token:token_user,path:id});
              portada = "0";
            })
          }
          if(res.response==="ok"){
            swal({text:"Actualizado correctamente",icon:'success',timer:2000}).then(()=>{
              Funciones.goto(`productos?p=${page}`);
            });
            setCargas({main:false,guardar:false});
            
          }
        
    },[token_user,formulario,id,images,snack,page]);

    const setearListas = lista=>{
      setListas(lista);
      localStorage.setItem("dataProductos", JSON.stringify(lista));
    }

    const traerDatos = useCallback(async()=>{
    
      
      let re = await Promise.all([APICALLER.get({table:'productos_images',where:`id_image_producto,=,${id}`}),APICALLER.get({table: `productos`,where: `id_producto,=,${id}`,
      fields: `id_producto,id_unidad_medida_producto,codigo_producto,nombre_producto,descripcion_producto,id_categoria_producto,id_proveedor_producto,notificar_producto,
      costo_producto,precio_producto,preciom_producto,id_impuesto_producto,tipo_producto,minimo_producto,id_marca_producto,porcentaje_comision,disponible_producto`
      })])

     
      if(re[1].response==='ok'){ 
        let sto = localStorage.getItem("dataProductos");
        if(sto===null){
          let va = await Promise.all([
            APICALLER.getPromise({table: `categorias`,fields: `id_categoria,nombre_categoria,id_padre_categoria`,sort:'-nombre_categoria'}),
            APICALLER.getPromise({table: "proveedors",fields: "id_proveedor,nombre_proveedor"}),
            APICALLER.getPromise({table: `marcas`,fields: `id_marca,nombre_marca`}),
            APICALLER.getPromise({table: `unidad_medidas`}),
            APICALLER.getPromise({table: `impuestos`}),
             APICALLER.getPromise({table: `depositos`,sort:"-id_deposito"}) 
        ]);
            let list = {categorias:va[0].results,proveedores:va[1].results,marcas:va[2].results,medidas:va[3].results,impuestos:va[4].results}
            setearListas(list) 
        }
        
        setListaImagenes(re[0].results);
        setFormulario(re[1].results[0]);
        setCode(re[1].results[0].codigo_producto);
        setCargas({main:false,imagen:false,guardar:false});
      }else{
        navigate("/productos");
      }
  },[id,navigate]);

    useEffect(() => {
        let isActive = true;
        const ca = new AbortController()
        if(isActive){traerDatos();}
        return () => {isActive = false; ca.abort(); };
    }, [traerDatos]);
    return (
      <ProductFormEditContexto.Provider value={{eliminarImagen,change,sendForm,changeCheck,verificarProducto,images,setImages,imagesURL,setImagesURL,cargas,inputCodigo,inputNombre,listas,listaImagenes,formulario,setFormulario,tabValue,setTabValue,snack,setSnack }}>
        {props.children}
      </ProductFormEditContexto.Provider>
    )
  }
  
  export const useProductFormEdit = ()=>{
      const {eliminarImagen,change,sendForm,changeCheck,verificarProducto,images,setImages,imagesURL,setImagesURL,cargas,inputCodigo,inputNombre,listas,listaImagenes,formulario,setFormulario,tabValue,setTabValue,snack,setSnack} = useContext(ProductFormEditContexto);
      return {eliminarImagen,change,sendForm,changeCheck,verificarProducto,images,setImages,imagesURL,setImagesURL,cargas,
        inputCodigo,inputNombre,listas,listaImagenes,formulario,setFormulario,tabValue,setTabValue,snack,setSnack}
  }
  
  export default ProductFormEditProvider
