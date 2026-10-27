import { Icon, IconButton, InputAdornment, TextField } from "@mui/material";

function Buscar({onClick,onChange,...rest}) {
    return (<TextField
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={onClick}>
                <Icon>search</Icon>
              </IconButton>
            </InputAdornment>
          ),
        }}
        onKeyPress={e=>{if(e.key==='Enter'){onClick() } } }
        onChange={onChange}
        {...rest}
      />  );
}

export default Buscar;