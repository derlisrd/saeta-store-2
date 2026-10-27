import React,{createContext,useContext,useState,useEffect,useCallback} from 'react'
import { APICALLER } from '../../../Services/api';
import {useLogin} from '../../../Contexts/LoginProvider';
import swal from 'sweetalert';
const TransferenciasContext = createContext();

const TransferenciasProvider = ({children}) => {
    const {userData} = useLogin()
    const {token_user} = userData
    const initialDialogs = {transferir:false}
    const [cargas,setCargas] = useState({lista:true,transferencia:false});
    const [error,setError] = useState({active:false,msj:"",id:""})
    const [dialogs,setDialogs] = useState(initialDialogs);
    const [listaDepositos,setListaDeposito] = useState([]);
    const [cant,setCant] = useState(0);
    const [idDeposito,setIdDeposito]=useState(''); // a que deposito transferir
    const [idDepositoSelect,setIdDepositoSelect] = useState(''); // desde donde transferir
    const initialFormulario = {id_producto:"",codigo_producto:"",nombre_producto:"",stock:[]}
    const [formulario,setFormulario]=useState(initialFormulario);

    const getLista = useCallback(async()=>{
      setCargas({lista:true,transferencia:false})
      let res = await APICALLER.get({table:"depositos",where:"tipo_deposito,=,1"});
      res.response ? setListaDeposito(res.results) : console.log(res);
    },[]);

    const transferir = async()=>{
      if(idDeposito===""){
        setError({active:true,msj:"Seleccione depósito.",id:"deposito"});
        return false;
      }
      
      let index = formulario.stock.findIndex(e=> e.id_deposito_deposito === idDepositoSelect);
      let cantidadActual = parseFloat(formulario.stock[index].stock_producto_deposito);
      let cantidadNueva = parseFloat(cant);
      let id_producto = formulario.id_producto;
      let id_productos_deposito = formulario.stock[index].id_productos_deposito;
      
      if(cantidadActual<cantidadNueva){
        setError({active:true,msj:"No hay suficiente stock.",id:"cantidad"});
        return false;
      }
      let stockNuevo = cantidadActual - cantidadNueva; // transferido
      setCargas({lista:false,transferencia:true})
      let apartado = {stock_producto_deposito:stockNuevo}
      let res = await Promise.all([APICALLER.update({table:'productos_depositos',id:id_productos_deposito,data:apartado,token:token_user}),APICALLER.get({table:'productos_depositos',where:`id_producto_deposito,=,${id_producto},and,id_deposito_deposito,=,${idDeposito}`})])
      if(res[1].response){
        if(res[1].found>0){
          let id_depo = res[1].results[0].id_productos_deposito;
          let stockNuevoTransferido = cantidadNueva + parseFloat(res[1].results[0].stock_producto_deposito);
          let resu = await APICALLER.update({table:'productos_depositos',id:id_depo,data:{stock_producto_deposito:stockNuevoTransferido},token:token_user});
          resu.response && console.log(resu);
        }else{
          let inser = {stock_producto_deposito:cantidadNueva,id_producto_deposito:id_producto,id_deposito_deposito:idDeposito}
          let resi = await APICALLER.insert({table:"productos_depositos",data:inser,token:token_user})
          resi.response && console.log(resi);
        }
      }else{
        console.log(res);
      }
      setError({active:false,msj:"",id:""});
      setDialogs({...dialogs,transferir:false});
      setCargas({lista:false,transferencia:false});
      setFormulario({id_producto:"",codigo_producto:"",nombre_producto:"",stock:[]});
      swal({text:"Transferido correctamente",icon:'success',timer:1200});
    }

    useEffect(() => {
      let isActive = true;
      const ca = new AbortController();
      if (isActive) {
        getLista()
      }
      return () => {
        isActive = false;
        ca.abort();
      };
    }, [getLista]); 

  return (
    <TransferenciasContext.Provider value={{cargas,idDepositoSelect,setIdDepositoSelect,cant,setCant,error,idDeposito,setIdDeposito,transferir,listaDepositos,dialogs,setDialogs,formulario,setFormulario }}>
     {children} 
    </TransferenciasContext.Provider>
  )
}

export function useTransferencias (){
    const {cargas,idDepositoSelect,setIdDepositoSelect,cant,setCant,error,idDeposito,setIdDeposito,transferir,listaDepositos,dialogs,setDialogs,formulario,setFormulario} = useContext(TransferenciasContext);
    return {cargas,idDepositoSelect,setIdDepositoSelect,cant,setCant,error,idDeposito,setIdDeposito,transferir,listaDepositos,dialogs,setDialogs,formulario,setFormulario}
}


export default TransferenciasProvider
