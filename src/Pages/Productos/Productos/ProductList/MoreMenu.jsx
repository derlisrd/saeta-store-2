import { useRef, useState } from 'react';
import { Menu, MenuItem, Fab, ListItemIcon, ListItemText,Icon } from '@mui/material'
import { useProductos } from './ProductosProvider';
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../../../../Config/globales";
import  Funciones  from "../../../../Funciones";

export default function MoreMenu({borrar,abrir,filaProps}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const {borrarRegistro,page,getStock,dialogs,setDialogs} = useProductos();
  const navigate = useNavigate();
  const id = filaProps.id_producto;
  const close = () => {setIsOpen(false);}
  const openStock = ()=>{ setDialogs({...dialogs,stock:true}); getStock(filaProps); close(); }
  //onClick={()=> {Funciones.goto(`productos/bc?code=${filaProps.codigo_producto}`)}} onClick={()=> {openPhoto(filaProps)}}
  return (
    <>
      <Fab size='small' ref={ref} onClick={() => setIsOpen(true)}>
        <Icon color="info">more_horiz</Icon>
      </Fab>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={close}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={()=>{ openStock(filaProps)}}>
          <ListItemIcon><Icon color="success">inventory</Icon></ListItemIcon>
          <ListItemText primary="Stock" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem onClick={()=> navigate(`${BASEURL}/productos/new/${id}`,{state:{page:page}})}  sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
          <Icon color="primary">mode_edit</Icon>
          </ListItemIcon>
          <ListItemText primary="Editar" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem onClick={()=> {Funciones.goto(`productos/bc?code=${filaProps.codigo_producto}`)}}  sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
          <Icon color="secondary">qr_code</Icon>
          </ListItemIcon>
          <ListItemText primary="Código de barras" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem onClick={()=>{borrarRegistro(filaProps.id_producto,filaProps.nombre_producto)}} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
          <Icon color="error">delete_sweep</Icon>
          </ListItemIcon>
          <ListItemText primary="Borrar" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
