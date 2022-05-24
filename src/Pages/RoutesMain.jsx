import { useCallback, useEffect } from "react";
import { Route, Routes,Navigate,useNavigate } from "react-router-dom";
import LoadingBackDrop from "../Components/UI/LoadingBackDrop";
import { useLogin } from "../Contexts/LoginProvider";
import { BASEURL } from "../Utils/config";
import NotAutorized from "./404/NotAutorized";
import ErrorPage from "./404";
import LoginForm from "./Auth/LoginForm";
import DashBoard from "./Dashboard";
import MainPage from "./MainPage";
import Cajas from "./Caja/Cajas";
import Ventas from "./Ventas/Vender";
import Facturas from "./Ventas/Facturas";
import Users from "./Users";
import Productos from "./Productos/Productos";
/* 
import Agenda from "./Agenda";
import Movimientos from "./Caja/Movimientos/Index";
import Clientes from "./Clientes";
import ClientesForm from "./Clientes/ClientesForm";
import Cuentas from "./Cuentas";

import Depositos from './Productos/Depositos'
import Empleados from "./Empleados";
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

import Informes from "./Informes";
import RegistroFacturas from "./Settings/RegistroFacturas";
import RegistroMovimientos from "./Caja/RegistroMovimientos";
import Cajas from "./Caja/Cajas";
import Transferencias from "./Productos/Transferencias"; */

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
        <Route path={R+'productos'} element={<PrivateRoute id={34}><Productos /></PrivateRoute>} />
        <Route path={R+'users'} element={<PrivateRoute id={34}><Users /></PrivateRoute>} />
        <Route path={R+'facturas'} element={<PrivateRoute id={5}><Facturas /></PrivateRoute>} />
        <Route path={R+'ventas'} element={<PrivateRoute id={1}><Ventas /></PrivateRoute>} />
        <Route path={R+'dashboard'} element={<PrivateRoute id={59}><DashBoard /></PrivateRoute>} />
        <Route path={R+'cajas'} element={<PrivateRoute id={22}><Cajas /></PrivateRoute>} />
        <Route path={R+'notautorized'} element={<NotAutorized />} />
        <Route path={R} element={<LoginForm />} />
        <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default RoutesMain;
