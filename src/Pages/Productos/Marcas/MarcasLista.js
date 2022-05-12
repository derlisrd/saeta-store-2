import Motion from "../../../Componentes/Motion"
import Tablas from "../../../Componentes/Tablas"
import { useMarcas } from "./MarcasProvider"
import {Fab, Icon, TextField, InputAdornment, IconButton, Tooltip, Button, Stack} from '@mui/material'

import { useState } from "react"

const MarcasLista = () => {

    const {lista,cargando,setOpenDialog, setFormulario,formulario,borrarRegistro} = useMarcas()
    

    const [inputSearch, setInputSearch] = useState("")

    const columns = [
        {
          field: "id_marca",
          title: "ID",
        },
        {
          field: "nombre_marca",
          title: "Nombre",
        },
      ];

    const Acciones = ({id,extraprops,filaProps})=>(
        
        <Stack justifyContent="center" spacing={1} direction="row">
        <Fab
          variant="round"
          color="primary"
          size="small"
          onClick={() =>{ setFormulario({...formulario,id_marca:id,nombre_marca: extraprops}); setOpenDialog(true) } }
        >
          <Icon>edit</Icon>
        </Fab>
        <Fab
          variant="round"
          color="secondary"
          size="small"
          onClick={()=>{ borrarRegistro( filaProps.id_marca,filaProps.nombre_marca)}}
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
            variant="outlined"
            label="Buscar"
            value={inputSearch}
          />
          <Tooltip title="AGREGAR NUEVO" arrow >
          <Button  color="primary" variant="outlined"  size="large" 
            onClick={()=>{setOpenDialog(true)}}
          >
            AGREGAR
            </Button>
            </Tooltip>
        </Stack>
      );

      const FilterData = lista.filter(
        (item) => item.nombre_marca.toLowerCase().includes(inputSearch.toLowerCase()) 
      );

  return (
    <Motion>
        <Tablas 
            nombretabla="Marcas"
            icono="branding_watermark"
            bgicono="#3f51b5"
            namecolumnID={`id_marca`}
            columnas={columns}
            filas={FilterData}
            Acciones={Acciones}
            extraprops={"nombre_marca"}
            search={search}
            cargando={cargando}
            showOptions
        />
        
    </Motion>
  )
}

export default MarcasLista
