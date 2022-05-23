import { Button, Fab,InputAdornment, Icon, IconButton, Stack, TextField,Avatar } from '@mui/material';
import Tablas from '../../Components/UI/Tablas/'
import { useLang } from '../../Contexts/LangProvider';
import { useUsers } from './UsersProvider';

const UsersLista = () => {

  const {lista,cargas} = useUsers()
  const {lang} = useLang();
  const columnas = [
    {
    field: "id_user",
    title: "ID",
    },
    {
      title:"Avatar",
      html: (<Avatar sx={{ bgcolor:"#06f" }}><Icon>person</Icon></Avatar>)
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

const Inputs = (    <Stack spacing={2} direction="row">
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
  variant="outlined"
  label={lang.buscar}
/>
<Button
  variant="outlined"
  size="large"
  onClick={() => {}}
>
  {lang.agregar}
</Button>
</Stack>)
const Accions = ({rowProps})=>(
  <Stack spacing={1}  direction="row">
    <Fab size="small" variant="round" 
        onClick={() => { console.log(rowProps)}}
      >
        <Icon>manage_accounts</Icon>
      </Fab>
      <Fab size="small" color="warning" onClick={()=>{

      }}>
        <Icon>key</Icon>
      </Fab>
      <Fab
        size="small"
        color="primary"
        variant="round"
        onClick={() => {

        }}
      >
        <Icon>edit</Icon>
      </Fab>
      <Fab
        size="small"
        color="secondary"
        variant="round"
        onClick={() => {

        }}
      >
        <Icon>delete</Icon>
      </Fab>
  </Stack>
)

  return (
    <>
      <Tablas title={lang.usuarios}
      icon={{ name:"people",color:"#06c" }} 
      showOptions Accions={Accions} 
      subtitle={lang.lista_de_usuarios}
      lang={lang} 
      loading={cargas.lista} 
      columns={columnas} 
      inputs={Inputs} 
      datas={lista} />
    </>
  )
}

export default UsersLista
