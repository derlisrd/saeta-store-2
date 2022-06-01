import {Dialog,DialogContent,DialogTitle,Icon,DialogActions,Button,TextField,InputAdornment,LinearProgress,Grid,Select,MenuItem,FormControl,InputLabel,} from "@mui/material";
import { Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import swal from "sweetalert";
import { APICALLER } from "../../../Services/api";
import { useLogin } from "../../../Contexts/LoginProvider";
import useGoto from "../../../Hooks/useGoto";
import { useLang } from "../../../Contexts/LangProvider";

const CategoriasForm = () => {
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
  };
  const [formulario, setFormulario] = useState(initial);
  const initialError = {
    nombre_categoria: false,
    error: false,
    errorMsj: lang.complete_campo_correctamente,
  };
  const [formErrores, setFormErrores] = useState(initialError);
  const cerrar = () => go.to(`categorias`);

  const handlerOnChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const enviarForm = async (e) => {
    e.preventDefault();

    if (formulario.nombre_categoria.length < 2) {
      setFormErrores({ ...formErrores, nombre_categoria: true, error: true });
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
      if(res.response === "ok"){
        swal({ icon: "success", text: "Actualizado",timer:1300 }).then(()=>{
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
      if (res.response === "ok") {
        swal({ icon: "success", text: "Agregado",timer:1300 })
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
    setCargando(true);
    const sto = JSON.parse(localStorage.getItem("dataProductos"));
      if (id) {
        if(sto===null){
          
          let resTodes = await APICALLER.get({
            table: `categorias`,
            fields: `id_categoria,nombre_categoria,id_padre_categoria`,
            where:`id_categoria,!=,${id}`,
            sort:"-nombre_categoria",
          });
          setListaCategorias(resTodes.results);
          let res = await APICALLER.get({
            table: `categorias`,
            where: `id_categoria,=,${id}`,
            sort:"-nombre_categoria",
          });
          setFormulario({
            id_categoria: id,
            id_padre_categoria: res.results[0].id_padre_categoria,
            nombre_categoria: res.results[0].nombre_categoria,
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
                onChange={handlerOnChange}
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
                disabled={cargando}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel variant="outlined">Categoría padre</InputLabel>
                <Select
                  name="id_padre_categoria"
                  value={formulario.id_padre_categoria}
                  onChange={handlerOnChange}
                  variant="outlined"
                  disabled={cargando}
                >
                  <MenuItem value="0">Ninguno</MenuItem>
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
            color="primary"
            variant="outlined"
            disabled={cargando}
          >
            GUARDAR
          </Button>
          <Button onClick={cerrar} variant="outlined" disabled={cargando}>
            CERRAR
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CategoriasForm;
