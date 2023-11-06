import { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import productSlice from '../../store/products';
import { updateProduct } from '../../store/products';
import addCartSlice from '../../store/cart';
import ProductModal from './modal';

const Products = ({ product }) => {
  const dispatch = useDispatch();
  const addToCart = useSelector((state) => state.addCart.addedProducts);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
    dispatch(productSlice.actions.showProduct(product.name));
  };

  const handleAdd = async (product) => {
    const existingProduct = addToCart.find(
      (item) => item.name === product.name
    );

    if (existingProduct) {
      // If the product already exists in the cart, decrease its quantity by 1
      if (product.inStock > 0) {
        dispatch(
          addCartSlice.actions.updateCartItemQuantity({
            name: product.name,
            quantity: existingProduct.quantity + 1, // Increment the quantity
          })
        );
        // Dispatch the updateProduct action to decrease in-stock quantity
        await dispatch(
          productSlice.actions.updateProduct({
            product: product,
            amount: -1, // Decrease the in-stock quantity by 1
          })
        );
      }
    } else {
      // If the product doesn't exist in the cart, add it and decrease in-stock quantity
      const productData = {
        name: product.name,
        price: product.price,
        quantity: 1, // Initialize the quantity
      };
      dispatch(addCartSlice.actions.addItemToCart(productData));
      // Dispatch the updateProduct action to decrease in-stock quantity
      await dispatch(
        productSlice.actions.updateProduct({
          product: product,
          amount: -1, // Decrease the in-stock quantity by 1
        })
      );
    }
  };

  return (
    <Grid item xs={'auto'}>
      <Card align="center">
        {/* <CardMedia
          sx={{ height: 275 }}
          // image={beast.image_url}
          // title={products.name}
        /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: ${product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Item Quantity: {product.inStock}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => handleAdd(product)}>
            Add To Cart
          </Button>
          <Button size="small" onClick={handleClick}>
            Quick View
          </Button>
        </CardActions>
      </Card>
      <ProductModal
        product={product}
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
    </Grid>
  );
};

const ProductsList = () => {
  const productData = useSelector((state) => state.products.productData);
  // console.log(productData);

  const categoryOfProducts = useSelector((state) => {
    const categoryId = state.category.activeCategory;
    const category = state.category.categories.find(
      (cat) => cat._id === categoryId
    );
    return category ? category.name : 'all'; // Use 'All' as a fallback if no category is found
  });
  return (
    <div>
      <Grid container spacing={2} marginTop={'16px'}>
        {productData
          .filter(
            (p) =>
              p.category === categoryOfProducts || categoryOfProducts === 'all'
          )
          .map((product) => (
            <Products key={product.name} product={product} />
          ))}
      </Grid>
    </div>
  );
};

export default ProductsList;
