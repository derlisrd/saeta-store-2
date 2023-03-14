import { useLang } from "../../../Contexts/LangProvider";

function useInitialState() {
    const {lang} = useLang()
    const itemscompare = {
        0: "Egreso",
        1: "Ingreso",
        2: "Apertura",
        3: "Cierre",
        4: "Informe",
      }
    const columnsTable = [
        {
          field: "fecha_movimiento",
          title: lang.fecha,
        },
        {
          field: "nombre_caja",
          title: lang.caja,
        },
        {
          field: "tipo_registro",
          title: lang.tipo,
          compareField:"tipo_registro",
          items: itemscompare,
          styleFieldCondition: "tipo_registro",
          styleCondition:{
            0:{backgroundColor:"#dd4632",padding:"6px",borderRadius:"5px",color:'#fff',fontWeight:"bold"},
            1:{backgroundColor:"#00ce4f",padding:"6px",borderRadius:"5px",color:'#006226',fontWeight:"bold"},
            2:{backgroundColor:"#1976d2",padding:"6px",borderRadius:"5px",color:'#fff',fontWeight:"bold"},
            3:{backgroundColor:"#a2a2ce",padding:"6px",borderRadius:"5px",color:'#515168',fontWeight:"bold"},
          },
        },
        
        
        {
          field: "monto_movimiento",
          title: lang.monto,
          isNumber: true,
        },
        {
          field: "monto_sin_efectivo",
          title: lang.sin_efectivo,
          isNumber: true,
        },
        {
          field: "detalles_movimiento",
          title: lang.detalles,
        },
      ]

    return {columnsTable,itemscompare};
}

export default useInitialState;