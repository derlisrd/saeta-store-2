import { useState } from "react";
import Tablas from "../../../Components/UI/Tablas";
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
  const { lista, cargando, setFormulario, setOpenDialog, borrarRegistro,lang } = useProveedores();

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
      title: lang.doc,
    },
    {
      field: "nombre_proveedor",
      title: lang.nombre,
    },
    {
      field: "telefono_proveedor",
      title: lang.contacto,
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
        label={lang.buscar}
        value={inputSearch}
      />
      <Tooltip title={lang.agregar_nuevo} arrow>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            setOpenDialog(true);
          }}
        >
          {lang.agregar}
        </Button>
      </Tooltip>
    </Stack>
  );
  return (
    <>
      <Tablas
        loading={cargando}
        inputs={search}
        title={lang.proveedores}
        subtitle={lang.lista_proveedores}
        columns={columns}
        datas={FilterData}
        Accions={Acciones}
        icon={{ name:"local_shipping" }}
        showOptions
      />
      <div></div>
    </>
  );
};

export default ProveedoresLista;
