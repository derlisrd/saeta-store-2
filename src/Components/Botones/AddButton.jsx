import { Button,Icon } from "@mui/material";

function AddButton({onClick, ...rest}) {
    return ( <Button variant="contained" {...rest} onClick={onClick} endIcon={<Icon>add</Icon>}>Agregar</Button> );
}

export default AddButton;