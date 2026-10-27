import { useCuentas } from "../CuentasProvider"
import { Stack, IconButton,Icon,Tooltip} from '@mui/material'

const AccionesPago = ({ rowProps }) => {

    const {dialogs,setDialogs,setformPagar,lang} = useCuentas()

    const openPago = (form)=>{
        setDialogs({...dialogs,pagar:true})
        setformPagar(form)
    }

  return(<Stack spacing={2} direction="row">
      
    <Tooltip title={lang.detalles}>
    <IconButton onClick={() => console.log(rowProps)} variant="outlined">
      <Icon>info</Icon>
    </IconButton>
    </Tooltip>
    <Tooltip title={lang.pagar}>
    <IconButton onClick={() => openPago(rowProps)} variant="outlined">
      <Icon>local_atm</Icon>
    </IconButton>
    </Tooltip>
    </Stack>
  );
}

export default AccionesPago