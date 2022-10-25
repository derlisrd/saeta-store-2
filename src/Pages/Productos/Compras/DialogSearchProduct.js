import { Dialog, DialogContent, TextField, Button, DialogActions, DialogTitle,Autocomplete,CircularProgress,Zoom } from '@mui/material'
import { useCompras } from './ComprasProvider'
import { APICALLER } from "../../../Services/api";
import React,{useState,useCallback} from 'react'

const DialogSearchProduct = () => {


    const {setDialogs,dialogs,InsertarProductoTabla,idDeposito,lang} = useCompras()
    const [listaBuscaProducto, setListaBuscaProducto] = useState([])
    const [load,setLoad] = useState(false)
    // buscador con con input text field



  const buscarProductos = useCallback(async (e) => {
        
    let txt = e.target.value;
    if(txt!==""){
      setLoad(true)
      setTimeout(async() => {
        let res = await APICALLER.get({
          table: "productos",include:"proveedors,impuestos,unidad_medidas,productos_depositos",
          on: "id_impuesto_producto,id_impuesto,id_proveedor_producto,id_proveedor,id_unidad_medida_producto,id_unidad_medida,id_producto,id_productos_deposito",
          fields:"id_producto,codigo_producto,nombre_producto,tipo_producto,nombre_proveedor,ruc_proveedor,porcentaje_impuesto,id_producto,costo_producto,preciom_producto,precio_producto,descripcion_medida,id_productos_deposito",
          where:`tipo_producto,=,1,and,id_deposito_deposito,=,${idDeposito}`,
          filtersField:"nombre_producto",filtersSearch:txt,
          pagesize:"10"
        });
        (res.response) ?  setListaBuscaProducto(res.results) : console.log(res) 
      }, 500);

    }else{
      setListaBuscaProducto([])
    }
    setLoad(false)
  },[idDeposito])


  const insertaProducto = (e, value) => {
    //let txtcodigo = value.codigo_producto;
    //inputBuscaCodigo.current.value = txtcodigo;
    cerrar()
    InsertarProductoTabla(value)
  };

    const cerrar = ()=>{
        setDialogs({...dialogs,buscar:false})
    }

  return (
    <Dialog fullWidth open={dialogs.buscar} onClose={cerrar} TransitionComponent={Zoom} >    
        <DialogTitle>
            {lang.buscar}
        </DialogTitle>
        <DialogContent dividers>
        <Autocomplete
              loadingText="Cargando..."
              loading={load}
              noOptionsText="Sin productos en lista..."
              onChange={insertaProducto}
              disableClearable
              autoComplete
              autoHighlight
              autoSelect
              options={listaBuscaProducto}
              getOptionLabel={(option) => option.nombre_producto+" - "+option.codigo_producto }
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  autoFocus
                  label="Buscar producto"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {load ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                  onChange={buscarProductos}
                  fullWidth
                  placeholder="Escriba el nombre del producto"
                  variant="outlined"
                />
              )}
            />
        </DialogContent>
        <DialogActions>
        <Button onClick={cerrar} variant="outlined" >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogSearchProduct
