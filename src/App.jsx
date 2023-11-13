import Header from './components/Header';
import Footer from './components/Footer';
import ProductPage from './components/ProductPage';
import Home from './components/Home';
import Categories from './components/Categories';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProducts } from './store/products';
import { getCategory } from './store/active-category';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';

import ShoppingCart from './components/ShoppingCart';
import ProductDetails from './components/ProductDetails';

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
      <Router>
        <Header />

        {/* <NavBar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route
            path="/productDetails/:productName"
            element={<ProductDetails />}
          />
          <Route path="/shoppingCart" element={<ShoppingCart />} />
        </Routes>
      </Router>
      {/* <ProductList /> */}

      <Footer />
    </div>
  );
};

export default App;
