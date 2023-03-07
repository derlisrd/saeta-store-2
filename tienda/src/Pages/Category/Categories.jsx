import React, { useCallback, useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap';
import Loading from '../../Components/Loading';
import { APICALLER } from '../../Services/api';
import Category from '../Components/Category';

const Categories = () => {

  const [loading, setLoading] = useState(true);
  const [lista, setLista] = useState([]);

  const getLista = useCallback(async () => {
    setLoading(true);
    let res = await APICALLER.get({
      table: "categorias",
      include: "productos,productos_images",
      on: "id_categoria,id_categoria_producto,id_producto,id_image_producto",
      fields:"nombre_categoria,id_categoria,url_imagen",
      where: "portada_imagen_producto,=,1,and,tipo_producto,=,1,and,tipo_categoria,=,1",
      sort:'id_producto'
    });
    if (res.response) {
      //setLista(res.results);
      let array = [];
      res.results.forEach(e=>{
        let i = array.findIndex(elem=> elem.id_categoria === e.id_categoria )
        if(i<0){
          array.push({nombre_categoria:e.nombre_categoria,id_categoria:e.id_categoria,url_imagen:e.url_imagen})
        }
        setLista(array)
      })
    }
    setLoading(false);
  }, []);

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
    <Row>
      <Col xs={12}>
        <h1 className="text-center text-muted mt-5">Categorías</h1>
      </Col>
      <Col xs={12}>
      <Row className="gy-5 mx-auto mt-1">
        <Category lista={lista} />
      </Row>
      </Col>
    </Row>
  )
}

export default Categories
