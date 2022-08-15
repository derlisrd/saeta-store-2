import { Alert } from "@mui/material";

export function AlertError({children}){
    return (
        <Alert icon={false} severity="error" >
            {children}
        </Alert>
    )
}