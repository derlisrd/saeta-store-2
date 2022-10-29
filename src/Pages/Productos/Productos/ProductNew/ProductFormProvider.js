import React,{createContext,useContext,useCallback,useState,useEffect,useRef} from 'react'
import { useLocation } from 'react-router-dom';
import { APICALLER } from '../../../../Services/api';
import {useLogin} from "../../../../Contexts/LoginProvider";
import { useLang } from '../../../../Contexts/LangProvider';

const ProductFormContexto = createContext();
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
const ProductFormProvider = (props) => {


    let query = useQuery();
    const CODIGO = query.get("codigo") || ""; 
    const {lang} = useLang()
    const storage = JSON.parse(localStorage.getItem("dataProductos"));
    const initialDialogs = {categorias: false,proveedores:false,marcas:false,depositos:false,unidades:false}
    const [dialogs,setDialogs] = useState(initialDialogs);
    const {userData} = useLogin();
    const { token_user } = userData;
    const [tabValue,setTabValue] = useState(0);
    const initialCargas = {main:true,imagen:false,guardar:false,verificarCodigo:false}
    const [cargas,setCargas] = useState(initialCargas);
    const initialSnack = {open:false,mensaje:"",severity:"success",id:""}
    const [snack,setSnack]= useState(initialSnack);
    const [enviado,setEnviado] = useState(false)
    const inputCodigo = useRef(null);
    const cantidadRef = useRef(null);
    const inputNombre = useRef(null);
    const initialForm = {
        id_categoria_producto: "",
        id_proveedor_producto: "",
        id_marca_producto: "",
        id_impuesto_producto: "",
        id_unidad_medida_producto: "",
        id_deposito_producto: "",
        codigo_producto: CODIGO,//CODIGO_PRODUCTO_COMPRA,
        nombre_producto: "",
        descripcion_producto:"",
        costo_producto: "0",
        precio_producto: "0",
        preciom_producto: "0",
        minimo_producto: "0",
        porcentaje_comision: "0",
        stock_producto: "0",
        notificar_producto: "0",
        tipo_producto: "1",
        disponible_producto:"1",
        preguntar_precio:"0"
      };
    const initialStock = []
    const [stock,setStock] = useState(initialStock);
    const [formulario, setFormulario] = useState(initialForm);
    const [images,setImages] = useState([]);
    const [imagesURL,setImagesURL] = useState([]);
    const initialListas = {
        medidas: storage?.medidas || [],
        categorias:storage?.categorias || [],
        marcas: storage?.marcas || [],
        proveedores:storage?.proveedores || [],
        impuestos:storage?.impuestos || [],
        depositos: storage?.depositos || [],
    }
    const [listas,setListas] = useState(initialListas);
    
    const generateCode = ()=>{
      let code = Math.random().toString(36).slice(2);
      setFormulario({...formulario,codigo_producto:code});
      inputNombre.current.focus();
    }
    const change = e=>{ 
      const {name,value} = e.target; 
      let newForm = {...formulario};
      if(name === 'tipo_producto' && value !== newForm.tipo_producto){
        newForm.id_categoria_producto = ""
      }
      newForm[name] = value;
      
      setFormulario(newForm);
    }
    const changeCheck = (e) => {const { checked, name } = e.target; 
        setFormulario({ ...formulario, [name]: checked ? "1" : "0" });
    };
    const sendForm = async(e) =>{
        setEnviado(true);
        e.preventDefault(); let f = {...formulario}
        if(f.codigo_producto==='') {
          setTabValue(0); 
          setSnack({open:true,severity:"warning",mensaje:"Rellene el código",id:"codigo_producto"});
          return false;
        }
        if(f.nombre_producto==='') {
          setTabValue(0);
          setSnack({open:true,severity:"warning",mensaje:"Rellene el nombre del producto",id:"nombre_producto"});
          inputNombre?.current?.focus(); 
          return false;
        }
        if(f.id_categoria_producto==="" || f.id_impuesto_producto==="" || f.id_marca_producto==="" ||
        f.id_proveedor_producto==="" || f.id_unidad_medida_producto===""){
          setTabValue(0); 
          setSnack({open:true,severity:"warning",mensaje:"Rellene todos los campos",id:"3"});
          return false;
        }
         setCargas({...cargas,guardar:true});
         delete f.stock_producto; delete f.id_deposito_producto;
        let res = await APICALLER.insert({table: "productos",data: f,token: token_user});
        if (res.response ) {
          
            if(images.length>0){
              let portada ="1";
              images.forEach(e=>{
                let data = {id_image_producto:res.last_id,image_name:e.name,portada_imagen_producto:portada}
                APICALLER.uploadImage({table:"productos_images",file:e,data,token:token_user,path:res.last_id});
                portada = "0";
              })
            }
            if(f.tipo_producto==="1"){
              stock.forEach(e=>{
                let data = {id_producto_deposito: res.last_id, id_deposito_deposito:e.id_deposito_deposito,stock_producto_deposito: e.stock_producto_deposito}
                APICALLER.insert({table:"productos_depositos",token:token_user,data})
              })
            }
            
            setSnack({open:true,mensaje:"Guardado correctamente",severity:"success"});
            reiniciarTodo();
        }else{
          console.log(res);
        }
        

    }

    const borrarStock = e =>{
        let lista = [...stock];
        lista.splice(e, 1);
        setStock(lista);
        cantidadRef?.current?.focus();
    }

    const cargarStock = ()=>{
      let f = {...formulario};
      let lista = [...stock];
      if(f.id_deposito_producto===""){
        setSnack({open:true,mensaje:"Elija correctamente el deposito",severity:"error"});
        return false;
      }
      let found = lista.findIndex(e=> e.id_deposito_deposito === f.id_deposito_producto);
      let cant;
      if(found>=0){
        cant = parseFloat(lista[found].stock_producto_deposito) + parseFloat(f.stock_producto);
        lista[found].stock_producto_deposito = cant;
      }else{
        cant = parseFloat(f.stock_producto);
        let id_deposito_deposito = f.id_deposito_producto;
        let i = listas.depositos.findIndex(e=> e.id_deposito === id_deposito_deposito);
        let nombre = listas.depositos[i].nombre_deposito;
        lista.push({id_deposito_deposito,stock_producto_deposito:cant,nombre})
      }
      f.id_deposito_producto="";
      f.stock_producto = "0";
      setFormulario(f);
      setStock(lista);
      cantidadRef.current?.focus();
    }
    
    const reiniciarTodo = ()=>{
        localStorage.removeItem("facturasStorage");
        setTabValue(0);
        setStock([]);
        setFormulario(initialForm);
        setImages([]);
        setImagesURL([]);
        setCargas({main:false,imagen:false,guardar:false,verificarCodigo:false});
        inputCodigo?.current?.focus();
    }

    const verificarProducto = async (e) => {
        const valorCodigo = e.target.value;
        if(valorCodigo==="") return false;
        setSnack({open:false,mensaje:"",severity:"error"})
        setCargas({...cargas,verificarCodigo:true});
        if (valorCodigo !== "") {
          
          const res = await APICALLER.get({table: "productos",where: `codigo_producto,=,'${valorCodigo}'`});

          if(res.response){
            setCargas({...cargas,verificarCodigo:false});
          }
          if (res.found > 0) {
            setSnack({open:true,mensaje:"Ese código de producto o servicio ya existe.",severity:"error",id:"codigo_producto"});
            setTabValue(0);
            inputCodigo.current?.focus();
          } else {

            setSnack({open:false,mensaje:"",severity:"error"})
          }
        }
        
      };
    
    const setearListas = lista=>{
      setListas(lista);
      localStorage.setItem("dataProductos", JSON.stringify(lista));
    }

    const traerDatos = useCallback(async()=>{
      let sto = localStorage.getItem("dataProductos");
      if(sto===null){

          let va = await Promise.all([
            APICALLER.get({table: `categorias`,fields: `id_categoria,nombre_categoria,id_padre_categoria,tipo_categoria`,sort:'-nombre_categoria'}),
            APICALLER.get({table: "proveedors",fields: "id_proveedor,nombre_proveedor"}),
            APICALLER.get({table: `marcas`,fields: `id_marca,nombre_marca`}),
            APICALLER.get({table: `unidad_medidas`}),
            APICALLER.get({table: `impuestos`}),
            APICALLER.get({table: `depositos`,sort:"-id_deposito",where:'tipo_deposito,=,1'})
        ])
          let list = {categorias:va[0].results,proveedores:va[1].results,marcas:va[2].results,medidas:va[3].results,impuestos:va[4].results,depositos:va[5].results}
          setearListas(list)
      }
      setCargas({main:false,imagen:false,guardar:false,verificarCodigo:false});
        
    },[]);
    
    useEffect(() => {
        let isActive = true;
        const ca = new AbortController()
        if(isActive){traerDatos();}
        return () => {isActive = false; ca.abort(); };
    }, [traerDatos]);

  return (
    <ProductFormContexto.Provider 
    value={{lang,token_user,cargas,listas,setearListas,tabValue,setTabValue,formulario,setFormulario,change,sendForm,inputCodigo,inputNombre,setImagesURL,imagesURL,generateCode,
    snack,setSnack,verificarProducto,changeCheck,reiniciarTodo,images,setImages,dialogs,setDialogs,enviado,stock,setStock,cargarStock,borrarStock}}>
        {props.children}
    </ProductFormContexto.Provider>
  )
}
export const useProductForm = ()=>{
    const {lang,token_user,cargas,listas,setearListas,tabValue,setTabValue,formulario,setFormulario,change,sendForm,inputCodigo,inputNombre,setImagesURL,imagesURL,generateCode,
      snack,setSnack,verificarProducto,changeCheck,reiniciarTodo,images,setImages,dialogs,setDialogs,enviado,stock,setStock,cargarStock,borrarStock} = useContext(ProductFormContexto);
    return {lang,token_user,cargas,listas,setearListas,tabValue,setTabValue,formulario,setFormulario,change,sendForm,inputCodigo,inputNombre,snack,setImagesURL,imagesURL,generateCode,
      setSnack,verificarProducto,changeCheck,reiniciarTodo,images,setImages,dialogs,setDialogs,enviado,stock,setStock,cargarStock,borrarStock}
}
export default ProductFormProvider
