import { useState } from "react";
import DialogBorrar from "../../../../Components/Dialogo/DialogBorrar";
import useQuerys from "../../../../Hooks/useQuerys";
import {  useEmpleados } from "../EmpleadosProvider";

function Delete() {

    const {dialogs,llaveDialog,getLista,formSelect} = useEmpleados()
    const [isLoading,setIsloading]  = useState(false)
    const {borrar} = useQuerys()

    const erase = async()=>{
        setIsloading(true)
        let res = await borrar({table:'empleados',id: formSelect.id_empleado})
        if(res.response){
            getLista()
            close()
        }
        setIsloading(false)
    }

    const close = ()=>{ llaveDialog('delete',false)}

    return (<DialogBorrar open={dialogs.delete} isLoading={isLoading} onClose={close} send={erase} text="Desea borrar este registro?"  />  );
}

export default Delete;