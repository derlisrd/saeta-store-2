import {Tablas} from "../../../../Components";
import { Icon,Tooltip, Button, TextField, InputAdornment, IconButton, Stack,Fab } from "@mui/material";
import { useProductos } from "./ProductosProvider";
import ProductosListaPager from "./ProductosListaPager";
import { Funciones } from "../../../../Funciones/Funciones";
import { useLanguage } from "../../../../Contextos/Language";

import MoreMenu from "./MoreMenu";




const ProductosLista = () => {
  const {lang} = useLanguage();
  const {inputSearch,showOptions,setInputSearch,cargando,lista,buscarRegistro,dialogs,setDialogs,setFormDetalles} = useProductos();
  //const navigate = useNavigate();
  const columns = [

    {
      field: "codigo_producto",
      title: "Codigo",
    },
    {
      field: "nombre_producto",
      title: "Nombre",
      //sort:true
    },
     /* {
      field:"url_imagen",
      title:"Imagen",
      img:true,
      align:"center"
    },   */
    {
      field: "nombre_categoria",
      title: lang.Categoría,
      style:{backgroundColor:"#3f51b591",padding:"2px",borderRadius:"5px",cursor:"pointer"},
      styleCondicion:"",
      NoPrint:true 
    },
    {
      field: "precio_producto",
      title: "Precio",
      isNumber:true,
    },
    /* {
      field: "porcentaje_impuesto",
      title: "IVA",
      extraitem:"%"
    }, */
    /* {
      field:"stock_producto",
      title:"Stock",
      isNumber:true,
    } */
  ];


 
  const openPhoto = f => { setDialogs({...dialogs,imagen:true}); setFormDetalles(f); }
  const Acciones = ({filaProps})=>
  (<Stack direction="row" spacing={1} justifyContent="center">
    <Fab onClick={()=> {openPhoto(filaProps)}}  size="small">
        <Icon color="error">image</Icon>
      </Fab>
    <MoreMenu openPhoto={openPhoto} filaProps={filaProps} />
    </Stack>)

    
    const search = (
      <Stack direction="row" spacing={2}>
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={()=>{buscarRegistro()}}>
                  <Icon>search</Icon>
                </IconButton>
              </InputAdornment>
            ),
          }}
          onKeyPress={e=>{if(e.key==='Enter'){buscarRegistro() } } }
          onChange={(e) => setInputSearch(e.target.value)}
          variant="outlined"
          label="Buscar"
        />
        <Tooltip title="AGREGAR NUEVO" arrow >
        <Button color="primary" variant="outlined" size="large" 
          onClick={()=> Funciones.goto(`productos/new`)}
        >
          AGREGAR
          </Button>
          </Tooltip>
      </Stack>
    );

    const FilterData =  lista.filter(
      (item) => item.nombre_producto.toLowerCase().includes(inputSearch.toLowerCase()) 
      || item.codigo_producto.toLowerCase().includes(inputSearch.toLowerCase())
    );

  return (
    <>
        <Tablas
          nombretabla="Productos - Servicios"
          subtitle="En el módulo PRODUCTOS podrá agregar nuevos productos al sistema, actualizar datos de los productos, eliminar o actualizar la imagen de los productos, imprimir códigos de barras de cada producto, buscar productos en el sistema, ver todos los productos en almacén, ver los productos más vendido y filtrar productos por categoría."
          icono="inventory"
          bgicono="#3f51b5"
          namecolumnID="id_producto"
          columnas={columns}
          filas={FilterData}
          Acciones={Acciones}
          extraprops={"nombre_producto"}
          search={search}
          cargando={cargando.lista}
          option={lang.Opciones}
          showOptions={showOptions}
          print
          exportExcel
        />

        <ProductosListaPager />



      
    </>
  );
};

export default ProductosLista;