import { Stack,IconButton,Icon } from '@mui/material'

const Accions = ({rowProps}) => {

  const open = (e)=>{
    console.log(e);
  }

  return (
    <Stack direction="row">
      <IconButton onClick={()=>{ open(rowProps) }}>
        <Icon>receipt</Icon>
      </IconButton>
    </Stack>
  )
}

export default Accions
