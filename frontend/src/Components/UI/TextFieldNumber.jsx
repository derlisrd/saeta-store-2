import { TextField } from "@mui/material";
import NumberFormatCustom from "../thirty/NumberFormatCustom";

function TextFieldNumber({...rest}) {
    return ( <TextField 
        {...rest}
        InputProps={{

        inputProps: { min: 0 },
        inputComponent: NumberFormatCustom,
      }} /> );
}

export default TextFieldNumber;