import React from 'react';
import ProductsList from '../Products';
import Categories from '../Categories';

const ProductPage = () => {
  return (
    <div
      style={{
        paddingBottom: '60px',
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <Categories />
      <ProductsList />
    </div>
  );
};

export default ProductPage;
