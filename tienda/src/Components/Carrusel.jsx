import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import React from 'react'

const Carrusel = ({items, ...rest}) => {
    return (
        <MDBCarousel showControls {...rest}>
          {items.map((e,i)=>(
            <MDBCarouselItem
            itemId={i}
            className='w-100 d-block'
            key={i}
            src={e.url_imagen}
            alt={e.url_imagen}
          />
          ))}
        </MDBCarousel>
      );
}

export default Carrusel
