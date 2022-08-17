import { Avatar, Box, Icon, Stack, Typography } from '@mui/material'
import React from 'react'

const TableInfo = ({icon,title,subtitle}) => {
  return (
    <Box padding={1} margin={1} >
    <Stack direction="row" spacing={2}>
        <Box>
            <Avatar variant="rounded" sx={{ bgcolor: icon?.color ? icon.color : 'primary.main',padding:3 }} >
                {icon && <Icon fontSize="large" >{icon.name}</Icon>}
            </Avatar>
        </Box>
        <Box>
            <Typography variant='h6'>{title}</Typography>
            <Typography variant='caption'>{subtitle}</Typography>
        </Box>
    </Stack>
</Box>
  )
}

export default TableInfo
