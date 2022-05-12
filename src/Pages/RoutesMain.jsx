import { useCallback, useEffect } from "react";
import { Route, Routes,Navigate,useNavigate } from "react-router-dom";
import LoadingBackDrop from "../Components/UI/LoadingBackDrop";
import { useLogin } from "../Contexts/LoginProvider";
import { BASEURL } from "../Utils/config";
import ErrorPage from "./404";
import NotAutorized from "./404/NotAutorized";
import Agenda from "./Agenda";
import LoginForm from "./Auth/LoginForm";
import Movimientos from "./Caja/Movimientos/Index";
import Clientes from "./Clientes";
import ClientesForm from "./Clientes/ClientesForm";
import Cuentas from "./Cuentas";
import DashBoard from "./Dashboard";
import Depositos from './Productos/Depositos'
import Empleados from "./Empleados";
import MainPage from "./MainPage";
import Medidas from "./Medidas";
import Monedas from "./Monedas";
import Categorias from "./Productos/Categorias";
import CategoriasForm from "./Productos/Categorias/CategoriasForm";
import Compras from "./Productos/Compras";
import Inventario from "./Productos/Inventario";
import Marcas from "./Productos/Marcas";
import Productos from "./Productos/Productos";
import ProductCode from "./Productos/Productos/ProductCode";
import ProductForm from "./Productos/Productos/ProductForm";
import ProductFormEdit from "./Productos/Productos/ProductFormEdit";
import ProductosApartados from "./Productos/ProductosApartados";
import Proveedores from "./Productos/Proveedores";
import Settings from "./Settings/DatosEmpresa";
import Impuestos from "./Settings/Impuestos";
import Info from "./Settings/Info";
import Turnos from "./Turnos";
import Users from "./Users";
import Entregas from "./Ventas/Entregas";
import EntregasView from "./Ventas/Entregas/EntregasView";
import Facturas from "./Ventas/Facturas";
import Notas from "./Ventas/Notas";
import Ventas from "./Ventas/Vender";
import Informes from "./Informes";
import RegistroFacturas from "./Settings/RegistroFacturas";
import RegistroMovimientos from "./Caja/RegistroMovimientos";
import Cajas from "./Caja/Cajas";
import Transferencias from "./Productos/Transferencias";

