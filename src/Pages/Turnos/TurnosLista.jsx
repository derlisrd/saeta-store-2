import { Button, Stack} from '@mui/material'
import React from 'react'
import Tablas from '../../Components/UI/Tablas'
import { useTurnos } from './TurnosProvider'

const TurnosLista = () => {

    const {lista,cargando,setCargando,dialogs,setDialogs,setForm,initialForm,getServiciosEdit} = useTurnos();
    
    const FilterData = lista;
    const columnas = [
        {
          field:"id_turno",
          title:"#",
        },
        {
          field:"nombre_cliente",
          title:"Cliente",
        },
        {
          field:"nombre_empleado",
          title:"Atendido por:",
        },
        {
            field:"fecha_turno",
            title:"Fecha",
          },
          {
            field:"horario_turno",
            title:"Horario",
          },
        {
            field:'estado_turno',
            title:'Estado',
            items: {0:'EN ESPERA',1:'ATENDIDO',2:'FINALIZADO'},
            comparaItem: "estado_turno",
            styleCondicion:{
                0:{backgroundColor:"#dd4632",padding:"6px",borderRadius:"5px",color:'#fff'},
                1:{backgroundColor:"#00ce4f",padding:"6px",borderRadius:"5px",color:'#fff'},
                2:{backgroundColor:"#0082ce",padding:"6px",borderRadius:"5px",color:'#fff'},
            },
        }
    ];

    const openNew = ()=>{
        setForm(initialForm)
        setDialogs({...dialogs,agregar:true});
        setCargando({...cargando,servicios:false})
    }

    const openEdit = (f)=>{
        getServiciosEdit(f);
        setDialogs({...dialogs,editar:true});
    }


    const Acciones = ({filaProps})=>
        (<Stack direction="row" spacing={1} >
          <Button variant="outlined" onClick={()=>{console.log(filaProps)}} >Ver detalles</Button>
        <Button variant="outlined" onClick={()=>{openEdit(filaProps)}} >Cambiar estado</Button>
        </Stack>)

    const Search = (
        <Button variant="outlined" color="primary" size="large" onClick={openNew} >Agregar</Button>)
        
        return (
          <Tablas 
              title="Turnos"
              subtitle='Modulo de turnos'
              
              loading={cargando.lista}
              icon={{ name:"login" }}
              columns={columnas}
              datas={FilterData}
              Accions={Acciones}
              inputs={Search}
          />
        )
}

export default TurnosLista
