import React, {createContext,useContext,useState,useEffect,useCallback} from "react";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";
import { APICALLER } from "../../../../Services/api";
import { useLogin } from "../../../../Contexts/LoginProvider";
import { useLang } from "../../../../Contexts/LangProvider";


const ProductosContext = createContext();

const ProductosProvider = ({ children }) => {

  const {lang} = useLang()
  const { userData } = useLogin(); const {token_user,permisos} = userData;
  const location = useLocation();
  
  const q = location.search ? new URLSearchParams(location.search) : 0;
  const [page, setPage] = useState(q && q.get("p") && !isNaN(q.get("p")) ? parseInt(q.get("p")) : 0);

  const [showOptions,setShowOptions] = useState(false);

  const initialStock = {codigo_producto:"",nombre_producto:"",listaStock:[],medida:"" }
  const [formStock,setFormStock] = useState(initialStock)
  const initialDialogs = {
    detalles:false,
    code:false,
    imagen:false,
    stock:false
  }
  const [dialogs,setDialogs] = useState(initialDialogs);
  
  const [formDetalles,setFormDetalles] = useState({});
  const [limite, setLimite] = useState(30);
  const [idDeposito,setIdDeposito] = useState("");
  const [countTotal, setCountTotal] = useState(0);
  const [cargando, setCargando] = useState({lista:true,stock:true});
  const [listaCategorias, setListaCategorias] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [lista, setLista] = useState({
    productos:[],
    depositos:[]
  });

  
  const borrarRegistro = async(id, nombre) => {
    let e = await swal({icon: "warning",title: lang.q_borrar,text: `${lang.borrar} ${nombre}?`,buttons: [lang.cancelar, lang.ok],dangerMode: true});
      if (e) {
        const res = await APICALLER.delete({table: `productos`,id: id,token: token_user});
        if (res.response ) {
          Promise.all([
            APICALLER.delete({table: `productos_images`,namecolumns:"id_image_producto",ids:id,token: token_user}),
            APICALLER.delete({table: `productos_depositos`,namecolumns:"id_producto_deposito",ids:id,token: token_user})
          ])
          swal({icon:"success",text:lang.borrado_correctamente, timer:1200})
          let array = [...lista];
          let index = array.findIndex(e => e.id_producto === id);
          array.splice(index, 1);
          setLista(array);
        } else {
          console.log(res);
        }
      }
    
  };

  const getStock = async(producto)=>{
    setCargando({...cargando,stock:true});
    let id = producto.id_producto;
    let res = await APICALLER.get({table:"productos_depositos",include:"depositos",on:"id_deposito,id_deposito_deposito",where:`id_producto_deposito,=,${id}`})
    if(res.response){
      setFormStock({medida:producto.descripcion_medida,codigo_producto:producto.codigo_producto,nombre_producto:producto.nombre_producto,listaStock:res.results});
    }
    setCargando({...cargando,stock:false});
  }

  const getPermisos = useCallback(()=>{
    const ID_MODIFICAR_PRODUCTOS = "9"
    if ( !permisos.some(item => item.id_permiso_permiso === ID_MODIFICAR_PRODUCTOS)) {
      setShowOptions(false)
    }else{ setShowOptions(true)}
  },[permisos]);
  

  const buscarRegistro = async () => {
    setCargando({lista:true,stock:true});
    let res = await APICALLER.get({
      table: "productos",
      include: "categorias,unidad_medidas",
      on:"id_categoria_producto,id_categoria,id_unidad_medida_producto,id_unidad_medida",
      fields:"id_producto,nombre_producto,nombre_categoria,codigo_producto,precio_producto,costo_producto,preciom_producto,descripcion_medida,tipo_producto",
      filtersField:"nombre_producto,codigo_producto",
      filtersSearch:`${inputSearch}`,
      pagenumber: "0",
      pagesize: limite,
      sort:"-nombre_producto"
    });
    if (res.found > 0 && res.response ) {
      setLista({...lista,productos:res.results});
    } else {
      console.log(res);
    }
    setCargando({lista:false,stock:true});
  };


  const getLista = useCallback(async () => {
    setCargando({lista:true,stock:true});

    let data = {};

    if(idDeposito===''){
      data = {
      table: "productos",
      include: "categorias,unidad_medidas",
      on:"id_categoria_producto,id_categoria,id_unidad_medida_producto,id_unidad_medida",
      fields:"id_producto,nombre_producto,nombre_categoria,codigo_producto,precio_producto,costo_producto,preciom_producto,descripcion_medida,tipo_producto",
      pagenumber: page,
      pagesize: limite,
      sort:"-id_producto" }
    }else{
      data = {table: "productos",
      include: "categorias,unidad_medidas,productos_depositos",
      on:"id_categoria_producto,id_categoria,id_unidad_medida_producto,id_unidad_medida,id_producto_deposito,id_producto",
      fields:"id_producto,nombre_producto,nombre_categoria,codigo_producto,precio_producto,costo_producto,preciom_producto,descripcion_medida,tipo_producto",
      where:`id_deposito_deposito,=,${idDeposito}`,
      pagenumber: page,
      pagesize: limite,
      sort:"-id_producto", }
    }

    const res = await Promise.all([APICALLER.get(data),APICALLER.get({table:"depositos",where:"tipo_deposito,=,1"})]);

     if (res[1].response  && res[0].response) {
      setCountTotal(res[0].total);
      setLista({productos:res[0].results,depositos:res[1].results}); 
    } else {
      console.log(res);
    } 
    setCargando({lista:false,stock:true});
  }, [limite, page,idDeposito]);



  useEffect(() => {
    let isActive = true;
    const ca = new AbortController();
    if (isActive) {
      getLista();
      getPermisos();
    }
    return () => {
      isActive = false;ca.abort();
    };
  }, [getLista, getPermisos]);

  return (
    <ProductosContext.Provider
      value={{
        lang,idDeposito,setIdDeposito,
        cargando,
        setCargando,
        showOptions,
        inputSearch,
        setInputSearch,
        lista,
        setLista,
        page,
        setPage,
        limite,
        setLimite,
        buscarRegistro,
        borrarRegistro,
        listaCategorias,
        setListaCategorias,
        countTotal,
        setCountTotal,
        dialogs,setDialogs,
        getStock,formStock,formDetalles,setFormDetalles
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
};

export const useProductos = () => {
  const { lang,idDeposito,setIdDeposito,
    cargando,
    setCargando,
    showOptions,
    inputSearch,
    setInputSearch,
    lista,
    setLista,
    page,
    setPage,
    limite,
    setLimite,
    buscarRegistro,
    borrarRegistro,
    listaCategorias,
    setListaCategorias,
    countTotal,
    setCountTotal,
    dialogs,setDialogs,
    getStock,formStock,formDetalles,setFormDetalles
  } = useContext(ProductosContext);

  return {
    lang,idDeposito,setIdDeposito,
    cargando,
    setCargando,
    showOptions,
    inputSearch,
    setInputSearch,
    lista,
    setLista,
    page,
    setPage,
    limite,
    setLimite,
    buscarRegistro,
    borrarRegistro,
    listaCategorias,
    setListaCategorias,
    countTotal,
    setCountTotal,
    dialogs,setDialogs,
    getStock,formStock,formDetalles,setFormDetalles
  };
};

export default ProductosProvider;
