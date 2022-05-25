import Tablas from "../../../Componentes/Tablas";
import {
  Icon,
  Fab,
  Tooltip,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Stack,
} from "@mui/material";
import Motion from "../../../Componentes/Motion";
import { useCategorias } from "./CategoriasProvider";
import { useState } from "react";
import { Funciones } from "../../../Funciones/Funciones";

const CategoriasLista = () => {
  const {
    listas,
    cargando,
    buscarRegistro,
    borrarRegistro,
    page,
    limite,
    setPage,
    countTotal,
  } = useCategorias();
  const [inputSearch, setInputSearch] = useState("");

  const FilterData = listas.categorias.filter((item) =>
    item.nombre_categoria.toLowerCase().includes(inputSearch.toLowerCase())
  );

  const item = { 0: "Padre" };
  listas.padres.forEach((data) => {
    item[data.id_categoria] = data.nombre_categoria;
  });

  const columns = [
    {
      field: "id_categoria",
      title: "ID",
    },
    {
      field: "nombre_categoria",
      title: "Nombre",
    },
    {
      field: "id_padre_categoria",
      title: "Padre",
      items: item,
      comparaItem: "id_padre_categoria",
      
    },
  ];

  const search = (
    <Stack direction="row" spacing={2}>
      <TextField
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  buscarRegistro(inputSearch);
                }}
              >
                <Icon>search</Icon>
              </IconButton>
            </InputAdornment>
          ),
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            buscarRegistro(inputSearch);
          }
        }}
        onChange={(e) => setInputSearch(e.target.value)}
        variant="outlined"
        label="Buscar"
      />
      <Tooltip title="AGREGAR NUEVO" arrow>
        <Button
          color="primary"
          variant="outlined"
          size="large"
          onClick={() => {
            Funciones.goto(`categorias/new`);
          }}
        >
          AGREGAR
        </Button>
      </Tooltip>
      </Stack>
  );

  const Acciones = ({ id, extraprops }) => (
      <Stack direction="row" spacing={1} justifyContent="center">
        <Fab
          variant="round"
          color="primary"
          size="small"
          onClick={() => {
            Funciones.goto(`categorias/new/${id}`);
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
  

  const siguiente = () => {
    let i = parseInt(page) + parseInt(limite);
    setPage(i);
  };
  const atras = () => {
    if (page > 0) {
      let i = parseInt(page) - parseInt(limite);
      setPage(i);
    }
  };

  return (
    <Motion>
      <Tablas
        nombretabla="Categorias"
        icono="category"
        bgicono="#3f51b5"
        namecolumnID={`id_categoria`}
        columnas={columns}
        filas={FilterData}
        Acciones={Acciones}
        extraprops={"nombre_categoria"}
        cargando={cargando}
        search={search}
        showOptions
      />
      <Stack spacing={2} justifyContent="center" direction="row" >
        {page > 0 && (
          <Button onClick={atras} variant="outlined">
            Atrás
          </Button>
        )}
        {countTotal > page && page + limite < countTotal && (
          <Button variant="outlined" onClick={siguiente}>
            Siguiente
          </Button>
        )}
      </Stack>
    </Motion>
  );
};

export default CategoriasLista;
