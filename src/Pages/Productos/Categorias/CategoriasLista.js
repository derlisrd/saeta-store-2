import Tablas from "../../../Components/UI/Tablas";
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
import { useCategorias } from "./CategoriasProvider";
import { useState } from "react";

const CategoriasLista = () => {
  const {
    listas,lang,
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
      title: lang.id,
    },
    {
      field: "nombre_categoria",
      title: lang.nombre,
    },
    {
      field: "tipo_categoria",
      title: lang.tipo_categoria,
      compareField: "tipo_categoria",
      items:{
        "1": lang.articulo,
        "2": lang.servicio
      },
      styleItemCondition: "tipo_categoria",
      styleCondition: {
        "1": {
          backgroundColor: "#06c",
          padding: "6px",fontWeight:"bold",
          borderRadius: "5px",
          color: "#fff",
        },
        "2": {
          backgroundColor: "#2dec76",
          padding: "6px", fontWeight:"bold",
          borderRadius: "5px",
          color: "#007b02",
        },
      }
    },
    {
      field: "id_padre_categoria",
      title: lang.padre,
      items: item,
      compareField: "id_padre_categoria",
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
        label={lang.buscar}
      />
      <Tooltip title={lang.agregar} arrow>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
          }}
        >
          {lang.agregar}
        </Button>
      </Tooltip>
      </Stack>
  );

  const Acciones = ({ rowProps}) => (
      <Stack direction="row" spacing={1} justifyContent="center">
        <Fab
          variant="round"
          color="primary"
          size="small"
          onClick={() => {
            
          }}
        >
          <Icon>edit</Icon>
        </Fab>
        <Fab
          variant="round"
          color="secondary"
          size="small"
          onClick={() => {
            borrarRegistro();
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
<>
      <Tablas
        title={lang.categorias}
        subtitle={lang.lista_categorias}
        icon={{ name:"category" }}
        columns={columns}
        datas={FilterData}
        loading={cargando}
        inputs={search}
        lang={lang}
        Accions={Acciones}
        showOptions
        />
      <Stack spacing={2} justifyContent="center" direction="row" >
        {page > 0 && (
          <Button onClick={atras} variant="outlined">
           {lang.atras}
          </Button>
        )}
        {countTotal > page && page + limite < countTotal && (
          <Button variant="outlined" onClick={siguiente}>
            {lang.siguiente}
          </Button>
        )}
      </Stack>
        </>
  );
};

export default CategoriasLista;
