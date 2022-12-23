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
import Agenda from "../Pages/Agenda";
import Turnos from "../Pages/Turnos";
import Backup from "../Pages/Backup";
import Comisiones from "../Pages/Caja/Comisiones";
import FormasPago from "../Pages/Ventas/FormasPago";
import Profile from "../Pages/Profile";
import ScrollToTop from "../Components/ScrollToUp";
import ListaProductos from "../Pages/Productos/Depositos/ListaProductosDeposito";

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
      <Route path={R+"formaspago"} element={<PrivateRoute id={67}><FormasPago /></PrivateRoute>} />
      <Route path={R+"comisiones"} element={<PrivateRoute id={66}><Comisiones /></PrivateRoute>} />
      <Route path={R+"cuentas"} element={<PrivateRoute id={47}><Cuentas /></PrivateRoute>} />
      <Route path={R+"turnos"} element={<PrivateRoute id={51}><Turnos /></PrivateRoute>} />
      <Route path={R+"agenda"} element={<PrivateRoute id={51}><Agenda /></PrivateRoute>} />
      <Route path={R+"transferencias"} element={<PrivateRoute id={60}><Transferencias /></PrivateRoute>} />
      <Route path={R+"entregas"} element={<PrivateRoute id={16}><Entregas /></PrivateRoute>} />
      <Route path={R+"registromovimientos"} element={<PrivateRoute id={26}><RegistroMovimientos /></PrivateRoute>} />
      <Route path={R+"movimientos"} element={<PrivateRoute id={24}><Movimientos /></PrivateRoute>} />
      <Route path={R+'medidas'} element={<PrivateRoute id={32}><Medidas /></PrivateRoute>} />
      <Route path={R+'compras'} element={<PrivateRoute id={20}><Compras /></PrivateRoute>} />
      <Route path={R+'impuestos'} element={<PrivateRoute id={45}><Impuestos /></PrivateRoute>} />
      <Route path={R+'inventario'} element={<PrivateRoute id={43}><Inventario /></PrivateRoute>} />
      <Route path={R+'apartados'} element={<PrivateRoute id={18}><ProductosApartados /></PrivateRoute>} />
      <Route path={R+'empleados'} element={<PrivateRoute id={41}><Empleados /></PrivateRoute>} />
      <Route path={R+'monedas'} element={<PrivateRoute id={30}><Monedas /></PrivateRoute>} />
      <Route path={R+'informes'} element={<PrivateRoute id={63}><Informes /></PrivateRoute>} />
      <Route path={R+'informesproductos'} element={<PrivateRoute id={64}><InformesProductos /></PrivateRoute>} />
      <Route path={R+'categorias'} element={<PrivateRoute id={10}><Categorias /></PrivateRoute>} />
      <Route path={R+'categorias/new'} element={<PrivateRoute id={11}><CategoriasForm /></PrivateRoute>} />
      <Route path={R+"categorias/edit/:id"} element={<PrivateRoute id={11}><CategoriasForm /></PrivateRoute>} />
      <Route path={R+"proveedores"} element={<PrivateRoute id={14}><Proveedores /></PrivateRoute>} />
      <Route path={R+"marcas"} element={<PrivateRoute id={12}><Marcas /></PrivateRoute>} />
      <Route path={R+'clientes'} element={<PrivateRoute id={28}><Clientes /></PrivateRoute>} />
      <Route path={R+'settings'} element={<PrivateRoute id={36}><Settings /></PrivateRoute>} />
      <Route path={R+'tema'} element={<PrivateRoute id={72}><Tema /></PrivateRoute>} />
      <Route path={R+'productos/bc'} element={<PrivateRoute id={65}><ProductCode /></PrivateRoute>} />  
      <Route path={R+'productos/edit/:id'} element={<PrivateRoute id={9}><ProductEdit /></PrivateRoute>} />
      <Route path={R+'productos/new'} element={<PrivateRoute id={9}><ProductosNew /></PrivateRoute>} />
      <Route path={R+'productos'} element={<PrivateRoute id={34}><Productos /></PrivateRoute>} />
      <Route path={R+'depositos'} element={<PrivateRoute id={39}><Depositos /></PrivateRoute>} />
      <Route path={R+'deposito/:id'} element={<PrivateRoute id={34}><ListaProductos /></PrivateRoute>} />
      <Route path={R+'users'} element={<PrivateRoute id={34}><Users /></PrivateRoute>} />
      <Route path={R+'registrofacturas'} element={<PrivateRoute id={38}><RegistroFacturas /></PrivateRoute>} />
      <Route path={R+'facturas'} element={<PrivateRoute id={5}><Facturas /></PrivateRoute>} />
      <Route path={R+'notaspedidos'} element={<PrivateRoute id={6}><Notas /></PrivateRoute>} />
      <Route path={R+'ventas'} element={<PrivateRoute id={1}><Ventas /></PrivateRoute>} />
      <Route path={R+'dashboard'} element={<PublicRoute><DashBoard /></PublicRoute>} />
      <Route path={R+'info'} element={<PublicRoute><Info /></PublicRoute>} />
      <Route path={R+'cajas'} element={<PrivateRoute id={22}><Cajas /></PrivateRoute>} />
      <Route path={R+'backup'} element={<PrivateRoute id={65}><Backup /></PrivateRoute>} />
      <Route path={R+'notautorized'} element={<NotAutorized />} />
      <Route path={R} element={<LoginForm />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default RoutesMain;
