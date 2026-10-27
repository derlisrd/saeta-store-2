import { useRef, useState } from 'react';
import { Menu, MenuItem, Fab, ListItemIcon, ListItemText,Icon, Switch, FormControlLabel } from '@mui/material'
import { useProductos } from './ProductosProvider';
import useGoto from '../../../../Hooks/useGoto';
import { APICALLER } from '../../../../Services/api';
import { useLogin } from '../../../../Contexts/LoginProvider';


export default function MoreMenu({rowData}) {
  const ref = useRef(null);
  const {userData} = useLogin()
  const [isOpen, setIsOpen] = useState(false);
  const {getStock,dialogs,setDialogs,lista,setLista,setFormSelect} = useProductos();
  const navigate = useGoto();
  const id = rowData.id_producto;
  const close = () => {setIsOpen(false);}
  const openStock = ()=>{ setDialogs({...dialogs,stock:true}); getStock(rowData); close(); }
  const openDetails = (t)=>{ 
    if(parseInt(t.tipo_producto) === 1){
      navigate.to(`productos/${rowData.id_producto}`)
    }
  }
  const changeDisponible = async(id_product,state)=>{
    
    let newstate = state === '1' ? '0' : '1';
    let l = {...lista}
    let index = l.productos.findIndex(e=> e.id_producto === id_product);
    l.productos[index].disponible_producto = newstate
    setLista(l)
    let res = await APICALLER.update({table:'productos',data:{disponible_producto:newstate},id:id_product,token:userData.token_user})
    if(!res.response){
      console.log(res);
    } 
  }

  const openBorrar = r=>{
    setFormSelect(r)
    setDialogs({...dialogs,borrar:true})
  }
  
  //onClick={()=> {Funciones.goto(`productos/bc?code=${rowData.codigo_producto}`)}} onClick={()=> {openPhoto(rowData)}}
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
        <MenuItem>
        <FormControlLabel
          control={
            <Switch checked={rowData.disponible_producto === "1"} onChange={()=>{changeDisponible(rowData.id_producto,rowData.disponible_producto)}} />
          }
          label="Catálogo"
        />
        </MenuItem>
        <MenuItem onClick={()=>{ openStock(rowData)}}>
          <ListItemIcon><Icon color="success">inventory</Icon></ListItemIcon>
          <ListItemText primary="Stock" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem onClick={()=> { openDetails(rowData) }}  sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
          <Icon color="primary">info</Icon>
          </ListItemIcon>
          <ListItemText primary="Detalles" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem onClick={()=> navigate.to(`productos/edit/${id}`)}  sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
          <Icon color="primary">mode_edit</Icon>
          </ListItemIcon>
          <ListItemText primary="Editar" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem onClick={()=> {navigate.to(`productos/bc?code=${rowData.codigo_producto}&price=${rowData.precio_producto}`)}}  sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
          <Icon color="secondary">qr_code</Icon>
          </ListItemIcon>
          <ListItemText primary="Código de barras" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem onClick={()=>{openBorrar(rowData)}} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
          <Icon color="error">delete_sweep</Icon>
          </ListItemIcon>
          <ListItemText primary="Borrar" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
