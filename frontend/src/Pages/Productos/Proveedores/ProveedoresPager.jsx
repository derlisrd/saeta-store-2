import { useProveedores } from "./ProveedoresProvider";
import useGoto from "../../../Hooks/useGoto";
import { Button, Stack } from "@mui/material";

const ProveedoresPager = () => {
  const { page, setPage, limite, countTotal,cargando, lang} = useProveedores();
  const go = useGoto()
  const siguiente = () => {
    let i = parseInt(page) + parseInt(limite);
    setPage(i);
    go.to("proveedores?p="+i)
  };
  const atras = () => {
    if (page > 0) {
      let i = parseInt(page) - parseInt(limite);
      setPage(i);
      go.to("proveedores?p="+i)
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
          {lang.atras}
        </Button>)}
        {
          ((countTotal>page) && ((page+limite)<countTotal) ) &&      
        <Button variant="outlined" 
        onClick={siguiente} >
            {lang.siguiente}
          </Button>
        }
      </Stack>
  );
};

export default ProveedoresPager;

