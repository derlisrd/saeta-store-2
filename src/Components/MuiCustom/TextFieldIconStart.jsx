import { Icon, InputAdornment, TextField } from "@mui/material";

export function TextFieldIconStart({ icon, ...rest }) {
  return (
    <TextField
      {...rest}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Icon color="primary">{icon}</Icon>
          </InputAdornment>
        ),
      }}
    />
  );
}
