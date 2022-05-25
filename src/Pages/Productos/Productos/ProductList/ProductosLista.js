import Tablas from "../../../../Components/UI/Tablas";
import { Icon,Tooltip, Button, TextField, InputAdornment, IconButton, Stack,Fab } from "@mui/material";
import { useProductos } from "./ProductosProvider";
import ProductosListaPager from "./ProductosListaPager";
import MoreMenu from "./MoreMenu";
import useGoto from "../../../../Hooks/useGoto";

const ProductosLista = () => {
  
  const {inputSearch,showOptions,lang,setInputSearch,cargando,lista,buscarRegistro,dialogs,setDialogs,setFormDetalles,setLista} = useProductos();
  const go = useGoto();
  const columns = [

    {
      field: "codigo_producto",
      title: lang.codigo,
    },
    {
      field: "nombre_producto",
      title: lang.nombre,
      align:"center",
    },
    
    {
      field: "nombre_categoria",
      title: lang.categoria,
      style:{backgroundColor:"#b9ddff",padding:"4px",borderRadius:"6px",fontWeight:"bold",color:"#1976d2"},
      NoPrint:true 
    },
    {
      field: "precio_producto",
      title: lang.precio,
      isNumber:true,
      style:{fontWeight:"bold"},
      before:"$ "
    },

  ];


 
  const openPhoto = f => { setDialogs({...dialogs,imagen:true}); setFormDetalles(f); }
  const Acciones = ({rowProps})=>
  (<Stack direction="row" spacing={1} justifyContent="center">
    <Fab onClick={()=> {openPhoto(rowProps)}}  size="small">
        <Icon color="error">image</Icon>
      </Fab>
    <MoreMenu openPhoto={openPhoto} rowData={rowProps} />
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
          label={lang.buscar}
        />
        <Tooltip title={lang.agregar} arrow >
        <Button color="primary" variant="contained" endIcon={<Icon>add</Icon>} size="large" 
          onClick={()=> go.to('productos/new')}
        >
          {lang.agregar}
          </Button>
          </Tooltip>
      </Stack>
    );

    const FilterData =  lista.filter(item => item.nombre_producto.toLowerCase().includes(inputSearch.toLowerCase()) 
      || item.codigo_producto.toLowerCase().includes(inputSearch.toLowerCase())
    );

    const sort = {
        desc : (col)=>{
          
        FilterData.sort((a, b) => {
          let fa = a[col].toLowerCase(),
        fb = b[col].toLowerCase();
      
          if (fa < fb) {
              return -1;
          }
          if (fa > fb) {
              return 1;
          }
          return 0;
      });
      setLista(FilterData)
        },
        asc : (col)=>{
          FilterData.sort((a, b) => {
            let fb = a[col].toLowerCase(),
          fa = b[col].toLowerCase();
        
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });
        setLista(FilterData)
        }
    }

  return (
    <>
        <Tablas
          title={lang.productos}
          Accions={Acciones}
          subtitle={lang.lista_productos}
          loading={cargando.lista}
          datas={FilterData}
          columns={columns}
          lang={lang}
          icon={{ name:"inventory" }}
          showOptions={showOptions}
          inputs={search}
          sort={sort}
          />

        <ProductosListaPager />



      
    </>
  );
};

export default ProductosLista;