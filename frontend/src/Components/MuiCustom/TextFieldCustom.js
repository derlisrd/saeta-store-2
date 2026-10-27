import TextField  from '@mui/material/TextField';
import { withStyles} from '@mui/styles';
const CustomTextField = withStyles({
    root: {
      '& .MuiInputBase-input': {
        fontSize: 18, 
      },
      "& .MuiOutlinedInput-root":{
        borderRadius:12
      },
      marginTop:8,
      marginBottom:8,
    },
  })(TextField);

const TextFieldCustom = ({...rest}) => {
  return (
    <CustomTextField {...rest}></CustomTextField>
  )
}

export default TextFieldCustom
