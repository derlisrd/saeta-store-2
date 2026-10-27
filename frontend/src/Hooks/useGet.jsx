import { useEffect, useState } from "react";
import { APIURL,SECRETO,XAPITOKEN } from "../App/Config/config";
import CryptoJS from 'crypto-js';
const DescifrarTexto = (text) =>  CryptoJS.AES.decrypt(text, SECRETO).toString(CryptoJS.enc.Utf8);

function useGet({table,sort = "",pagenumber = "",pagesize = "",fields = "",where = "",include = "",on = "",token = "",filtersSearch = "",filtersField = ""}) {

    const [isLoading,setIsLoading] = useState(true)
    const [data,setDatas] = useState(null)
    const [error,setError] = useState(null)
    const tk = DescifrarTexto(token);
    const url = `${APIURL}${table}?where=${where}&sort=${sort}&page[number]=${pagenumber}&page[size]=${pagesize}&fields=${fields}&include=${include}&on=${on}&token=${tk}&filters[search]=${filtersSearch}&filters[field]=${filtersField}`;

    useEffect(()=>{
        const abortController = new AbortController();
        setIsLoading(true)
        fetch(url,{ signal: abortController.signal,
            headers: { "X-Api-Token": XAPITOKEN }})
            .then(res => res.json())
            .then(data=> setDatas(data))
            .catch(e=> setError(e))
            .finally(()=> setIsLoading(false))
        return ()=>{ new AbortController();}
    },[url])

    return {isLoading,data,error}
}

export default useGet;