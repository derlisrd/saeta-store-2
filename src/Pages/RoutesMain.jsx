import { useCallback, useEffect } from "react";
import { Route, Routes,Navigate,useNavigate } from "react-router-dom";
import LoadingBackDrop from "../Components/UI/LoadingBackDrop";
import { useLogin } from "../Contexts/LoginProvider";
import { env } from "../App/Config/config";
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
import ProductosNew from "./Productos/Productos/ProductNew";
import Tema from "./Settings/Tema";
import RegistroFacturas from "./Settings/RegistroFacturas";
import Settings from "./Settings/DatosEmpresa";
import Clientes from "./Clientes";
import Categorias from "./Productos/Categorias";
import Informes from "./Informes";
import ProductEdit from "./Productos/Productos/ProductEdit";
import Notas from "./Ventas/Notas";
/* 
import Agenda from "./Agenda";
import Movimientos from "./Caja/Movimientos/Index";
import ClientesForm from "./Clientes/ClientesForm";
import Cuentas from "./Cuentas";

import Depositos from './Productos/Depositos'
import Empleados from "./Empleados";
import Medidas from "./Medidas";
import Monedas from "./Monedas";
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
      return <Navigate to={env.BASEURL + "/notautorized"} />
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
  const R = env.BASEURL +'/';
  return (
    <Routes>
      <Route path={R+'informes'} element={<PrivateRoute id={44}><Informes /></PrivateRoute>} />
      <Route path={R+'categorias'} element={<PrivateRoute id={10}><Categorias /></PrivateRoute>} />
      <Route path={R+'clientes'} element={<PrivateRoute id={28}><Clientes /></PrivateRoute>} />
      <Route path={R+'settings'} element={<PrivateRoute id={36}><Settings /></PrivateRoute>} />
      <Route path={R+'tema'} element={<PrivateRoute id={72}><Tema /></PrivateRoute>} />
      <Route path={R+'productos/edit/:id'} element={<PrivateRoute id={9}><ProductEdit /></PrivateRoute>} />
      <Route path={R+'productos/new'} element={<PrivateRoute id={9}><ProductosNew /></PrivateRoute>} />
      <Route path={R+'productos'} element={<PrivateRoute id={34}><Productos /></PrivateRoute>} />
      <Route path={R+'users'} element={<PrivateRoute id={34}><Users /></PrivateRoute>} />
      <Route path={R+'registrofacturas'} element={<PrivateRoute id={38}><RegistroFacturas /></PrivateRoute>} />
      <Route path={R+'facturas'} element={<PrivateRoute id={5}><Facturas /></PrivateRoute>} />
      <Route path={R+'notaspedidos'} element={<PrivateRoute id={6}><Notas /></PrivateRoute>} />
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
