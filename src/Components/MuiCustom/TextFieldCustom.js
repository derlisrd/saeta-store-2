import TextField  from '@mui/material/TextField';
import { withStyles} from '@mui/styles';
const CustomTextField = withStyles({
    root: {
      '& .MuiInputBase-input': {
        fontSize: 20, 
      },
      "& .MuiOutlinedInput-root":{
        borderRadius:15
      },
      marginTop:10,
      marginBottom:10,
    },
  })(TextField);

const TextFieldCustom = ({...rest}) => {
  return (
    <CustomTextField {...rest}></CustomTextField>
  )
}

export default TextFieldCustom
