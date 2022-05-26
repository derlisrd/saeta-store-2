import React from 'react';
import ProductFormEditProvider from './ProductFormEditProvider';
import ProductFormEditTabs from './ProductFormEditTabs';

const ProductEdit = () => {

    
  return (
    <ProductFormEditProvider>
        <ProductFormEditTabs />
    </ProductFormEditProvider>
  )
}

export default ProductEdit