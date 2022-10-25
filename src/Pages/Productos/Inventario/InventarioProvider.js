import {useCallback, createContext , useContext,useState,useEffect,useRef} from "react"
import swal from "sweetalert";
import { APICALLER } from "../../../Services/api";
import { useLogin } from "../../../Contexts/LoginProvider";
import { useLang } from "../../../Contexts/LangProvider";
const Contexto = createContext()

const InventarioProvider = ({children})=>{
    const {lang} = useLang()
    const { userData } = useLogin(); const {token_user} = userData;
    const [load,setLoad] = useState(true);
    const [idDeposito,setIdDeposito] = useState('');
    const [listaDepositos,setListaDepositos]=useState([]);
    const initialMsj = {activo:false,color:"error",mensaje:"",input:""}
    const [msj,setMsj] = useState(initialMsj);
    const [cantidadNueva,setCantidadNueva] = useState("");
    const [listaStock,setListaStock]= useState([]);
    const initialForm = {id_productos_deposito:"",id_producto:'',codigo_producto: '', nombre_producto: '', stock_producto_deposito: '',nuevoStock:false}
    const inputCorregir = useRef(null);
    const [formulario,setFormulario] = useState(initialForm)
    const cambiarDeposito = (deposito)=>{
        setIdDeposito(deposito);
        setFormulario(initialForm)
    }

    const corregirLista = ()=>{
        let cantidadNueva = inputCorregir.current.value;
        let f = {...formulario};

        if(idDeposito===''){
            setMsj({...msj,activo:true,mensaje:"Elija un depósito",input:"deposito"});
            return false;
        }
        if(cantidadNueva===""){
            setMsj({...msj,activo:true,mensaje:"Ingrese cantidad",input:"cantidad"});
            return false;
        }
        let stock = [...listaStock];
        
        let foundIndex = stock.findIndex(e=> e.id_deposito === idDeposito);
        if(foundIndex>=0){
            stock[foundIndex].stock_producto_deposito = cantidadNueva;
            stock[foundIndex].update = true;
        }else{
            let index = listaDepositos.findIndex(e=> e.id_deposito === idDeposito);
            let nombre = listaDepositos[index].nombre_deposito;
            stock.push({
                id_producto: f.id_producto,
                id_deposito_deposito: idDeposito,
                nombre_deposito:nombre,
                id_productos_deposito:f.id_productos_deposito,
                stock_producto_deposito:cantidadNueva,
                nuevoStock: true
            })
        }
        setListaStock(stock);
        //console.log(stock);
        setIdDeposito("");
        setCantidadNueva("");
        inputCorregir.current.focus();

    }

    const finalizarCorreccion = ()=>{
        const table = "productos_depositos"; const token = token_user;
        listaStock.forEach( (e) => {
            //console.log(e);
            if(e.nuevoStock){
                APICALLER.insert({table,token,data:{
                   id_producto_deposito:e.id_producto,
                   id_deposito_deposito:e.id_deposito_deposito,
                   stock_producto_deposito:e.stock_producto_deposito}});
            }
            else if(e.update){
                APICALLER.update({table,token,data:{stock_producto_deposito:e.stock_producto_deposito},id:e.id_productos_deposito})
            } 
        });
        setFormulario(initialForm);
        swal({text:"Corregido correctamente",timer:1200});
    }
    const getLista = useCallback(async()=>{
        let res = await APICALLER.get({table:"depositos",where:'tipo_deposito,=,1'});
        if(res.response && res.found>0) {
            setListaDepositos(res.results);
            //setIdDeposito(res.results[0].id_deposito);
        }else{
            console.log(res);
        }
        setLoad(false);
    },[]);
    
    

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


const values ={ lang,finalizarCorreccion,load,formulario,setFormulario,initialForm,listaDepositos,cambiarDeposito,idDeposito,setIdDeposito,listaStock,setListaStock,corregirLista,inputCorregir,msj,setMsj,cantidadNueva,setCantidadNueva }

    return(
        <Contexto.Provider value={values}>
            {children}
        </Contexto.Provider>
    )
}

export default InventarioProvider;

export const useInventario = ()=>{

    const {lang,finalizarCorreccion,load,formulario,setFormulario,initialForm,listaDepositos,cambiarDeposito,idDeposito,setIdDeposito,listaStock,setListaStock,corregirLista,inputCorregir,msj,setMsj,cantidadNueva,setCantidadNueva} = useContext(Contexto)
    return {lang,finalizarCorreccion,load,formulario,setFormulario,initialForm,listaDepositos,cambiarDeposito,idDeposito,setIdDeposito,listaStock,setListaStock,corregirLista,inputCorregir,msj,setMsj,cantidadNueva,setCantidadNueva}
}