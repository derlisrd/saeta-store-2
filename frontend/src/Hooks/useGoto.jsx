import { useNavigate } from "react-router-dom";
import {env} from "../App/Config/config";

export default function useGoto(state=null){
    const navigate = useNavigate()
    const to = u => navigate(env.BASEURL+"/"+u,{state:state});
    return {to};
}