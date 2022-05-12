import React from 'react';
import ProductFormEditProvider from './ProductFormEditProvider';
import ProductFormEditTabs from './ProductFormEditTabs';

const ProductFormEdit = () => {

    
  return (
    <ProductFormEditProvider>
        <ProductFormEditTabs />
    </ProductFormEditProvider>
  )
}

export default ProductFormEdit