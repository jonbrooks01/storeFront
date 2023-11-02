import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/Products';
import ProductModal from './components/Products/modal';
import Categories from './components/Categories';

const App = () => {
  return (
    <div>
      <Header />
      <Categories />
      <ProductList />
      {/* <ProductModal /> */}
      <Footer />
    </div>
  );
};

export default App;
