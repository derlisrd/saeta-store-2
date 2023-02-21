import { useCallback, useEffect } from "react";
import { Route, Routes,Navigate,useNavigate } from "react-router-dom";
import LoadingBackDrop from "../Components/UI/LoadingBackDrop";
import { useLogin } from "../Contexts/LoginProvider";
import { env } from "../App/Config/config";
import NotAutorized from "../Pages/404/NotAutorized";
import ErrorPage from "../Pages/404";
import LoginForm from "../Pages/Auth/LoginForm";
import DashBoard from "../Pages/Dashboard";
import MainPage from "../Pages/MainPage";
import Cajas from "../Pages/Caja/Cajas";
import Ventas from "../Pages/Ventas/Vender";
import Facturas from "../Pages/Ventas/Facturas";
import Users from "../Pages/Users";
import Productos from "../Pages/Productos/Productos";
import ProductosNew from "../Pages/Productos/Productos/ProductNew";
import Tema from "../Pages/Settings/Tema";
import RegistroFacturas from "../Pages/Settings/RegistroFacturas";
import Settings from "../Pages/Settings/DatosEmpresa";
import Clientes from "../Pages/Clientes";
import Categorias from "../Pages/Productos/Categorias";
import Informes from "../Pages/Informes/Generales";
import ProductEdit from "../Pages/Productos/Productos/ProductEdit";
import Notas from "../Pages/Ventas/Notas";
import Monedas from "../Pages/Monedas";
import CategoriasForm from "../Pages/Productos/Categorias/CategoriasForm";
import Proveedores from "../Pages/Productos/Proveedores";
import Marcas from "../Pages/Productos/Marcas";
import InformesProductos from '../Pages/Informes/Productos';
import Empleados from "../Pages/Empleados";
import ProductosApartados from "../Pages/Productos/ProductosApartados";
import Depositos from "../Pages/Productos/Depositos";
import Inventario from "../Pages/Productos/Inventario";
import Impuestos from "../Pages/Settings/Impuestos";
import Info from "../Pages/Settings/Info";
import Compras from "../Pages/Compras";
import Medidas from "../Pages/Medidas";
import Movimientos from "../Pages/Caja/Movimientos";
import RegistroMovimientos from "../Pages/Caja/RegistroMovimientos";
import Entregas from "../Pages/Ventas/Entregas";
import Transferencias from "../Pages/Productos/Transferencias";
import Cuentas from "../Pages/Cuentas";
import ProductCode from "../Pages/Productos/Productos/ProductCode";
import Agenda from "../Pages/Agendas/Agenda";
import Turnos from "../Pages/Agendas/Turnos";
import Backup from "../Pages/Backup";
import Comisiones from "../Pages/Caja/Comisiones";
import FormasPago from "../Pages/Ventas/FormasPago";
import Profile from "../Pages/Profile";
import ScrollToTop from "../Components/ScrollToUp";
import ListaProductos from "../Pages/Productos/Depositos/ListaProductosDeposito";
import RegistrosProductos from "../Pages/Productos/Productos/RegistrosProductos";
import RegistroActividad from "../Pages/Settings/RegistroActividad";
import Reportes from "../Pages/Ventas/Reportes";
import Web from "../Pages/Web";

