import { Button, Icon, IconButton, InputAdornment, Stack, TextField, Tooltip } from '@mui/material';
import Tablas from '../../../Components/UI/Tablas'
import { useDepositos } from './DepositosProvider'
import MoreMenu from './MoreMenu';



const DepositosLista = () => {

  
  const {lista,cargando,borrar,setForm,setDialogs,dialogs,lang} = useDepositos()
  const columnas = [
      {
        field:"id_deposito",
        title:"#",
      },
      {
        field:"nombre_deposito",
        title:lang.nombre,
      },
  ]

  const inputSearch="";
  const FilterData =  lista.filter(i => i.nombre_deposito.toLowerCase().includes(inputSearch.toLowerCase()) );


  const abrir = fila=>{
    setForm(fila);
    setDialogs({ ...dialogs, editar: true });
  }




  const search = (
    <Stack direction="row" spacing={2}>
      <TextField
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={()=>{ }}>
                <Icon>search</Icon>
              </IconButton>
            </InputAdornment>
          ),
        }}
        onKeyPress={e=>{if(e.key==='Enter'){ } } }
        onChange={(e) => console.log(e.target.value)}
        label={lang.buscar}
      />
      <Tooltip title={lang.agregar} arrow >
      <Button  variant="contained" size="large" 
        onClick={()=>{setDialogs({...dialogs,editar:true}); setForm({id_deposito:"",nombre_deposito:""} )}}
      >
        {lang.agregar}
        </Button>
        </Tooltip>
    </Stack>
  );


  

  const Acciones = ({rowProps})=>(<MoreMenu  borrar={borrar} abrir={abrir} filaProps={rowProps} />)
  
  return (
    <Tablas 
        title={lang.depositos}
        subtitle={lang.lista_depositos}
        inputs={search}
        loading={cargando}
        icon={{ name:"local_convenience_store" }}
        columns={columnas}
        datas={FilterData}
        Accions={Acciones}
        showOptions
    />
  )
}

export default DepositosLista
