import { createContext,useState,useContext } from "react";
import { translate } from "../App/lang/translate";

const LanguageContext = createContext();

export default function LangProvider({children}){

    const initialLang = JSON.parse(localStorage.getItem("lang")) || "es";

    const [codeLang, setCodeLang] = useState(initialLang);
    const [lang,setLang] = useState(translate?.[codeLang]);
    const changeLang = e=>{
        setLang(translate?.[e])
        localStorage.setItem("lang", JSON.stringify(e));
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