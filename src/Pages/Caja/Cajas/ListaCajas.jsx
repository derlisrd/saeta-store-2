import {Button,Icon,IconButton,InputAdornment,Stack,TextField,Tooltip} from "@mui/material";

import Tablas from "../../../Components/UI/Tablas";
import { useLogin } from "../../../Contexts/LoginProvider";
import { useCajas } from "./CajasProvider";


const ListaCajas = () => {
  const {userData} = useLogin()
  const {setIdCaja,lista,cargas,dialogs,setDialogs,setFormEdit,setFormAbrir, setDatosCajaCierre,/* setFormTransferencia,formTransferencia, setDatosCajaCierre,setTotalSumaMonedasArqueo,*/lang} = useCajas();
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
  ];

  const abrirEditar = (f) => {
    if(f.id_user_caja === userData.id_user || userData.rol_user==="1")
    {
    setFormEdit({ nombre_caja: f.nombre_caja, id_caja: f.id_caja });
    setDialogs({ ...dialogs, editar: true });
    }
  };

  const abrirApertura = (f) => {
    setFormAbrir(f);
    setDialogs({ ...dialogs, abrir: true });
  };

  const verMontos = (f)=>{
    
    if(f.id_user_caja === userData.id_user || userData.rol_user==="1")
    {
      setIdCaja(f.id_caja)
      setDialogs({ ...dialogs, montos: true });
    }
  }
  /* const abrirTransferencia = (f) => {
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
  }; */

  /* const abrirArqueo = (f) => {
    setDatosCajaCierre(f);
    setDialogs({ ...dialogs, arqueo: true });
    setTotalSumaMonedasArqueo(0);
  }; */


  const cierrecaja = f =>{
    
    if(f.id_user_caja === userData.id_user || userData.rol_user==="1")
    {
      setDatosCajaCierre(f);
      setDialogs({ ...dialogs, cierre: true }); 
    }
  }


  const Acciones = ({ rowProps }) => (
    <Stack spacing={1} direction="row" justifyContent="center">

      <Tooltip arrow title={lang.montos}>
        <IconButton onClick={() => verMontos(rowProps)}>
          <Icon>visibility</Icon>
        </IconButton>
      </Tooltip>
      <Tooltip arrow title={lang.editar}>
        <IconButton onClick={() => abrirEditar(rowProps)}>
          <Icon color="info">edit</Icon>
        </IconButton>
      </Tooltip>
      {rowProps.estado_caja === "open" ? (
        <Tooltip arrow title={lang.cerrar}>
          <IconButton
            onClick={() => {cierrecaja(rowProps);}}
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
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
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
        label={lang.buscar}
      />
      <Button
        variant="contained" /* sx={{ bgcolor:{xs:'primary.main',sm:'secondary.main'} }} */
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
