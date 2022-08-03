import Tablas from "../../../../Components/UI/Tablas";
import { Icon,Tooltip, Button, TextField, InputAdornment, IconButton, Stack,Fab, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useProductos } from "./ProductosProvider";
import ProductosListaPager from "./ProductosListaPager";
import MoreMenu from "./MoreMenu";
import useGoto from "../../../../Hooks/useGoto";

const ProductosLista = () => {
  
  const {inputSearch,idDeposito,setIdDeposito,showOptions,lang,setInputSearch,cargando,lista,buscarRegistro,dialogs,setDialogs,setFormDetalles,setLista} = useProductos();
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
      field:"tipo_producto",
      title:lang.tipo_producto,
      compareField:"tipo_producto",
      items: {
        "2": lang.servicio,
        "1": lang.articulo,
      },
      styleFieldCondition: "tipo_producto",
      styleCondition: {
        "1": {
          backgroundColor: "#ff7c6b",
          padding: "6px",fontWeight:"bold",
          borderRadius: "5px",
          color: "#780c00",
        },
        "2": {
          backgroundColor: "#2dec76",
          padding: "6px", fontWeight:"bold",
          borderRadius: "5px",
          color: "#007b02",
        },
      },
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
      <Stack  direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <FormControl sx={{ width:"240px" }}>
          <InputLabel>{lang.depositos}</InputLabel>
          <Select
            name="id_deposito"
            onChange={(e) => { setIdDeposito(e.target.value)}}
            value={idDeposito}
          >
            <MenuItem value="">{lang.todos}</MenuItem>
            {
              lista.depositos.map((e,i)=>(
                <MenuItem key={i} value={e.id_deposito}>{e.nombre_deposito}</MenuItem>
              ))
            }
              
          </Select>
        </FormControl>
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
          label={lang.buscar}
        />
        <Tooltip title={lang.agregar} arrow >
          <Button  variant="contained" size="large" onClick={()=> go.to('productos/new')}>
            {lang.agregar}
          </Button>
        </Tooltip>
        
      </Stack>
    );

    const FilterData =  lista.productos.filter(item => item.nombre_producto.toLowerCase().includes(inputSearch.toLowerCase())|| item.codigo_producto.toLowerCase().includes(inputSearch.toLowerCase()));

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
      setLista({...lista,productos:FilterData})
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
        setLista({...lista,productos:FilterData})
        }
    }

  return (
    <Stack spacing={2}>
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
    </Stack>
  );
};

export default ProductosLista;