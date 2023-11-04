import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import addCartSlice from '../../store/cart';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
// import './Cart.scss'; // Import your SCSS file for styling

const Cart = () => {
  const [isRemoving, setIsRemoving] = useState(false);
  const dispatch = useDispatch();
  const addToCart = useSelector((state) => state.addCart.addedProducts);

  const handleDelete = (e, product) => {
    setIsRemoving(true);
    console.log(product);
    dispatch(addCartSlice.actions.removeItemFromCart(product));
  };

  return (
    <div>
      {addToCart.map((product, index) => (
        <div
          key={index}
          className={`cart-item ${isRemoving ? 'removing' : ''}`}
        >
          <div>
            {product.name} - {product.quantity}
          </div>
          {isRemoving ? (
            <div className="remove-animation">
              <IconButton className="remove-button">
                <CloseIcon />
              </IconButton>
            </div>
          ) : (
            <Button
              onClick={(e) => handleDelete(e, product)}
              variant="contained"
              color="error"
              size="small"
              startIcon={<DeleteIcon />}
            ></Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Cart;
