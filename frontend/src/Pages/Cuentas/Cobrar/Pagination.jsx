import { Button, Stack } from "@mui/material";
import { useCobrar } from "./CobrarProvider";
import useGoto from "../../../Hooks/useGoto";


function Pagination() {
    const {to} = useGoto()
    const {currentPage,pagination,setCurrentPage} = useCobrar()
    const anterior = currentPage - pagination.size;
    const siguiente = currentPage + pagination.size;

    
    const change = (size)=>{
        to(`cuentas/cobrar?p=${size}`)
        setCurrentPage(size)
    }
    

    return ( <Stack direction="row" spacing={2} marginY={3} width="100%" justifyContent="center" >
        {
            currentPage > 0 && <Button onClick={()=>{change(anterior)}} variant="outlined">Anterior</Button>
        }
        {
            pagination.total > (currentPage + pagination.size) && <Button onClick={()=>{change(siguiente)}} variant="outlined">Siguiente</Button>
        }
    </Stack> );
}

export default Pagination;