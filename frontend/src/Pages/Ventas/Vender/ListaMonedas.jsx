import { FormControlLabel, Radio } from "@mui/material";
import React from "react";
import { useVentas } from "./VentasProvider";

const ListaMonedas = () => {
  const { datosFacturas, changeMonedas,indexFactura } = useVentas();
  const da = {...datosFacturas.facturas[indexFactura]}
  return (
    <>
      {datosFacturas.listaMonedas.map((e, i) => (
        <FormControlLabel
          key={i}
          value={e.id_moneda}
          name="listaMonedas"
          onChange={() => {
            changeMonedas(e);
          }}
          label={e.abreviatura_moneda}
          labelPlacement="end"
          control={<Radio checked={da.datosMoneda.id_moneda === e.id_moneda} />}
        />
      ))}
    </>
  );
};

export default ListaMonedas;
