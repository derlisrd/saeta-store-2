import { Icon, IconButton, InputAdornment,  Stack,  TextField, Tooltip } from "@mui/material";
import Tablas from "../../../Components/UI/Tablas";
import { useLang } from "../../../Contexts/LangProvider";
import { funciones } from "../../../Functions";
import { useCobrar } from "./CobrarProvider";
import { useState } from "react";
import { useDatosEmpresa } from "../../../Contexts/DatosEmpresaProvider";

import useGoto from "../../../Hooks/useGoto";
import Pagination from "./Pagination";

function ListaCobrar() {
    const {to} = useGoto()
    const {MONEDA_PRINCIPAL} = useDatosEmpresa()
    const {lang} = useLang()
    const {listas,loading,getLista,setFormSelect,dialogs,setDialogs} = useCobrar()
    const [inputbuscar,setInputBuscar] = useState('')
    const columnas = [
        {
          field: "nro_factura",
          title: "NRO",
          isNumber: true,
          style: { fontWeight: "bold" },
        },
        {
          field: "nombre_cliente",
          title: "Cliente",
        },
        {
          field: "tipo_factura",
          title: lang.tipo,
          items: {"2":"Crédito","3":"Cuotas" },
          compareField: "tipo_factura",
        },
        {
          field: "recibido_factura",
          title: "Recibido",
          isNumber: true,
          style: { fontWeight: "bold" },
        },
        {
          field: "monto_total_factura",
          title: "Total",
          isNumber: true,
          style: { fontWeight: "bold" },
        },
        {
          field: "estado_factura",
          title: lang.estado,
          compareField:"estado_factura",
          items: {
            "1": lang.pagado,
            "2": lang.pendiente+'...',
          },
          styleFieldCondition: "estado_factura",
          styleCondition: {
            "2": {
              backgroundColor: "#ff7c6b",
              padding: "3px",fontWeight:"bold",
              borderRadius: "5px",
              color: "#780c00",
            },
            "1": {
              backgroundColor: "#2dec76",
              padding: "3px", fontWeight:"bold",
              borderRadius: "5px",
              color: "#007b02",
            },
          },
        },
      ];

      const navegar = (e)=>{
        to('cuentas/cobrar/'+e.id_cliente)
      }
      const open = (f) => {
        setFormSelect(f);

        console.log(f);
        setDialogs({ ...dialogs, cobrar: true }); 
      };

      const detalles = (f)=>{
        setFormSelect(f);
        setDialogs({ ...dialogs, detalles: true }); 
      }

      const Acciones = ({rowProps})=>(
        <Stack spacing={1} direction="row">
        <Tooltip title={lang.ver}>
        <IconButton onClick={() => navegar(rowProps)}>
          <Icon>visibility</Icon>
        </IconButton>
        </Tooltip>

        <Tooltip title={lang.detalles}>
        <IconButton onClick={() => detalles(rowProps)}>
          <Icon color="primary">info</Icon>
        </IconButton>
        </Tooltip>
        <Tooltip title={lang.cobrar}>
        <IconButton onClick={() => open(rowProps)}>
          <Icon color="warning">local_atm</Icon>
        </IconButton>
        </Tooltip>
        </Stack>
      )


      const search = (
        <Stack direction='row'>
          <TextField label={lang.buscar} value={inputbuscar} onKeyUp={e=>{ e.key==='Enter' && getLista(inputbuscar) }} onChange={e=>setInputBuscar(e.target.value)}  
            InputProps={{
                endAdornment:(
                <InputAdornment position="end" >
                    <IconButton onClick={()=>{ getLista(inputbuscar) }}>
                        <Icon>search</Icon>
                    </IconButton>
                </InputAdornment> )
            }}
          />
    
        </Stack>
      );


      const totalTxt = "Total a cobrar: "+funciones.numberSeparator(listas.totalCobrar)+" "+ MONEDA_PRINCIPAL.abreviatura_moneda;
      const listaFiltrada = listas.cobrar.filter(item => item.nombre_cliente.toLowerCase().includes(inputbuscar.toLowerCase()));
    
    return (<> <Tablas
      icon={{ name:"payments" }}
      title={lang.cuentas_a_cobrar}
      caption={totalTxt}
      subtitle={lang.listas_cuentas_cobrar}
      Accions={Acciones}
      loading={loading}
      columns={columnas}
      datas={listaFiltrada}
      inputs={search}
      showOptions
    /> 
    <Pagination />
    </>
    );
}

export default ListaCobrar;