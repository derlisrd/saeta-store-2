

import { useState } from "react";
import {Alert,Button,Icon,Tooltip,CircularProgress,Snackbar,TextField,Stack} from "@mui/material";
import Tablas from "../../../Components/UI/Tablas";
import { green } from "@mui/material/colors";
import { useEntregas } from "./EntregasProvider";
import { useLogin } from "../../../Contexts/LoginProvider";
import { APICALLER } from "../../../Services/api";

const EntregasView = () => {


  const [cargandoCheck, setCargandoCheck] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const { lista, setLista, tipoFactura,listaPendientes,setListaPendientes,lang } = useEntregas();
  const { userData } = useLogin();
  const {token_user} = userData
  const FilterData = [...lista];

  if (lista.length < 1) {
    return <Alert icon={<Icon>mood_bad</Icon>}>No hay facturas</Alert>;
  }

  let infoFactura = tipoFactura === "0" ? "RECIBO" : "FACTURA";
  let INFO = `${infoFactura}: ${lista[0].nro_factura}  -  CLIENTE: ${lista[0].nombre_cliente}  - DOC: ${lista[0].ruc_cliente}`;

  const columnas = [
    {
      field: "codigo_producto",
      title: "CODIGO",
    },
    {
      field: "nombre_producto",
      title: "PRODUCTO",
    },
    {
      field: "entregado_item",
      title: "Entregado",
      items: { 0: "No", 1: "ENTREGADO" },
      comparaItem: "entregado_item",
    },
    {
      field: "cantidad_producto",
      title: "CANTIDAD",
      style:{backgroundColor:"#a7c74591",padding:"2px 5px",borderRadius:"5px",cursor:"pointer",fontWeight:"bolder",} 
    },
  ];

  const closeSnack = () => {
    setOpenSnack(false);
  };

  const Chequear = async (fila) => {
    setCargandoCheck(true);
    setOpenSnack(true);
    let arr = [...lista];
    let arrP = [...listaPendientes]
    //nuevo stock actualizado
    let id_producto = fila.id_producto;
    let nuevo_stock_producto = parseFloat(fila.stock_producto) - parseFloat(fila.cantidad_producto);
    
    
    let index = arr.findIndex(e => e.id_producto === id_producto);
    let id = fila.id_facturas_item;
    let indexP = arrP.findIndex(e=> e.id_producto === id_producto);

    let res = await Promise.all([APICALLER.update({token:token_user,table:'facturas_items',id,data: { entregado_item: "1" }}),
    APICALLER.update({token:token_user,table:'productos',data:{stock_producto: nuevo_stock_producto},id:id_producto})])
    
    if (res[0].response  && res[1].response ) {
      setCargandoCheck(false);
      arrP.splice(indexP,1);
      arr.splice(index, 1);
      setLista(arr);
      setListaPendientes(arrP);
    }
  };

  const Acciones = ({ filaProps }) => (
    <Stack direction="row" spacing={2}>
      <TextField label="Codigo" />
      {cargandoCheck ? (
        <CircularProgress size={18} />
      ) : (
        <Tooltip title="Chequear" arrow>
          <Button
            color="primary"
            variant="outlined"
            startIcon={<Icon style={{ color: green[500] }}>check_circle</Icon>}
            onClick={() => {
              Chequear(filaProps);
            }}
          >
            Chequear
          </Button>
        </Tooltip>
      )}
    </Stack>
  );

  return (
    <>
      <Snackbar
        open={openSnack}
        autoHideDuration={1500}
        onClose={closeSnack}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Alert onClose={closeSnack} severity="success">
          {lang.producto_chequeado}
        </Alert>
      </Snackbar>

      <Tablas
        columns={columnas}
        datas={FilterData}
        icon={{ name:"receipt" }}
        title={INFO}
        subtitle="Verifique bien los productos para entregar, y presione el botón de check"
        Accions={Acciones}
        showOptions
      />
    </>
  );
};

export default EntregasView;
