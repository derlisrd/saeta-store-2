import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import esES  from 'date-fns/locale/es';

export function DatePickerCustom({label,value,onChange,...rest}) {


  
  return (
    <LocalizationProvider adapterLocale={esES}  dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={value}
        mask="__/__/____"
        onChange={onChange}
        {...rest}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
