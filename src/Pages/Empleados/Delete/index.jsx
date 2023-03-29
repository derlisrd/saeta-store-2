import { useState } from "react";
import DialogBorrar from "../../../Components/Dialogos/DialogBorrar";

import { APICALLER } from "../../../Services/api";

import {  useEmpleados } from "../EmpleadosProvider";

function Delete() {

    const {dialogs,llaveDialog,getLista,formSelect,token_user} = useEmpleados()
    const [isLoading,setIsloading]  = useState(false)

    const erase = async()=>{
        setIsloading(true)
        let res = await APICALLER.delete({table:'empleados',id: formSelect.id_empleado,token:token_user})
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