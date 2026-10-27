import "dayjs/locale/es-mx";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

export function DatePickerCustom({ label, value, onChange, ...rest }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-mx">
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        {...rest}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
