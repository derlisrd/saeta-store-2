import { useComisiones } from "./ComisionesProvider";
import Tablas from '../../../Components/UI/Tablas'
import {columns} from './columns'
import { useLang } from "../../../Contexts/LangProvider";

function ComisionesLista(){

    const {datos,loading} = useComisiones();
    const {lang} = useLang()

    const Acciones = ({rowProps})=>(
        <></>
    )
    const search =(<></>)

    return(<>
        <Tablas
            columns={columns}
            datas={datos.lista}
            Accions={Acciones}
            title={lang.comisiones}
            subtitle=""
            icon={{ name:"people" }}            
            showOptions
            loading={loading.lista}
            inputs={search} 
        />
    </>)
}
export default ComisionesLista;