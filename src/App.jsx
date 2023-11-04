import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/Products';
import Categories from './components/Categories';

const App = () => {
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
