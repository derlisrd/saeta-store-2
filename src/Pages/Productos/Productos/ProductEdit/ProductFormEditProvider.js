import React,{createContext,useContext,useCallback,useState,useEffect,useRef} from 'react'
import { /* useLocation, */ useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { APICALLER } from '../../../../Services/api';
import { useLogin } from '../../../../Contexts/LoginProvider';
import { useLang } from '../../../../Contexts/LangProvider';
import useGoto from '../../../../Hooks/useGoto';

const ProductFormEditContexto = createContext();
const ProductFormEditProvider = (props) => {
    const {lang} = useLang()
    const {id} = useParams();
    /* const {state} = useLocation();
    const page = state?.page || 0; */
    const navigate = useGoto();
    const {userData} = useLogin();
    const { token_user } = userData;
    const [tabValue,setTabValue] = useState(0);
    const initialSnack = {open:false,severity:"success",mensaje:"",id_code:"",send:false}
    const [snack,setSnack] = useState(initialSnack);
    const initialCargas = {main:true,guardar:false}
    const [exists,setExists] = useState(true)
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
        preguntar_precio:"0",
        stock_producto: "0",
        notificar_producto: "",
        tipo_producto: "1",
        disponible_producto:"1"
      };
      const [formulario, setFormulario] = useState(initialForm);
    const [code,setCode] = useState(null);
    const [images,setImages] = useState([]); 
    const [imagesURL,setImagesURL] = useState([]);
    
    const change = e=>{ 
      const {name,value} = e.target; 

      setFormulario({...formulario,[name]:value});
  }

    const changeCheck = (e) => {
        const { checked, name } = e.target; 
        setFormulario({ ...formulario, [name]: checked ? "1" : "0" });
    };


    const verificarProducto = useCallback(async()=>{
      
      setSnack({open:false,id_code:"",mensaje:"",severity:"success",send:true});
      if(code===formulario.codigo_producto) return false;
      let res = await APICALLER.get({table: `productos`,where: `codigo_producto,=,'${formulario.codigo_producto}'`,fields: `id_producto`});
  
      if (res.response ) {
        if (res.found > 0) {
          if(res.results[0].id_producto === id){
            setSnack({open:false,id_code:"",mensaje:"",severity:"success",send:true});
          }else{
            setSnack({open:true,mensaje:lang.codigo_existe,severity:"warning",id_code:"codigo_producto",send:false});
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
    },[formulario,id,code,lang]);



    const eliminarImagen = async(idImage)=>{
      let borrar = await swal({icon: "warning",text:lang.q_desea_borrar_imagen,buttons: [`Cancelar`, `Ok`],dangerMode: true})
       if(borrar){
         setCargas({main:false,guardar:true});
          let res = await APICALLER.deleteImage({table:"productos_images",path:id,token:token_user,idImage:idImage});
         if(res.response){
           swal({text:lang.borrado_correctamente,timer:1200,icon:"success"});
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
          setSnack({open:true,severity:"warning",mensaje:lang.rellene_codigo,id:"codigo_producto",send:false});
          return false;
        }
        if(f.nombre_producto==='') {
          setTabValue(0);
          inputNombre?.current?.focus(); 
          setSnack({open:true,severity:"warning",mensaje:lang.rellene_nombre,id:"nombre_producto",send:false});
          return false;
        }
        if(f.id_categoria_producto==="" || f.id_impuesto_producto==="" ||
        f.id_marca_producto==="" ||
        f.id_proveedor_producto==="" ||
        f.id_unidad_medida_producto===""){
          setTabValue(0); 
          setSnack({open:true,severity:"warning",mensaje:lang.rellene_campos,id:"3",send:false});
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
          if(res.response){
            swal({text:"Actualizado correctamente",icon:'success',timer:2000}).then(()=>{
              navigate.to(`productos`);
            });
            setCargas({main:false,guardar:false});
            
          }
        
    },[token_user,formulario,id,images,snack,lang,navigate]);

    const setearListas = lista=>{
      setListas(lista);
      localStorage.setItem("dataProductos", JSON.stringify(lista));
    }

    const traerDatos = useCallback(async()=>{
    
      
      let re = await Promise.all([
        APICALLER.get({table:'productos_images',where:`id_image_producto,=,${id}`}),
        APICALLER.get({table: `productos`,where: `id_producto,=,${id}`,
        fields: `id_producto,id_unidad_medida_producto,codigo_producto,nombre_producto,descripcion_producto,id_categoria_producto,id_proveedor_producto,notificar_producto,
        costo_producto,precio_producto,preciom_producto,id_impuesto_producto,tipo_producto,minimo_producto,id_marca_producto,porcentaje_comision,disponible_producto,preguntar_precio`
        })
      ])

     
      if(re[1].response && re[1].found>0){ 
        let sto = localStorage.getItem("dataProductos");
        if(sto===null){
          let va = await Promise.all([
            APICALLER.get({table: `categorias`,fields: `id_categoria,nombre_categoria,id_padre_categoria,tipo_categoria`,sort:'-nombre_categoria'}),
            APICALLER.get({table: "proveedors",fields: "id_proveedor,nombre_proveedor"}),
            APICALLER.get({table: `marcas`,fields: `id_marca,nombre_marca`}),
            APICALLER.get({table: `unidad_medidas`}),
            APICALLER.get({table: `impuestos`}),
             APICALLER.get({table: `depositos`,sort:"-id_deposito"}) 
        ]);
            let list = {categorias:va[0].results,proveedores:va[1].results,marcas:va[2].results,medidas:va[3].results,impuestos:va[4].results}
            setearListas(list) 
        }
        
        setListaImagenes(re[0].results);
        setFormulario(re[1].results[0]);
        setCode(re[1].results[0].codigo_producto);
        setCargas({main:false,imagen:false,guardar:false});
      }
      else{
        setFormulario({});
        setCargas({main:false,imagen:false,guardar:false});
        setExists(false)
      }
  },[id]);

    useEffect(() => {
        let isActive = true;
        const ca = new AbortController()
        if(isActive){traerDatos();}
        return () => {isActive = false; ca.abort(); };
    }, [traerDatos]);
    return (
      <ProductFormEditContexto.Provider value={{exists,lang,eliminarImagen,change,sendForm,changeCheck,verificarProducto,images,setImages,imagesURL,setImagesURL,cargas,inputCodigo,inputNombre,listas,listaImagenes,formulario,setFormulario,tabValue,setTabValue,snack,setSnack }}>
        {props.children}
      </ProductFormEditContexto.Provider>
    )
  }
  
  export const useProductFormEdit = ()=>{
      const {exists,lang,eliminarImagen,change,sendForm,changeCheck,verificarProducto,images,setImages,imagesURL,setImagesURL,cargas,inputCodigo,inputNombre,listas,listaImagenes,formulario,setFormulario,tabValue,setTabValue,snack,setSnack} = useContext(ProductFormEditContexto);
      return {exists,lang,eliminarImagen,change,sendForm,changeCheck,verificarProducto,images,setImages,imagesURL,setImagesURL,cargas,
        inputCodigo,inputNombre,listas,listaImagenes,formulario,setFormulario,tabValue,setTabValue,snack,setSnack}
  }
  
  export default ProductFormEditProvider
