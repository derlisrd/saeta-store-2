import { useNavigate } from "react-router-dom";
import {env} from "../App/Config/config";

export default function useGoto(){

    const navigate = useNavigate()
    const to = u => navigate(env.BASEURL+"/"+u);
    return {to};
}