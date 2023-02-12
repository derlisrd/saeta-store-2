import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import Loading from '../../Components/Loading';
import ScrollToTop from '../../Components/ScrollTop';
import { APICALLER } from '../../Services/api';
import Listado from './Listado';

const Category = () => {
    const search = useParams();
    const {id} = search
    const [loading, setLoading] = useState(true);
    const [lista, setLista] = useState([]);
    const [category,setCategory] = useState('')

    const getLista = useCallback(async () => {
      setLoading(true);
      let res = await APICALLER.get({
        table: "productos",
        include: "productos_images,categorias",
        on: "id_producto,id_image_producto,id_categoria_producto,id_categoria",
        fields:"nombre_producto,id_producto,precio_producto,url_imagen,disponible_producto,nombre_categoria",
        where: `portada_imagen_producto,=,1,and,tipo_producto,=,1,and,id_categoria_producto,=,${id}`,
      });
      if (res.response && res.found>0) {
        setLista(res.results);
        setCategory(res.results[0].nombre_categoria)
      }
      setLoading(false);
    }, [id]);
  
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
      <ScrollToTop />
        <Row className="gy-1 mt-3 mx-auto">
          <Col xs={12}>
            <h3 className="text-uppercase text-muted text-center my-4"> Categoria {category}  </h3>
          </Col>
        </Row>
        <Row className="gy-5 mx-auto">
          <Listado lista={lista} />
        </Row>
      </>
    );


}

export default Category
