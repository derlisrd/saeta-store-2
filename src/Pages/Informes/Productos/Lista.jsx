import Tablas from "../../../Components/UI/Tablas";
import { useInformesProductos } from "./InformesProductosProvider";

function Lista() {
    
    const {loadings,listas,lang} = useInformesProductos()
    const columns = [];
    
    
    
    const Acciones = ({rowProps})=>(
        <></>
    )

    const filters = (
        <>
        </>
    );


    return (<Tablas
        title={lang.cotizaciones_monedas}
        subtitle={``}
        icon={{ name:"people" }}
        columns={columns}
        loading={loadings.listas}
        datas={listas.productos_vendidos}
        Accions={Acciones}
        inputs={filters}
        lang={lang}
        showOptions
    /> );
}

export default Lista;