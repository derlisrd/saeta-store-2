import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import {  Button, Col, Row } from 'reactstrap';
import Loading from '../../Components/Loading';
import ScrollToTop from '../../Components/ScrollTop';
import { APICALLER } from '../../Services/api';
import Relacionados from './Relacionados';
import Carrusel from './Carrusel';
import Informacion from './Informacion';

const Producto = () => {

    const [loading,setLoading] = useState(true)
    const [listas,setListas] = useState({
        producto:{},
        images:[],
        relacionados: [],
        stock:0
    })

    const search = useParams();
    const {id} = search
    

    const getLista = useCallback(async () => {
      window.scrollTo(0, 0);
        setLoading(true)
        let [pro,ima,dep] = await Promise.all([APICALLER.get({
            table: "productos",
            include:'categorias',
            on:'id_categoria,id_categoria_producto',
            fields: "nombre_producto,id_producto,precio_producto,descripcion_producto,id_categoria_producto,nombre_categoria,disponible_producto,codigo_producto",
            where:`id_producto,=,${id}`
          }),
          APICALLER.get({
            table: "productos_images",
            fields: "url_imagen,image_name",
            where:`id_image_producto,=,${id}`,
          }),
          APICALLER.get({
            table: "productos_depositos",
            fields: "SUM(stock_producto_deposito) as stock",
            where:`id_producto_deposito,=,${id}`,
          })
        ]);
        if (pro.response && pro.found>0) {
          let id_category = pro.results[0].id_categoria_producto;
          let rel = await APICALLER.get({
            table: "productos",
            include: "productos_images",
            on: "id_producto,id_image_producto",
            fields: "nombre_producto,id_producto,precio_producto,url_imagen,codigo_producto",
            pagesize:4,
            where: `portada_imagen_producto,=,1,and,tipo_producto,=,1,and,id_categoria_producto,=,${id_category},and,id_producto,<>,${id}`,
          });
          //console.log(dep)
          setListas({
            images: ima.results,
            producto: pro.results[0],
            relacionados: rel.response ? rel.results : [],
            stock:dep.first.stock
          });

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





      if(loading){
        return <Loading />
      }

  return (
    <>
    <ScrollToTop />
    <Row className='mt-4 g-4' >
      <Col xs={12}>
        <Button color='primary' size='sm' className='rounded' outline tag={Link} to='/catalogo'>Ver Todos</Button>
      </Col>
    <Col xs={12} sm={12} md={6}>
      <Carrusel items={listas.images} />
    </Col>
    <Col xs={12} sm={12} md={6}>
      <Informacion info={listas.producto} image={listas.images[0]} stock={listas.stock} />
    </Col>
    
    <Col xs={12}>
      <Relacionados lista={listas.relacionados} />
    </Col>
    </Row>
    </>
  )
}

export default Producto
