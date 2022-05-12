import { Fab, Grid, Icon, Stack, TextField } from '@mui/material';
import Tablas from '../../Components/UI/Tablas/'
import { useUsers } from './UsersProvider';

const UsersLista = () => {

  const {lista,cargas} = useUsers()

  const columnas = [
    {
    field: "id_user",
    title: "ID",
    },
    {
      field: "username_user",
      title: "Usuario",
    },
    {
      field: "nombre_user",
      title: "Nombre",
    },
]

const Inputs = (<Grid container spacing={2}><Grid item><TextField label="Buscar" /></Grid></Grid>)
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
      <Tablas title="Usuarios" showOptions Accions={Accions} subtitle="Lista de usuarios" loading={cargas.lista} columns={columnas} inputs={Inputs} datas={lista} />
    </>
  )
}

export default UsersLista
