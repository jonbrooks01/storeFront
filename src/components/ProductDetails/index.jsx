import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import productSlice, { updateProduct } from '../../store/products';
import addCartSlice from '../../store/cart';
const containerStyle = {
  maxWidth: 800,
  margin: 'auto',
  marginTop: '50px',
};

const cardStyle = {
  width: '100%',
  marginBottom: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
};

const mediaStyle = {
  height: 150,
  objectFit: 'cover', // Ensure the image covers the entire container
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
};

const accordionStyle = {
  width: '100%',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  marginBottom: '20px',
};

const accordionDetailsStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
};

const sliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  vertical: false,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const ProductDetails = () => {
  const { productName } = useParams();
  const productData = useSelector((state) => state.products.productData);
  const addToCart = useSelector((state) => state.addCart.addedProducts);
  const dispatch = useDispatch();
  const productToDisplay = productData.find(
    (product) => product.name === productName
  );

  const relatedItems = productData.filter(
    (item) =>
      item.category === productToDisplay.category &&
      item.name !== productToDisplay.name
  );

  const handleAddToCart = async (product) => {
    const { name, price, inStock } = product;

    const existingProduct = addToCart.find((item) => item.name === name);

    if (existingProduct) {
      // If the product already exists in the cart, decrease its quantity by 1
      if (inStock > 0) {
        dispatch(
          addCartSlice.actions.updateCartItemQuantity({
            name,
            quantity: existingProduct.quantity + 1, // Increment the quantity
          })
        );
        console.log(updateProduct);
        dispatch(updateProduct({ product, amount: -1 }));
        // Dispatch the updateProduct action to decrease in-stock quantity
        await dispatch(
          productSlice.actions.updateProductInState({
            product: { name, price },
            amount: -1, // Decrease the in-stock quantity by 1
          })
        );
      }
    } else {
      // If the product doesn't exist in the cart, add it and decrease in-stock quantity
      const productData = {
        name,
        price,
        quantity: 1, // Initialize the quantity
      };

      dispatch(addCartSlice.actions.addItemToCart(productData));
      // Dispatch the updateProduct action to decrease in-stock quantity
      await dispatch(
        productSlice.actions.updateProductInState({
          product: { name, price },
          amount: -1, // Decrease the in-stock quantity by 1
        })
      );
    }
  };

  return (
    <div style={containerStyle}>
      {productToDisplay && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card style={cardStyle}>
              <CardMedia
                style={mediaStyle}
                image={`http://source.unsplash.com/random?${productToDisplay.name}`}
                title={productToDisplay.name}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {productToDisplay.name}
            </Typography>

            <Accordion style={accordionStyle}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="product-details-content"
                id="product-details-header"
              >
                <Typography variant="h6" color="text.primary">
                  Product Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails style={accordionDetailsStyle}>
                <Typography variant="body1" color="text.primary" paragraph>
                  {productToDisplay.description}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.primary"
                  gutterBottom
                >
                  Category: {productToDisplay.category}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  In Stock: {productToDisplay.inStock}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Typography variant="h5" color="text.primary">
              Price: ${productToDisplay.price}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddToCart(productToDisplay)}
              style={{ marginTop: '16px' }}
            >
              Add To Cart
            </Button>
          </Grid>
        </Grid>
      )}
      {relatedItems.length > 0 && (
        <div>
          <Typography variant="h4" gutterBottom>
            Related Items
          </Typography>
          <Slider {...sliderSettings}>
            {relatedItems.map((item) => (
              <div key={item.name} style={{ margin: '0 8px' }}>
                <Card
                  style={{
                    width: '100%',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                  }}
                >
                  <CardMedia
                    style={mediaStyle}
                    image={`http://source.unsplash.com/random?${item.name}`}
                    title={item.name}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {item.name}
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      Price: ${item.price}
                    </Typography>
                    <RouterLink
                      to={`/productDetails/${item.name}`}
                      style={{
                        display: 'block',
                        marginTop: '8px',
                        textDecoration: 'none',
                        color: '#1976D2', // Set your desired text color
                        fontWeight: 'bold',
                        transition: 'color 0.3s ease-in-out',
                      }}
                      color="primary"
                    >
                      View Details
                    </RouterLink>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
