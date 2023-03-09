import { Button, Fab,InputAdornment, Icon, IconButton, Stack, TextField, Avatar } from '@mui/material';
import LoadingCenter from '../../Components/UI/LoadingCenter';
import Tablas from '../../Components/UI/Tablas/'
import { useUsers } from './UsersProvider';

const UsersLista = () => {

  const {lista,cargas,lang,deleteUser,setDialogs,dialogs,setearForm} = useUsers()

  const columnas = [
     {
      title:"Avatar",
      html: (<Avatar sx={{ bgcolor:"primary.main" }}><Icon>person</Icon></Avatar>)
    },
    {
      field: "username_user",
      title: lang.usuario,
    },
    {
      field: "nombre_user",
      title: lang.nombre,
    },
]

const Inputs = (<Stack spacing={2} direction="row">
<TextField
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={() => {}}>
          <Icon>search</Icon>
        </IconButton>
      </InputAdornment>
    ),
  }}
  onKeyPress={(e) => {}}
  onChange={(e) => {}}
  label={lang.buscar}
/>
<Button
  variant="contained"
  size="large"
  onClick={() => {setDialogs({...dialogs,new:true})}}
>
  {lang.agregar}
</Button>
</Stack>)
const Accions = ({rowProps})=>(
  <Stack spacing={1}  direction="row" justifyContent="center">
    <Fab size="small" variant="round" onClick={() => { setearForm(rowProps,"permissions")}}>
        <Icon>manage_accounts</Icon>
      </Fab>
      <Fab size="small" color="warning" onClick={()=>{setearForm(rowProps,"pass")}}>
        <Icon>key</Icon>
      </Fab>
      <Fab size="small" color="primary" variant="round" onClick={() => {setearForm(rowProps,"edit") }}>
        <Icon>edit</Icon>
      </Fab>
      <Fab size="small" color="secondary" variant="round"onClick={() => { deleteUser(rowProps)}}>
        <Icon>delete</Icon>
      </Fab>
  </Stack>
)

  if(cargas.all){
   return <LoadingCenter />
  }

  return (
    <>
      <Tablas title={lang.usuarios}
      icon={{ name:"people" }} 
      showOptions Accions={Accions} 
      subtitle={lang.lista_de_usuarios}
      lang={lang} 
      loading={cargas.lista} 
      columns={columnas} 
      inputs={Inputs} 
      datas={lista.users} />
    </>
  )
}

export default UsersLista
