import {Button,Icon,IconButton,InputAdornment,Stack,TextField,Tooltip} from "@mui/material";
import React from "react";
import swal from "sweetalert";
import Tablas from "../../../Components/UI/Tablas";
import { useCajas } from "./CajasProvider";

const ListaCajas = () => {
  const {
    lista,
    cargas,
    dialogs,
    setDialogs,
    setFormEdit,
    setFormAbrir,
    setFormTransferencia,
    formTransferencia,setDatosCajaCierre,setTotalSumaMonedasArqueo
  } = useCajas();

  const columnas = [
    {
      field: "id_caja",
      title: "ID",
    },
    {
      field: "nombre_caja",
      title: "Nombre de caja",
    },

    {
      field: "estado_caja",
      title: "Estado",
      items: {
        0: "CERRADO",
        1: "ABIERTO",
      },
      comparaItem: "estado_caja",
      styleCondicion: {
        0: {
          backgroundColor: "#dd4632",
          padding: "6px",
          borderRadius: "5px",
          color: "#fff",
        },
        1: {
          backgroundColor: "#00ce4f",
          padding: "6px",
          borderRadius: "5px",
          color: "#fff",
        },
      },
    },
    {
      field: "nombre_user",
      title: "asignado a",
    },
    {
      field: "monto_caja",
      title: "Monto Actual Efectivo",
      isNumber: true,
    },
  ];

  const abrirEditar = (f) => {
    setFormEdit({ nombre_caja: f.nombre_caja, id_caja: f.id_caja });
    setDialogs({ ...dialogs, editar: true });
  };

  const abrirApertura = (f) => {
    let fo = {...f}
    fo.monto_inicial = f.monto_caja;
    setFormAbrir(fo);
    setDialogs({ ...dialogs, abrir: true });
  };

  const abrirTransferencia = (f) => {
    if(f.estado_caja==="0"){
      swal({text:"Una caja cerrada no puede transferir"});
    }
    else{
    setFormTransferencia({
      ...formTransferencia,
      id_caja: f.id_caja,
      nombre_caja: f.nombre_caja,
      monto_caja:f.monto_caja,
      abreviatura_moneda: f.abreviatura_moneda
    });
    setDialogs({ ...dialogs, transferencia: true });
    }
  };

  const abrirArqueo = (f) => {
    
    setDatosCajaCierre(f);
    setDialogs({ ...dialogs, arqueo: true });
    setTotalSumaMonedasArqueo(0);
  };

  const Acciones = ({ filaProps }) => (
    <Stack spacing={1} direction="row" justifyContent="center">
      <Tooltip arrow title="Hacer transferencia">
        <IconButton onClick={() => abrirTransferencia(filaProps)}>
          <Icon color="secondary">flight_takeoff</Icon>
        </IconButton>
      </Tooltip>
      <Tooltip arrow title="Editar">
        <IconButton onClick={() => abrirEditar(filaProps)}>
          <Icon color="info">edit</Icon>
        </IconButton>
      </Tooltip>
      {filaProps.estado_caja === "1" ? (
        <Tooltip arrow title="Cerrar">
          <IconButton
            onClick={() => {
              abrirArqueo(filaProps);
            }}
          >
            <Icon color="error">close</Icon>
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip arrow title="Abrir">
          <IconButton
            onClick={() => {
              abrirApertura(filaProps);
            }}
          >
            <Icon color="primary">open_in_browser</Icon>
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );

  const Search = (
    <Stack spacing={2} direction="row">
      <TextField
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => {}}>
                <Icon>search</Icon>
              </IconButton>
            </InputAdornment>
          ),
        }}
        onKeyPress={(e) => {}}
        onChange={(e) => {}}
        variant="outlined"
        label="Buscar"
      />
      <Button
        color="primary"
        variant="outlined"
        size="large"
        onClick={() => setDialogs({ ...dialogs, nuevo: true })}
      >
        AGREGAR
      </Button>
    </Stack>
  );

  return (
    <Tablas
    title="Cajas" subtitle="Habilitación y apertura de cajas" 
    loading={cargas.lista}
      caption=""
      icono="point_of_sale"
      columns={columnas}
      datas={lista}
      Accions={Acciones}
      inputs={Search}
      showOptions
    />
  );
};

export default ListaCajas;
