import { Button, Icon, IconButton, InputAdornment, Stack, TextField, Tooltip } from '@mui/material'
import Tablas from '../../Components/UI/Tablas'
import { useEmpleados } from './EmpleadosProvider'

const EmpleadosLista = () => {

  const {lista,dialogs,setDialogs,setForm,loading,lang} = useEmpleados()


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


const buscarRegistro = ()=>{

}

const Acciones = ({rowProps})=>
  (<Stack direction="row" spacing={1} justifyContent="center" >
  <IconButton onClick={()=>open(rowProps)}>
    <Icon>edit</Icon>
  </IconButton>
    <IconButton onClick={()=>{}}>
    <Icon>visibility</Icon>
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
        datas={lista}
        Accions={Acciones}
        showOptions
    />
  )
}

export default EmpleadosLista
