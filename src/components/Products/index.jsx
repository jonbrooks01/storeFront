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

const Products = ({ product }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(productSlice.actions.showProduct(product));
  };

  // if (!products || !products.category) {
  //   return <div>No product data available</div>;
  // }

  return (
    <Grid item xs={3}>
      <Card>
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
            {product.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleClick}>
            Select
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

const ProductsList = () => {
  const productData = useSelector((state) => state.products.productData);
  const categoryOfProducts = useSelector(
    (state) => state.category.activeCategory
  );
  console.log(categoryOfProducts);
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
