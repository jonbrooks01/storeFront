import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/Products';
import Categories from './components/Categories';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProducts } from './store/products';
import { getCategory } from './store/active-category';

const App = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.products.productData);
  useEffect(() => {
    // console.log('useEffect');
    dispatch(getProducts());
    dispatch(getCategory());
  }, [dispatch]);

  // console.log(productData);
  return (
    <div>
      <Header />

      <Categories />
      <ProductList />

      <Footer />
    </div>
  );
};

export default App;
