import React, { useEffect, useState } from "react";

import Loading from "../../Components/Loading";
import { useCart } from "../../Providers/CartProvider";
import Done from "./Done";
import Formu from "./Formu";

const CheckOut = () => {

  const [error,setError]= useState({
    active:false,
    code:0,
    message:''
  })
  const [isLoading,setIsLoading] = useState(false)
  const [done,setDone] = useState(false)
  const initialForm = {
    nombre_pedido: "",
    email_pedido: "",
    doc_pedido:"",
    whatsapp_pedido: "",
    entrega_pedido: 1, // 0 es retira
    direccion_pedido: "",
    obs_pedido: "",
  };

  const [form, setForm] = useState(initialForm);

  const change = e=>{
    setForm({...form,[e.target.name]:e.target.value})
  }

  const enviarPedido =()=>{
    window.scrollTo(0, 0);
    if(form.nombre_pedido === ""){
      setError({active:true,code:1,message:'Complete el nombre por favor'})
      return false;
    }
    if(form.whatsapp_pedido === ""){
      setError({active:true,code:3,message:'Complete el whatsapp por favor'})
      return false;
    }
    if(form.direccion_pedido === "" && form.entrega_pedido===1){
      setError({active:true,code:4,message:'Complete la dirección por favor'})
      return false;
    }

    setError({active:false,code:0,message:''})
    //setIsLoading(true)

    setDone(true)
    
  }


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])



  if(isLoading){
    return <Loading />
  }



  return (
    <>
      {done ? <Done /> : <Formu enviarPedido={enviarPedido} setForm={setForm} form={form} change={change} error={error} />}
    </>
  );
};

export default CheckOut;