const RoutesMain = () => {
  const navigate = useNavigate();
  const {userData,loading} = useLogin();
  const {login,permisos} = userData
  

  const PublicRoute = ({children})=> login ? <MainPage>{children}</MainPage> : <Navigate to={env.BASEURL+"/"} />


  const PrivateRoute = ({children,id})=>{
    if(login && !permisos.some(e => parseInt(e.id_permiso_permiso) === parseInt(id)) ){
      return <Navigate to={env.BASEURL + "/notautorized"} />
    } 
    return login ? <MainPage> <ScrollToTop /> {children}</MainPage> : <Navigate to={env.BASEURL+"/"} />
  }

  const verificar = useCallback(()=>{
    if(!login){
      navigate(env.BASEURL+"/")
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
  const R = env.BASEURL +`/`;
  return (
    <Routes>
      <Route path={R+"profile"} element={<PublicRoute><Profile /></PublicRoute>} />
      <Route path={R+'dashboard'} element={<PublicRoute><DashBoard /></PublicRoute>} />
      <Route path={R+'informes'} element={<PrivateRoute id={2}><Informes /></PrivateRoute>} />
      <Route path={R+'informesproductos'} element={<PrivateRoute id={3}><InformesProductos /></PrivateRoute>} />
      <Route path={R+"turnos"} element={<PrivateRoute id={4}><Turnos /></PrivateRoute>} />
      <Route path={R+"agenda"} element={<PrivateRoute id={5}><Agenda /></PrivateRoute>} />
      <Route path={R+'facturas'} element={<PrivateRoute id={6}><Facturas /></PrivateRoute>} />
      <Route path={R+'ventas'} element={<PrivateRoute id={7}><Ventas /></PrivateRoute>} />
      <Route path={R+'notas'} element={<PrivateRoute id={8}><Notas /></PrivateRoute>} />
      <Route path={R+"comisiones"} element={<PrivateRoute id={10}><Comisiones /></PrivateRoute>} />
      <Route path={R+"formaspago"} element={<PrivateRoute id={12}><FormasPago /></PrivateRoute>} />
      <Route path={R+"entregas"} element={<PrivateRoute id={14}><Entregas /></PrivateRoute>} />
      <Route path={R+'reportes'} element={<PrivateRoute id={16}><Reportes /></PrivateRoute>} />
      <Route path={R+'productos'} element={<PrivateRoute id={17}><Productos /></PrivateRoute>} />
      <Route path={R+'productos/bc'} element={<PrivateRoute id={17}><ProductCode /></PrivateRoute>} />  
      <Route path={R+'productos/edit/:id'} element={<PrivateRoute id={18}><ProductEdit /></PrivateRoute>} />
      <Route path={R+'productos/new'} element={<PrivateRoute id={18}><ProductosNew /></PrivateRoute>} />
      <Route path={R+'categorias'} element={<PrivateRoute id={19}><Categorias /></PrivateRoute>} />
      <Route path={R+'categorias/new'} element={<PrivateRoute id={20}><CategoriasForm /></PrivateRoute>} />
      <Route path={R+"categorias/edit/:id"} element={<PrivateRoute id={20}><CategoriasForm /></PrivateRoute>} />
      <Route path={R+"proveedores"} element={<PrivateRoute id={21}><Proveedores /></PrivateRoute>} />
      <Route path={R+"marcas"} element={<PrivateRoute id={23}><Marcas /></PrivateRoute>} />
      <Route path={R+'apartados'} element={<PrivateRoute id={25}><ProductosApartados /></PrivateRoute>} />
      <Route path={R+'depositos'} element={<PrivateRoute id={27}><Depositos /></PrivateRoute>} />
      <Route path={R+'deposito/:id'} element={<PrivateRoute id={29}><ListaProductos /></PrivateRoute>} />
      <Route path={R+'productos/:id'} element={<PrivateRoute id={29}><RegistrosProductos /></PrivateRoute>} />
      <Route path={R+"transferencias"} element={<PrivateRoute id={30}><Transferencias /></PrivateRoute>} />
      <Route path={R+'inventario'} element={<PrivateRoute id={31}><Inventario /></PrivateRoute>} />
      <Route path={R+'compras'} element={<PrivateRoute id={32}><Compras /></PrivateRoute>} />
      <Route path={R+'cajas'} element={<PrivateRoute id={33}><Cajas /></PrivateRoute>} />
      <Route path={R+"movimientos"} element={<PrivateRoute id={36}><Movimientos /></PrivateRoute>} />
      <Route path={R+"registromovimientos"} element={<PrivateRoute id={37}><RegistroMovimientos /></PrivateRoute>} />
      <Route path={R+"cuentas"} element={<PrivateRoute id={38}><Cuentas /></PrivateRoute>} />
      <Route path={R+'clientes'} element={<PrivateRoute id={40}><Clientes /></PrivateRoute>} />
      <Route path={R+'empleados'} element={<PrivateRoute id={42}><Empleados /></PrivateRoute>} />
      <Route path={R+'monedas'} element={<PrivateRoute id={44}><Monedas /></PrivateRoute>} />
      <Route path={R+'medidas'} element={<PrivateRoute id={46}><Medidas /></PrivateRoute>} />
      <Route path={R+'impuestos'} element={<PrivateRoute id={48}><Impuestos /></PrivateRoute>} />
      <Route path={R+'users'} element={<PrivateRoute id={49}><Users /></PrivateRoute>} />
      <Route path={R+'actividad'} element={<PrivateRoute id={51}><RegistroActividad /></PrivateRoute>} />
      <Route path={R+'settings'} element={<PrivateRoute id={52}><Settings /></PrivateRoute>} />
      <Route path={R+'registrofacturas'} element={<PrivateRoute id={54}><RegistroFacturas /></PrivateRoute>} />
      <Route path={R+'backup'} element={<PrivateRoute id={56}><Backup /></PrivateRoute>} />
      <Route path={R+'tema'} element={<PrivateRoute id={57}><Tema /></PrivateRoute>} />
      <Route path={R+'web'} element={<PrivateRoute id={59}><Web /></PrivateRoute>} />
      <Route path={R+'info'} element={<PublicRoute><Info /></PublicRoute>} />
      <Route path={R+'notautorized'} element={<NotAutorized />} />
      <Route path={R} element={<LoginForm />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default RoutesMain;
