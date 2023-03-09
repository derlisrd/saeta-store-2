import { Box, CircularProgress } from "@mui/material"


const TablaLoading = () => {
  return (
    <Box sx={{ display: 'flex',width:"100%",alignItems:"center",justifyContent:"center" }}>
      <CircularProgress />
    </Box>
  )
}

export default TablaLoading
