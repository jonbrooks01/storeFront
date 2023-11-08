import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import addCartSlice from '../../store/cart';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import productSlice from '../../store/products';
// import './Cart.scss'; // Import your SCSS file for styling

const Cart = () => {
  // const [isRemoving, setIsRemoving] = useState(false);
  const dispatch = useDispatch();
  const addToCart = useSelector((state) => state.addCart.addedProducts);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    // Calculate the total items in the cart
    const total = addToCart.reduce(
      (total, product) => total + product.quantity,
      0
    );
    setTotalItems(total);
  }, [addToCart]);

  // const handleDelete = (product, quantityToRemove) => {
  //   // Check if the product exists in the cart
  //   const existingProduct = addToCart.find(
  //     (item) => item.name === product.name
  //   );

  //   if (existingProduct) {
  //     // Calculate the new quantity
  //     const newQuantity = existingProduct.quantity - quantityToRemove;

  //     console.log('New Quantity:', newQuantity);

  //     if (newQuantity <= 0) {
  //       // If the new quantity is zero or negative, remove the product from the cart
  //       dispatch(addCartSlice.actions.removeItemFromCart(product));
  //     } else {
  //       // Update the quantity of the product in the cart
  //       dispatch(
  //         addCartSlice.actions.updateCartItemQuantity({
  //           name: product.name,
  //           quantity: newQuantity,
  //         })
  //       );
  //       dispatch(
  //         productSlice.actions.updateProduct({
  //           product: product, // Pass the product
  //           amount: 1, // Increase the in-stock quantity by 1
  //         })
  //       );
  //     }
  //   }
  // };

  const handleDelete = (product, quantityToRemove) => {
    const existingProduct = addToCart.find(
      (item) => item.name === product.name
    );

    if (existingProduct) {
      const newQuantity = existingProduct.quantity - quantityToRemove;

      if (newQuantity <= 0) {
        dispatch(addCartSlice.actions.removeItemFromCart(product));
      } else {
        dispatch(
          addCartSlice.actions.updateCartItemQuantity({
            name: product.name,
            quantity: newQuantity,
          })
        );

        console.log('Before update - product.inStock:', product.inStock);

        // Dispatch the updateProduct action to increase in-stock quantity
        dispatch(
          productSlice.actions.updateProduct({
            product: product,
            amount: 1, // Increase the in-stock quantity by 1
          })
        );
      }

      // Update the product.inStock value by incrementing it based on the quantity removed
      // Make sure to handle cases where the product.inStock might be undefined or null
      const newInStockValue = (product.inStock || 0) + quantityToRemove;
      console.log('After update - product.inStock:', newInStockValue);

      dispatch(
        productSlice.actions.updateProductInState({
          product: {
            ...product,
            inStock: newInStockValue,
          },
          amount: 0, // No change in in-stock quantity
        })
      );
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
