import useGet from "../../../Hooks/useGet";

function Turnos() {
  const {isLoading,data,error} = useGet({table:'clientes',pagesize:5,pagenumber:0})

  console.log(isLoading,data,error);

  return (<></>  );
}

export default Turnos;