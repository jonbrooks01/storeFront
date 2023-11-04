import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import addCartSlice from '../../store/cart';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
// import './Cart.scss'; // Import your SCSS file for styling

const Cart = () => {
  // const [isRemoving, setIsRemoving] = useState(false);
  const dispatch = useDispatch();
  const addToCart = useSelector((state) => state.addCart.addedProducts);

  const handleDelete = (product, quantityToRemove) => {
    // Check if the product exists in the cart
    const existingProduct = addToCart.find(
      (item) => item.name === product.name
    );

    if (existingProduct) {
      // Calculate the new quantity
      const newQuantity = existingProduct.quantity - quantityToRemove;

      if (newQuantity <= 0) {
        // If the new quantity is zero or negative, remove the product from the cart
        dispatch(addCartSlice.actions.removeItemFromCart(product));
      } else {
        // Update the quantity of the product in the cart
        dispatch(
          addCartSlice.actions.updateCartItemQuantity({
            name: product.name,
            quantity: newQuantity,
          })
        );
      }
    }
  };

  const handleAdd = (product, quantityToAdd) => {
    // Check if the product exists in the cart
    const existingProduct = addToCart.find(
      (item) => item.name === product.name
    );

    if (existingProduct) {
      // Calculate the new quantity
      const newQuantity = existingProduct.quantity + quantityToAdd;

      // Update the quantity of the product in the cart
      dispatch(
        addCartSlice.actions.updateCartItemQuantity({
          name: product.name,
          quantity: newQuantity,
        })
      );
    }
  };

  const calculateTotal = () => {
    let total = 0;
    addToCart.forEach((product) => {
      total += product.price * product.quantity;
    });
    return Math.floor(total);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {addToCart.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>${Math.floor(product.price * product.quantity)}</td>
              <td>
                <IconButton
                  onClick={() => handleDelete(product, 1)}
                  size="small"
                >
                  <RemoveIcon />
                </IconButton>
                <IconButton onClick={() => handleAdd(product, 1)} size="small">
                  <AddIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(product, product.quantity)}
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <strong>Total:</strong> ${calculateTotal()}
      </div>
    </div>
  );
};

export default Cart;
