import { IconButton, Stack,Icon } from "@mui/material";
import { useEmpleados } from "./EmpleadosProvider";

function Opciones({rowProps}) {
   
    const {setFormSelect,llaveDialog} = useEmpleados()

    
    const open = (form,metodo)=>{
        setFormSelect(form)
        llaveDialog(metodo,true)
    }


    return (
    <Stack direction="row"> 
        <IconButton onClick={()=>{open(rowProps,'edit')}}><Icon color="info">mode_edit</Icon></IconButton>
        <IconButton onClick={()=>{open(rowProps,'delete')}}><Icon color='error' >delete_outline</Icon> </IconButton>
    </Stack>
    )
}

export default Opciones ;