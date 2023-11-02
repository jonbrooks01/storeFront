// import React from "react";
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
  const product = useSelector((state) => state.products.selectedProduct);
  const dispatch = useDispatch();
  const handleClose = () => {
    // dispatch the action to update the selected beast
    // it's like setting state, but we ask the store to do it
    // dispatch the action and pass the action the payload
    dispatch(productSlice.actions.showProduct(undefined));
  };
  return (
    <Modal open={product !== undefined} onClose={handleClose}>
      {product ? (
        <Card style={style}>
          {/* <CardMedia
            sx={{ height: 275 }}
            image={product?.image_url}
            title={product?.name}
          /> */}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product?.category}
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
