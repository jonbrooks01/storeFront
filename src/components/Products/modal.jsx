import { Card, CardContent, CardMedia, Modal, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import productSlice from '../../store/products';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ProductModal = () => {
  const selectedProduct = useSelector(
    (state) => state.products.selectedProduct
  );

  const productData = useSelector((state) => state.products.productData);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(productSlice.actions.showProduct(null));
  };

  const productToDisplay = selectedProduct
    ? productData.find((product) => product.name === selectedProduct)
    : null;

  return (
    <Modal open={selectedProduct !== null} onClose={handleClose}>
      {productToDisplay ? (
        <Card style={style}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {productToDisplay.name}
            </Typography>
            <CardMedia
              sx={{ height: 275 }}
              image={`http://source.unsplash.com/random?${productToDisplay.name}`}
              title={productToDisplay.name}
            />
            <Typography variant="body2" color="text.secondary">
              {productToDisplay.category}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <></>
      )}
    </Modal>
  );
};

export default ProductModal;
