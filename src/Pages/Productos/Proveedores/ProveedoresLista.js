import { useState } from "react";
import Motion from "../../../Componentes/Motion";
import Tablas from "../../../Componentes/Tablas";
import { useProveedores } from "./ProveedoresProvider";
import {
  Fab,
  Icon,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Button,
  Stack,
} from "@mui/material";

const ProveedoresLista = () => {
  const [inputSearch, setInputSearch] = useState("");
  const { lista, cargando, setFormulario, setOpenDialog, borrarRegistro } = useProveedores();

  const Acciones = ({ id, extraprops }) => (
    <Stack direction="row" justifyContent="center" spacing={1}>
      <Fab
        variant="round"
        color="primary"
        size="small"
        onClick={() => {
          let i = lista.findIndex((e) => e.id_proveedor === id);
          setFormulario(lista[i]);
          setOpenDialog(true);
        }}
      >
        <Icon>edit</Icon>
      </Fab>
      <Fab
        variant="round"
        color="secondary"
        size="small"
        onClick={() => {
          borrarRegistro(id, extraprops);
        }}
      >
        <Icon>delete</Icon>
      </Fab>
    </Stack>
  );

  const FilterData = lista.filter((item) =>
    item.nombre_proveedor.toLowerCase().includes(inputSearch.toLowerCase())
  );
  const columns = [
    {
      field: "id_proveedor",
      title: "ID",
    },
    {
      field: "ruc_proveedor",
      title: "Documento",
    },
    {
      field: "nombre_proveedor",
      title: "Nombre",
    },
    {
      field: "telefono_proveedor",
      title: "Contacto",
    },
  ];
  const search = (
    <Stack direction="row" justifyContent="center" spacing={2}>
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
        onKeyPress={(e) => {
          if (e.key === "Enter") {
          }
        }}
        onChange={(e) => {
          setInputSearch(e.target.value);
        }}
        variant="outlined"
        label="Buscar"
        value={inputSearch}
      />
      <Tooltip title="AGREGAR NUEVO" arrow>
        <Button
          color="primary"
          variant="outlined"
          size="large"
          onClick={() => {
            setOpenDialog(true);
          }}
        >
          AGREGAR
        </Button>
      </Tooltip>
    </Stack>
  );
  return (
    <Motion>
      <Tablas
        nombretabla="Proveedores"
        icono="local_shipping"
        bgicono="#3f51b5"
        namecolumnID={`id_proveedor`}
        columnas={columns}
        filas={FilterData}
        Acciones={Acciones}
        extraprops={"nombre_proveedor"}
        search={search}
        cargando={cargando}
        showOptions
      />
      <div></div>
    </Motion>
  );
};

export default ProveedoresLista;
