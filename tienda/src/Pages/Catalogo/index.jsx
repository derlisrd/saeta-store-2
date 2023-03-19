import { useState, useEffect, useCallback } from "react";
import { Col,Row } from "reactstrap";
import Loading from "../../Components/Loading";
import { APICALLER } from "../../Services/api";
import Listado from "./Listado";
import Search from "./Search";

const Catalogo = () => {

  

  const [loading, setLoading] = useState(true);
  const [lista, setLista] = useState([]);
  const [search, setSearch] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    let res = await APICALLER.get({
      filtersField: "nombre_producto,codigo_producto",
      filtersSearch: `${search}`,
      table: "productos",
      include: "productos_images,categorias",
      on: "id_producto,id_image_producto,id_categoria_producto,id_categoria",
      fields:
        "nombre_producto,id_producto,precio_producto,url_imagen,disponible_producto,nombre_categoria",
      where: "portada_imagen_producto,=,1,and,tipo_producto,=,1",
    });
    if (res.response) {
      setLista(res.results);
      //console.log(res.results);
    }
    setLoading(false);
  }

  const verLista = async () => {
    setSearch("");
    getLista();
  };

  const setearLista = useCallback((lista)=>{
        setLista(lista)
        const ahoraTime = new Date();
        let json = {
          time: ahoraTime,
          productos:lista
        }
        localStorage.setItem("catalogo_cache",JSON.stringify(json))
      },[])



  const getLista = useCallback(async () => {
    setLoading(true);
    
    let storage = JSON.parse( localStorage.getItem('catalogo_cache') );
    
    if(!storage ){
      let res = await APICALLER.get({
        table: "productos",
        sort:'id_producto',
        include: "productos_images,categorias",
        on: "id_producto,id_image_producto,id_categoria_producto,id_categoria",
        fields:
          "nombre_producto,id_producto,precio_producto,url_imagen,disponible_producto,nombre_categoria",
        where: "portada_imagen_producto,=,1,and,tipo_producto,=,1",
      });
      if (res.response) {
        setearLista(res.results)
      }
    }else{
      let ahora = new Date();
      let time_cache = 120000;
      let fecha_storage = new Date(storage && storage.time )
      let diferencia = ahora.getTime() - fecha_storage.getTime()
      if(diferencia > time_cache){
        let res = await APICALLER.get({
          table: "productos",
          include: "productos_images,categorias",
          on: "id_producto,id_image_producto,id_categoria_producto,id_categoria",
          fields:
            "nombre_producto,id_producto,precio_producto,url_imagen,disponible_producto,nombre_categoria",
          where: "portada_imagen_producto,=,1,and,tipo_producto,=,1",
        });
        if (res.response) {
          setearLista(res.results)
        }
      }
      else{
        setearLista(storage.productos)
      }
      
    }

    setLoading(false);
  }, [setearLista]);



  useEffect(() => {
    let isActive = true;
    const ca = new AbortController();
    if (isActive) {
      getLista();
    }
    return () => {
      isActive = false;
      ca.abort();
    };
  }, [getLista]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Row className="gy-1 mt-3 mx-auto">
        <Col xs={12}>
          <Search handleSubmit={handleSubmit} search={search} setSearch={setSearch} verLista={verLista} />
        </Col>
        <Col xs={12}>
          <h3 className="text-uppercase text-muted text-center my-4">Productos</h3>
        </Col>
      </Row>
      <Row className="gy-5 mx-auto">
        <Listado lista={lista} />
      </Row>
    </>
  );
};

export default Catalogo;
