import { useState } from "react";
import Buscar from "../../../Components/TextFields/Buscar";
import Tablas from "../../../Components/UI/Tablas";
import { useProductosApartados } from "./ProductosApartadosProvider";
import {Stack,Button} from '@mui/material'
import { Columns } from "./Columns";
import Acciones from "./Acciones";

function ListaApartado() {

    const {loading,listas,lang,getLista,llaveDialog} = useProductosApartados()
    const [inputSearch, setInputSearch] = useState("");


    const filtrado = listas.productos.filter((e) =>e.nombre_producto.toLowerCase().includes(inputSearch.toLowerCase())); 

    const Inputs = (
        <Stack spacing={2} direction="row">
          <Buscar label="Buscar" onClick={()=>{getLista(inputSearch)}}  onChange={(e) => setInputSearch(e.target.value)} />
          <Button variant="contained" size="large" onClick={() => {llaveDialog("apartar", true);}}
          >Apartar</Button>
        </Stack>
      );





    return ( <Tablas
        icon={{ name:'save' }} 
        title={lang.productos_apartados}
        loading={loading.lista}
        columns={Columns}
        datas={filtrado}
        inputs={Inputs}
        showOptions
        Accions={Acciones}
    /> );
}

export default ListaApartado;