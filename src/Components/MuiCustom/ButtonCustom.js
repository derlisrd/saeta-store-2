import { withStyles} from '@mui/styles';
import Button from '@mui/material/Button';

const CustomButton = withStyles({
    root: {
      "&.MuiButton-root":{
        padding: '15px',
        fontSize:"0.9rem",
        boxShadow:"8px 7px 4px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
        borderRadius:"10px"  
      },
    },
    label: {
    
    },
  })(Button);

export default function ButtonCustom({children, ...rest}){

    return <CustomButton {...rest} >{children}</CustomButton>
    
}