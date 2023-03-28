import { Button, Icon, IconButton, InputAdornment, Stack, TextField, Tooltip } from '@mui/material'
import swal from 'sweetalert'
import Tablas from '../../Components/UI/Tablas'
import { useLogin } from '../../Contexts/LoginProvider'
import { APICALLER } from '../../Services/api'
import { useEmpleados } from './EmpleadosProvider'

const EmpleadosLista = () => {

  const {listas,dialogs,setDialogs,setForm,loading,lang,getLista} = useEmpleados()
  const {userData} = useLogin()

const columnas = [
    {
      field:"id_empleado",
      title:"#",
    },
    {
      field:"apellido_empleado",
      title:lang.apellido
    },
    {
        field:"nombre_empleado",
        title:lang.nombre
    },
    {
        field:"doc_empleado",
        title:lang.doc
    }
];

const open = (f)=>{
  setForm(f);
  setDialogs({...dialogs,agregar:true});
}

const borrar = async (f)=>{
  
  let pregunta = await swal({ title:lang.q_borrar, text: lang.empleado,icon: "warning",buttons: [lang.cancelar, lang.borrar]});
  
  if(pregunta){
    let res = await APICALLER.delete({table:'empleados',token:userData.token_user,id:f.id_empleado})
    if(res.response){
      swal({icon:'success',timer:2000,text:lang.borrado_correctamente});
      getLista()
    }
  }
   
}

const buscarRegistro = ()=>{

}

const Acciones = ({rowProps})=>
  (<Stack direction="row" spacing={1} justifyContent="center" >
  <IconButton onClick={()=>open(rowProps)}>
    <Icon>edit</Icon>
  </IconButton>
    <IconButton onClick={()=>{borrar(rowProps)}}>
    <Icon>delete</Icon>
  </IconButton>
  </Stack>)


    const search = (
      <Stack direction="row" spacing={2}>
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={()=>{buscarRegistro()}}>
                  <Icon>search</Icon>
                </IconButton>
              </InputAdornment>
            ),
          }}
          onKeyPress={e=>{if(e.key==='Enter'){buscarRegistro() } } }
          onChange={(e) => console(e.target.value)}
          label={lang.buscar}
        />
        <Tooltip title={lang.agregar} arrow >
          <Button variant="contained" onClick={()=>{ setDialogs({agregar:true})}}>{lang.agregar}</Button>
        </Tooltip>
      </Stack>
  );

  return (
    <Tablas 
        inputs={search}
        title={lang.empleados}
        subtitle={lang.lista_empleados}
        loading={loading}
        icon={{ name:"badge" }}
        columns={columnas}
        datas={listas.empleados}
        Accions={Acciones}
        showOptions
    />
  )
}

export default EmpleadosLista
