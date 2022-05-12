import { useProductos } from "./ProductosProvider";

import { Button, Stack } from "@mui/material";

const ProductosListaPager = () => {
  const { page, setPage, limite, countTotal,cargando } = useProductos();

  const siguiente = () => {
    let i = parseInt(page) + parseInt(limite);
    setPage(i);
  };
  const atras = () => {
    if (page > 0) {
      let i = parseInt(page) - parseInt(limite);
      setPage(i);
    }
  };
  if(cargando){
    return <></>
  }

  return (
    
    <Stack direction="row" justifyContent="center" spacing={2} >
        {page>0 &&(<Button 
        onClick={atras}
        variant="outlined" >
          Atrás
        </Button>)}
        {
          ((countTotal>page) && ((page+limite)<countTotal) ) &&      
        <Button variant="outlined" 
        onClick={siguiente} >
          Siguiente
          </Button>
        }
      </Stack>
  );
};

export default ProductosListaPager;
