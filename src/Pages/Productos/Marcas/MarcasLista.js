
import Tablas from "../../../Components/UI/Tablas"
import { useMarcas } from "./MarcasProvider"
import {Fab, Icon, TextField, InputAdornment, IconButton, Tooltip, Button, Stack} from '@mui/material'

import { useState } from "react"

const MarcasLista = () => {

    const {lista,cargando,setOpenDialog, setFormulario,formulario,borrarRegistro,lang} = useMarcas()
    

    const [inputSearch, setInputSearch] = useState("")

    const columns = [
        {
          field: "id_marca",
          title: lang.id,
        },
        {
          field: "nombre_marca",
          title: lang.nombre,
        },
      ];

    const Acciones = ({rowProps})=>(
        
        <Stack justifyContent="center" spacing={1} direction="row">
        <Fab
          variant="round"
          color="primary"
          size="small"
          onClick={() =>{ setFormulario({...formulario,id_marca:rowProps.id_marca,nombre_marca: rowProps.nombre_marca}); setOpenDialog(true) } }
        >
          <Icon>edit</Icon>
        </Fab>
        <Fab
          variant="round"
          color="secondary"
          size="small"
          onClick={()=>{ borrarRegistro( rowProps.id_marca,rowProps.nombre_marca)}}
        >
          <Icon>delete</Icon>
        </Fab>
      </Stack>

    )

    const search = (
        <Stack direction="row" spacing={2}>
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <Icon>search</Icon>
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onKeyPress={e=>{if(e.key==='Enter'){  } } }
            onChange={(e) => {setInputSearch(e.target.value)}}
            label={lang.buscar}
            value={inputSearch}
          />
          <Tooltip title={lang.agregar_nuevo} arrow >
          <Button variant="contained"  size="large" 
            onClick={()=>{setOpenDialog(true)}}
          >
            {lang.agregar}
            </Button>
            </Tooltip>
        </Stack>
      );

      const FilterData = lista.filter(
        (item) => item.nombre_marca.toLowerCase().includes(inputSearch.toLowerCase()) 
      );

  return (
    <>
        <Tablas 
            title={lang.marcas}
            subtitle={lang.lista_marcas}
            icon={{ name:"branding_watermark" }}
            columns={columns}
            lang={lang}
            datas={FilterData}
            Accions={Acciones}
            inputs={search}
            loading={cargando}
            showOptions
        />
        
    </>
  )
}

export default MarcasLista
