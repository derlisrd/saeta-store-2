import { Button, Icon, IconButton, Stack } from "@mui/material";
import Tablas from "../../../Components/UI/Tablas"
import { useLang } from "../../../Contexts/LangProvider";
import { useFormasPago } from "./FormasPagoProvider"


const ListaFormasPago = () => {
    const {lista,setDialogs,dialogs,cargas,setFormEdit} = useFormasPago();
    const {lang} = useLang()
  const columns=[
        {
            field: "id_facturas_formas_pago",
            title: "ID"
        },
        {
          field: "descripcion_forma_pago",
          title: "Descripcion"
      },
      {
        field: "porcentaje_descuento_pago",
        title: "Porcentaje descuento"
      }
    ]
    const showEditar = (f)=>{
      setFormEdit(f)
      setDialogs({...dialogs,editar:true})
    }

    const Acciones = ({rowProps})=>(
      <Stack direction="row" justifyContent='center' spacing={2}>
        <IconButton
      onClick={() => { showEditar(rowProps);}}
      >
        <Icon>edit</Icon>
      </IconButton>
      </Stack>
    )

    const Inputs = (<Button variant="contained" onClick={()=>{setDialogs({...dialogs,agregar:true})}}>{lang.agregar}</Button>)



  return (
    <Tablas 
        title={lang.formas_de_pago}
        inputs={Inputs}
        loading={cargas.lista}
        subtitle={lang.formas_de_pago}
        datas={lista}
        icon={{ name:"account_balance_wallet" }}
        columns={columns}
        Accions={Acciones}
        showOptions
    />
  )
}

export default ListaFormasPago
