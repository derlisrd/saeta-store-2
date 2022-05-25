import { IconButton,Box,Icon } from '@mui/material';
import React from 'react'
import { useTheme } from '../../../Contexts/TemaProvider'

const Tema = () => {

    const {changeColor,AvaibleColors} = useTheme();

  return (
    <Box>
      {
        AvaibleColors.map((e,i)=>(
          <IconButton key={i} onClick={()=>{changeColor(e.name)}} >
            <Icon sx={{ color:e.color }} >palette</Icon>
          </IconButton>
        ))
      }
    </Box>
  )
}

export default Tema
