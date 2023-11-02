import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/Products';
import ProductModal from './components/Products/modal';
import Categories from './components/Categories';
import Cart from './components/SimpleCart';

const App = () => {
  return (
    <div>
      <Header />
      {/* <Cart /> */}
      <Categories />
      <ProductList />
      {/* <ProductModal /> */}
      <Footer />
    </div>
  );
};

export default App;
