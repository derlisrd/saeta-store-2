
import { Button, IconButton, Tooltip, Icon, Stack} from '@mui/material';
import Motion from '../../../Componentes/Motion';
import Tablas from '../../../Componentes/Tablas';
import { useProductosApartados } from './ProductosApartadosProvider';

const ProductosApartadosLista = () => {
    const {cargando,lista,dialogs ,setDialogs,devolver} = useProductosApartados()

    const FilterData = [...lista]


    const columns = [
        {
          field: "id_productos_apartado",
          title: "ID",
        },
        {
            field: "codigo_producto",
            title: "Código",
        },
        {
            field: "nombre_producto",
            title: "Producto",
        },
        {
            field:"nombre_cliente",
            title:"Cliente"
        },
        {
          field:"nombre_user",
          title:"Apartado por"
        },
        {
            field:"cantidad_apartado",
            title:"Cantidad"
        },
        {
          field:"nombre_deposito",
          title:"Deposito"
      }
        
    ];



    const Acciones = ({filaProps}) =>(<Stack direction="row" justifyContent="center">
        <Tooltip title="Devolver al stock" arrow >
        <IconButton onClick={()=>{devolver(filaProps)}}>
            <Icon color="primary">swap_horiz</Icon>
        </IconButton>
        </Tooltip>
        </Stack>
    )

    const Search = (<div>
        <Button variant="outlined" onClick={()=>{setDialogs({...dialogs,apartar:true})}} color="primary" >Apartar producto</Button>
    </div>)

  return (
    <Motion>
      <Tablas
        nombretabla="Productos Apartados"
        subtitle="Módulo de apartado de stock de los dépositos"
        icono="save"
        bgicono="#3f51b5"
        namecolumnID="id_productos_apartado"
        columnas={columns}
        filas={FilterData}
        Acciones={Acciones}
        cargando={cargando.lista}
        search={Search}
        showOptions
      />
    </Motion>
  )
}

export default ProductosApartadosLista
