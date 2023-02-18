import { Grid, TextField } from "@mui/material"
import { useState } from "react"
import { useWeb } from "./WebProvider"


const DatosWeb = () => {
  const {lang} = useWeb()
  const formInitial = {
    site_name:''
  }
  const onChange = e=>{
    const {value,name} = e.target
    setForm({...form,[name]:value})
  }

  const [form,setForm] = useState(formInitial)
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField fullWidth autoFocus value={form.site_name} name='site_name' onChange={onChange} label={lang.site_name}  />
      </Grid>
    </Grid>
  )
}

export default DatosWeb
