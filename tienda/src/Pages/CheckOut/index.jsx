import React, { useEffect, useState } from "react";

import Loading from "../../Components/Loading";
import { useCart } from "../../Providers/CartProvider";
import { APICALLER } from "../../Services/api";
import Done from "./Done";
import Formu from "./Formu";

const CheckOut = () => {
  const {setearCart,cart} = useCart()
  const [error,setError]= useState({
    active:false,
    code:0,
    message:''
  })
  const [isLoading,setIsLoading] = useState(false)
  const [done,setDone] = useState({active:false,message:''})
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

  const enviarPedido = async()=>{
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
    setIsLoading(true)
    let res = await APICALLER.insert({table:'pedidos'})
    if(res.response){
      setearCart({items:[],total:0})
    }
    setIsLoading(false)
    setDone({active:true,message:'Pedido realizado con exito !'})
    
  }


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])



  if(isLoading){
    return <Loading />
  }



  return (
    <>
      {done.active ? <Done message={done.message} /> : <Formu total={cart.total} enviarPedido={enviarPedido} setForm={setForm} form={form} change={change} error={error} />}
    </>
  );
};

export default CheckOut;
