
import { Button, IconButton, Tooltip, Icon, Stack} from '@mui/material';
import Tablas from '../../../Components/UI/Tablas';
import { useProductosApartados } from './ProductosApartadosProvider';

const ProductosApartadosLista = () => {
    const {cargando,lista,dialogs ,setDialogs,devolver,lang} = useProductosApartados()

    const FilterData = [...lista]


    const columns = [
        {
          field: "id_productos_apartado",
          title: lang.id,
        },
        {
            field: "codigo_producto",
            title: lang.codigo,
        },
        {
            field: "nombre_producto",
            title: lang.producto,
        },
        {
            field:"nombre_cliente",
            title:lang.cliente
        },
        {
          field:"nombre_user",
          title:lang.apartado_por
        },
        {
            field:"cantidad_apartado",
            title:lang.cantidad
        },
        {
          field:"nombre_deposito",
          title:lang.deposito
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
        <Button variant="contained" onClick={()=>{setDialogs({...dialogs,apartar:true})}}  >{lang.apartar_producto}</Button>
    </div>)

  return (
    <>
      <Tablas
        title={lang.apartados}
        subtitle={lang.lista_apartados}
        icon={{ name:"save" }}
        columns={columns}
        datas={FilterData}
        Accions={Acciones}
        loading={cargando.lista}
        inputs={Search}
        showOptions
      />
    </>
  )
}

export default ProductosApartadosLista
