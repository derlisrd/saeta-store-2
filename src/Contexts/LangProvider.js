import { createContext,useState,useContext } from "react";
import { translate } from "../App/lang/translate";

const LanguageContext = createContext();

export default function LangProvider({children}){

    const [codeLang, setCodeLang] = useState("es");


    const [lang,setLang] = useState(translate?.[codeLang]);

   

    const changeLang = e=>{
        setLang(translate?.[e])
    }

    const values = {
        lang,changeLang,setCodeLang,
    }
    return(
        <LanguageContext.Provider value={values}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLang(){
    const {lang,changeLang,setCodeLang} = useContext(LanguageContext)
    return {lang,changeLang,setCodeLang}
}