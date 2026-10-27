import {Dialog,DialogContent,DialogTitle,Icon,DialogActions,Button,TextField,InputAdornment,LinearProgress,Grid,Select,MenuItem,FormControl,InputLabel, FormLabel, FormControlLabel, Radio,} from "@mui/material";
import { Alert } from "@mui/material";
import { useParams,useLocation } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import swal from "sweetalert";
import { APICALLER } from "../../../Services/api";
import { useLogin } from "../../../Contexts/LoginProvider";
import useGoto from "../../../Hooks/useGoto";
import { useLang } from "../../../Contexts/LangProvider";

const CategoriasForm = () => {

  const location = useLocation()
  console.log(location.state)
  const { id } = useParams();
  const {lang} = useLang()
  const storage = JSON.parse(localStorage.getItem("dataProductos"));
  const inputNombreCategoria = useRef(null);
  const go = useGoto()
  const {userData} = useLogin();
  const { token_user } = userData
  const [listaCategorias, setListaCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);

  const initial = {
    id_categoria: "",
    nombre_categoria: "",
    id_padre_categoria: "0",
    tipo_categoria:"1"
  };
  const [formulario, setFormulario] = useState(initial);
  const initialError = {
    nombre_categoria: false,
    error: false,
    errorMsj: lang.complete_campo_correctamente, id:null
  };
  const [formErrores, setFormErrores] = useState(initialError);
  const cerrar = () => go.to(`categorias`);

  const change = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const enviarForm = async (e) => {
    e.preventDefault();

    if (formulario.nombre_categoria.length < 2) {
      setFormErrores({ ...formErrores, nombre_categoria: true, error: true,id:"nombre" });
      return false;
    }
    setCargando(true);
    setFormErrores({ ...formErrores, nombre_categoria: false, error: false });
    
    if (id) {
      const res = await APICALLER.update({
        table: `categorias`,
        data: formulario,
        token: token_user,
        id: id,
      });
      if(res.response){
        swal({ icon: "success", text: lang.actualizado_correctamente,timer:1300 }).then(()=>{
        if(storage){
          let array = {...storage}
          let index = array.categorias.findIndex(e=> e.id_categoria === id);
          array.categorias[index].nombre_categoria = formulario.nombre_categoria;
          localStorage.setItem("dataProductos",JSON.stringify(array));
        }
        setFormulario(initial);
        cerrar();
        })
      } 
        
    } else {
      delete formulario.id_categoria;
      const res = await APICALLER.insert({
        table: "categorias",
        data: formulario,
        token: token_user,
      });
      if (res.response ) {
        swal({ icon: "success", text:lang.agregado_correctamente,timer:1300 })
        if(storage){
            let array = {...storage}
            let nuevo = {nombre_categoria: formulario.nombre_categoria, id_categoria:res.last_id}
            array.categorias.push(nuevo);
            localStorage.setItem("dataProductos",JSON.stringify(array));
          }
        setFormulario(initial);
      }
    }
    //getLista() VOLVER A LA PARTE PRINCIPAL
    setCargando(false);
    
  };

  const cargar = useCallback(async()=>{
    const sto = JSON.parse(localStorage.getItem("dataProductos"));
      if (id) {
        if(sto===null){
          let resTodes = await APICALLER.get({
            table: `categorias`,
            fields: `id_categoria,nombre_categoria,id_padre_categoria,tipo_categoria`,
            where:`id_categoria,!=,${id}`,
            sort:"-nombre_categoria",
          });
          setListaCategorias(resTodes.results);
          let res = await APICALLER.get({
            table: `categorias`,
            where: `id_categoria,=,${id}`,
            sort:"-nombre_categoria",
          });
          let rescategoria = res.results[0]
          
          setFormulario({
            id_categoria: id,
            id_padre_categoria: rescategoria.id_padre_categoria,
            nombre_categoria: rescategoria.nombre_categoria,
            tipo_categoria: rescategoria.tipo_categoria
          });

          
        }
        else{
          let filter = sto.categorias.filter(e=> e.id_categoria !== id);
          setListaCategorias(filter);
          let index = sto.categorias.findIndex(e=> e.id_categoria === id)
          setFormulario({
            id_categoria: id,
            nombre_categoria: sto.categorias[index].nombre_categoria,
            id_padre_categoria: sto.categorias[index].id_padre_categoria
          })
        }
      }
      else{
        if(sto){
          setListaCategorias(sto.categorias);
        } 
        else{
          let resTodes = await APICALLER.get({
            table: `categorias`,
            fields: `id_categoria,nombre_categoria,id_padre_categoria`,
          });
          setListaCategorias(resTodes.results);
        }
      }
      setCargando(false);
      //inputNombreCategoria.current.focus();
  },[id]);

  useEffect(() => {
    let isActive = true;
    const ca = new AbortController()
    if(isActive){
      cargar();
    }

    return () => {
      isActive = false;
      ca.abort();
    };
  }, [cargar]);

  return (
    <Dialog fullWidth open={true} onClose={cerrar}>
      <form onSubmit={enviarForm}>
        <DialogTitle>
          {lang.agregar}
        </DialogTitle>
        <DialogContent dividers>
          
          {formErrores.error && (
            <Alert severity="error">{formErrores.errorMsj}</Alert>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12}>
            {cargando && <LinearProgress  />}
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                inputRef={inputNombreCategoria}
                onChange={change}
                label={lang.nombre}
                autoComplete="off"
                name="nombre_categoria"
                value={formulario.nombre_categoria}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon color="action">inventory_2</Icon>
                    </InputAdornment>
                  ),
                }}
                fullWidth
                required
                error={formErrores.nombre_categoria}
                
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel component="legend">{lang.tipo}:</FormLabel>
              <FormControlLabel
                value="1"
                control={
                  <Radio name="tipo_categoria" checked={formulario.tipo_categoria === "1"}  onChange={change}  color="primary"  />
                }
                label="Artículo"
                labelPlacement="end"
              />
              <FormControlLabel
                value="2"
                control={
                  <Radio name="tipo_categoria" checked={formulario.tipo_categoria === "2"} onChange={change} color="primary" />
                }
                label="Servicio"
                labelPlacement="end"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel variant="outlined">{lang.categoria_padre}</InputLabel>
                <Select
                  name="id_padre_categoria"
                  value={formulario.id_padre_categoria}
                  onChange={change}
                  disabled={cargando}
                >
                  <MenuItem value="0">{lang.ninguno}</MenuItem>
                  {listaCategorias.map((d) => (
                    <MenuItem key={d.id_categoria} value={d.id_categoria}>
                      {d.nombre_categoria}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            disabled={cargando}
          >
            {lang.guardar}
          </Button>
          <Button onClick={cerrar} variant="contained" disabled={cargando}>
            {lang.cerrar}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CategoriasForm;