const RoutesMain = () => {
  const navigate = useNavigate();
  const {userData,loading} = useLogin();
  const {login,permisos} = userData

  const PrivateRoute = ({children,id})=>{
    if(login && !permisos.some(e => parseInt(e.id_permiso_permiso) === parseInt(id)) ){
      return <Navigate to={BASEURL + "/notautorized"} />
    } 
    return login ? <MainPage>{children}</MainPage> : <Navigate to={"/"} />
  }

  const verificar = useCallback(()=>{
    if(!login){
      navigate("/")
    }
  },[login,navigate])
  
  

  useEffect(() => {
    const ca = new AbortController(); let isActive = true;
    if (isActive) {verificar();}
    return () => {isActive = false; ca.abort();}
  }, [verificar]);


  if(loading){
    return <LoadingBackDrop />
  }
  const R = BASEURL+'/';
  return (
    <Routes>
      
        <Route path={R+'ventas'} element={<PrivateRoute id={1}><Ventas /></PrivateRoute>} />
        <Route path={R+'productos'} element={<PrivateRoute id={8}><Productos /></PrivateRoute>} />
        <Route path={R+'productos/bc'} element={<PrivateRoute id={8}><ProductCode /></PrivateRoute>} />        
        <Route path={R+'productos/new'} element={<PrivateRoute id={9}><ProductForm /></PrivateRoute>} />
        <Route path={R+'productos/new/:id'} element={<PrivateRoute id={9}><ProductFormEdit /></PrivateRoute>} />
        <Route path={R+'categorias'} element={<PrivateRoute id={10}><Categorias /></PrivateRoute>} />
        <Route path={R+'categorias/new'} element={<PrivateRoute id={11}><CategoriasForm /></PrivateRoute>} />
        <Route path={R+'categorias/new/:id'} element={<PrivateRoute id={11}><CategoriasForm /></PrivateRoute>} />
        <Route path={R+'marcas'} element={<PrivateRoute id={12}><Marcas /></PrivateRoute>} />
        <Route path={R+'proveedores'} element={<PrivateRoute id={14}><Proveedores /></PrivateRoute>} />
        <Route path={R+'facturas'} element={<PrivateRoute id={4}><Facturas /></PrivateRoute>} />
        <Route path={R+"entregas"} element={<PrivateRoute id={16}><Entregas /></PrivateRoute>} />
        <Route path={R+"entregas/view/:id"} element={<PrivateRoute id={16}><EntregasView /></PrivateRoute>} />
        <Route path={R+"apartados"} element={<PrivateRoute id={18}><ProductosApartados /></PrivateRoute>} />
        <Route path={R+"compras"} element={<PrivateRoute id={20}><Compras /></PrivateRoute>} />
        <Route path={R+"movimientos"} element={<PrivateRoute id={24}><Movimientos /></PrivateRoute>} />
        <Route path={R+'cajas'} element={<PrivateRoute id={22}><Cajas /></PrivateRoute>} />
        <Route path={R+'clientes'} element={<PrivateRoute id={28}><Clientes /></PrivateRoute>} />
        <Route path={R+'clientes/new'} element={<PrivateRoute id={29}><ClientesForm /></PrivateRoute>} />
        <Route path={R+'clientes/new/:id'} element={<PrivateRoute id={29}><ClientesForm /></PrivateRoute>} />
        <Route path={R+'monedas'} element={<PrivateRoute id={30}><Monedas /></PrivateRoute>} />
        <Route path={R+'medidas'} element={<PrivateRoute id={32}><Medidas /></PrivateRoute>} />
        <Route path={R+'usuarios'} element={<PrivateRoute id={34}><Users /></PrivateRoute>} />
        <Route path={R+'settings'} element={<PrivateRoute id={36}><Settings /></PrivateRoute>} />
        <Route path={R+'dashboard'} element={<PrivateRoute id={59}><DashBoard /></PrivateRoute>} />
        <Route path={R+'depositos'} element={<PrivateRoute id={39}><Depositos /></PrivateRoute>} />
        <Route path={R+'empleados'} element={<PrivateRoute id={41}><Empleados /></PrivateRoute>} />
        <Route path={R+'registrofacturas'} element={<PrivateRoute id={38}><RegistroFacturas /></PrivateRoute>} />
        <Route path={R+'inventario'} element={<PrivateRoute id={43}><Inventario /></PrivateRoute>} />
        <Route path={R+'informes'} element={<PrivateRoute id={44}><Informes /></PrivateRoute>} />
        <Route path={R+'impuestos'} element={<PrivateRoute id={45}><Impuestos /></PrivateRoute>} />
        <Route path={R+'cuentas'} element={<PrivateRoute id={47}><Cuentas /></PrivateRoute>} />
        <Route path={R+'registromovimientos'} element={<PrivateRoute id={26}><RegistroMovimientos /></PrivateRoute>} />
        <Route path={R+'turnos'} element={<PrivateRoute id={49}><Turnos /></PrivateRoute>} />
        <Route path={R+'agenda'} element={<PrivateRoute id={58}><Agenda /></PrivateRoute>} />
        <Route path={R+'notas'} element={<PrivateRoute id={6}><Notas /></PrivateRoute>} />
        <Route path={R+'transferencias'} element={<PrivateRoute id={60}><Transferencias /></PrivateRoute>} />
        <Route path={R+'info'} element={<PrivateRoute id={59}><Info /></PrivateRoute>} />
        <Route path={R+'notautorized'} element={<NotAutorized />} />
        <Route path={R} element={<LoginForm />} />
        <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default RoutesMain;
