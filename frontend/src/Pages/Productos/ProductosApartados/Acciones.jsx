import {Stack,IconButton,Icon,Tooltip} from '@mui/material'
import swal from 'sweetalert'
import { APICALLER } from '../../../Services/api'
import { useProductosApartados } from './ProductosApartadosProvider'

const Acciones = ({rowProps})=>{

    const {token_user,getLista} = useProductosApartados()

    const devolver = async(fila)=>{
        
        let answer = await swal({text:`Desea devolver ${fila.nombre_producto} ?`, icon:"warning", buttons:['Cancelar','Devolver']});
        if(answer){
            let id_deposito_producto_apartado = fila.id_deposito_producto_apartado;
            let id_apartado = fila.id_productos_apartado;
            let cantidad = parseFloat(fila.cantidad_apartado);
            let resstock = await APICALLER.get({table:'productos_depositos',where:`id_productos_deposito,=,${id_deposito_producto_apartado}`})
            let stock;
            if(resstock.response && resstock.found>0){ stock = parseFloat(resstock.results[0].stock_producto_deposito)} else{
                console.log(resstock);return false;
            }
            
            let nuevo = cantidad + stock;
            
            let [res,res2] = await Promise.all([
                APICALLER.update({table:"productos_depositos",
                id:id_deposito_producto_apartado,token:token_user,data:{stock_producto_deposito:nuevo}}),
                APICALLER.delete({table:"productos_apartados",id:id_apartado,token:token_user}),
            ])
            if(res.response && res2.response){
                swal({text:'Listo!', timer:1300,icon:'success'})
                getLista();
            }else{
                console.log(res,res2);
            }
        }
    }

    return (<Stack direction="row" spacing={1} >
        <Tooltip title="Devolver">
        <IconButton onClick={()=>{devolver(rowProps)}}><Icon>reply</Icon></IconButton>
        </Tooltip>
    </Stack>)
}
export default Acciones