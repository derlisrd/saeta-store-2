import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, InputLabel, LinearProgress } from '@mui/material'
import { useCajas } from './CajasProvider'
import {useCallback,useEffect,useState} from 'react'
import { APICALLER } from '../../../Services/api'
import { useLogin } from '../../../Contexts/LoginProvider'
import swal from 'sweetalert'

const DialogEditarAsignaciones = () => {

    const {userData} = useLogin()
    const {dialogs,setDialogs,lang,idCaja,listas} = useCajas()
    const [loading,setLoading] = useState(true)
    const [lista,setLista] = useState([])

    const finalizar = async()=>{
      setLoading(true)
      let promesas = [];
      lista.forEach(e=>{
        if(e.check){
          promesas.push(
            APICALLER.updateOrInsert({
              table:'cajas_users',
              id: e.id_cajas_user ?? null,
              token: userData.token_user,
              data: { id_user_caja : e.id_user, id_caja_caja: idCaja }
            }))
        }
      }) 
      let res =  await Promise.all(promesas)
      
      if(res[0].response){
        swal({icon:'success',text:'Agregado con éxito',timer:3000})
      }
      cerrar();
      setLoading(false)
    }


    const changeUsers = e=>{
      let newarray = [...lista]
      let index =  newarray.findIndex(item=> item.id_user === e.target.value)
      if(e.target.checked){
        newarray[index].check = true
      }else{
        newarray[index].check = false
      }
      setLista(newarray)
    }


    const cerrar = ()=>{setDialogs({...dialogs,asignaciones:false})}

    const getDatas = useCallback(async()=>{
        if(dialogs.asignaciones){
            setLoading(true)
            let res = await APICALLER.get({
                table:"cajas_users",
                include:"users",
                on:"id_user,id_user_caja",
                fields:"nombre_user,id_user,id_cajas_user",
                where:`id_caja_caja,=,${idCaja}`
            })
           if(res.response){
              let array = [];
             let result = res.results;
             listas.users.forEach(e=>{
               let i = result.findIndex( index => e.id_user === index.id_user)
               if(i>=0){
                array.push({'id_user': e.id_user,check:true,nombre_user: e.nombre_user,id_cajas_user: result[i].id_cajas_user})
               }else{
                array.push({'id_user': e.id_user,check:false,nombre_user: e.nombre_user,id_cajas_user:null})
               }
             })
             setLista(array)
          }
          setLoading(false)
        }
    },[dialogs.asignaciones,idCaja,listas])


    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) {getDatas();}
        return () => {isActive = false; ca.abort();};
      }, [getDatas]);

  return (
    <Dialog open={dialogs.asignaciones} fullWidth onClose={cerrar}>
      <DialogTitle> {lang.asignaciones} </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>       
            <Grid item xs={12}>
                { loading && <LinearProgress /> }
            </Grid>
            <Grid item xs={12}>
              <InputLabel> {lang.usuarios} </InputLabel>
              {lista.map( (d,i)=>(
                <FormControlLabel key={i} control={<Checkbox checked={d.check} 
                  onChange={changeUsers} value={d.id_user} name={d.id_user} />} 
                  label={d.nombre_user} />
              ))}
            </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' disabled={loading} onClick={finalizar}>{lang.finalizar}</Button>
        <Button variant='outlined' disabled={loading} onClick={cerrar}>{lang.cerrar}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogEditarAsignaciones
