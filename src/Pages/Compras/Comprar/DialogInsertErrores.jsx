import { Alert } from "@mui/material"

function DialogInsertErrores({errores}){

    
    return (
        errores.active && <Alert icon={false} severity="error">{errores.msj}</Alert>
    )
}

export default DialogInsertErrores