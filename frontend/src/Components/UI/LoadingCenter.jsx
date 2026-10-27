import { CircularProgress, Stack } from '@mui/material'
import React from 'react'

const LoadingCenter = () => {
  return (
    <Stack direction={"column"} alignItems="center" justifyContent="center" sx={{ minHeight:"95vh" }}>
      <CircularProgress />
    </Stack>
  )
}

export default LoadingCenter
