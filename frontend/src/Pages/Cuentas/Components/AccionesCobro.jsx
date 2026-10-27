import useGoto from "../../../Hooks/useGoto"
import { useCuentas } from "../CuentasProvider"
import { Stack, IconButton,Icon,Tooltip} from '@mui/material'

const AccionesCobro = ({ rowProps }) => {
    const {to} = useGoto()

    const {dialogs,setDialogs,setformCobrar,lang} = useCuentas()
    const navegar = (e)=>{
        to('cuentas/'+e.id_cliente)
    }
    const open = (form) => {
        setformCobrar(form);
        setDialogs({ ...dialogs, cobrar: true }); 
      };
      const detalles = (f)=>{
        setformCobrar(f);
        setDialogs({ ...dialogs, detalles: true }); 
      }
  return(<Stack spacing={1} direction="row">

    <Tooltip title={lang.ver}>
    <IconButton onClick={() => navegar(rowProps)}>
      <Icon>visibility</Icon>
    </IconButton>
    </Tooltip>

    <Tooltip title={lang.detalles}>
    <IconButton onClick={() => detalles(rowProps)}>
      <Icon color="primary">info</Icon>
    </IconButton>
    </Tooltip>
    <Tooltip title={lang.cobrar}>
    <IconButton onClick={() => open(rowProps)}>
      <Icon color="warning">local_atm</Icon>
    </IconButton>
    </Tooltip>
    </Stack>
  );
}

export default AccionesCobro