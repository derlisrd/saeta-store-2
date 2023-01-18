import { Icon, Link } from '@mui/material';
import React from 'react'
import { APIURL } from '../../../App/Config/config'
import ButtonCustom from '../../../Components/MuiCustom/ButtonCustom'
//import { useLogin } from '../../../Contexts/LoginProvider'

const Reportes = () => {
    
    const url_excel = APIURL+'generateReport/';
  
    return (
    <>
      <ButtonCustom
                  component={Link}
                  href={url_excel}
                  startIcon={<Icon>picture_as_pdf</Icon>}
                  onClick={()=>{}}
                >
                  PDF
            </ButtonCustom>
    </>
  )
}

export default Reportes
