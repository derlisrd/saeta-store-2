import {Button,Icon,IconButton,InputAdornment,Stack,TextField,Tooltip} from "@mui/material";
import React from "react";
import swal from "sweetalert";
import Tablas from "../../../Components/UI/Tablas";
import { useCajas } from "./CajasProvider";


const ListaCajas = () => {

  const {lista,cargas,dialogs,setDialogs,setFormEdit,setFormAbrir,setFormTransferencia,formTransferencia,setDatosCajaCierre,setTotalSumaMonedasArqueo,lang} = useCajas();
  const columnas = [
    {
      field: "id_caja",
      title: "ID",
    },
    {
      field: "nombre_caja",
      title: lang.nombre_de_caja,
    },

    {
      field: "estado_caja",
      title: lang.estado,
      compareField:"estado_caja",
      items: {
        "close": lang.cerrado,
        "open": lang.abierto,
      },
      styleFieldCondition: "estado_caja",
      styleCondition: {
        "close": {
          backgroundColor: "#ff7c6b",
          padding: "6px",fontWeight:"bold",
          borderRadius: "5px",
          color: "#780c00",
        },
        "open": {
          backgroundColor: "#2dec76",
          padding: "6px", fontWeight:"bold",
          borderRadius: "5px",
          color: "#007b02",
        },
      },
    },
    
    {
      field: "nombre_user",
      title: lang.asignado_a,
    },
    {
      field: "abreviatura_moneda",
      title: lang.moneda,
    },
    {
      field: "monto_caja",
      title: lang.monto_actual_efectivo,
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

  const Acciones = ({ rowProps }) => (
    <Stack spacing={1} direction="row" justifyContent="center">
      <Tooltip arrow title={lang.hacer_transferencia}>
        <IconButton onClick={() => abrirTransferencia(rowProps)}>
          <Icon color="secondary">flight_takeoff</Icon>
        </IconButton>
      </Tooltip>
      <Tooltip arrow title="Editar">
        <IconButton onClick={() => abrirEditar(rowProps)}>
          <Icon color="info">edit</Icon>
        </IconButton>
      </Tooltip>
      {rowProps.estado_caja === "open" ? (
        <Tooltip arrow title={lang.cerrar}>
          <IconButton
            onClick={() => {
              abrirArqueo(rowProps);
            }}
          >
            <Icon color="error">close</Icon>
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip arrow title={lang.abrir}>
          <IconButton
            onClick={() => {
              abrirApertura(rowProps);
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
        label={lang.buscar}
      />
      <Button
        variant="contained"
        size="large"
        onClick={() => setDialogs({ ...dialogs, nuevo: true })}
      >
        {lang.agregar}
      </Button>
    </Stack>
  );

  return (
    <Tablas
    title={lang.cajas} subtitle={lang.habilitacion_y_apertura_de_cajas} 
    loading={cargas.lista}
      caption={lang.lista_de_cajas}
      icon={{ name:"point_of_sale" }}
      columns={columnas}
      datas={lista}
      Accions={Acciones}
      inputs={Search}
      lang={lang}
      showOptions
    />
  );
};

export default ListaCajas;
