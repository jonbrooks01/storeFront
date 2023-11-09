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
import { updateProduct } from '../../store/products';
import { Link } from 'react-router-dom';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
// import './Cart.scss'; // Import your SCSS file for styling

const Cart = () => {
  const dispatch = useDispatch();
  const addToCart = useSelector((state) => state.addCart.addedProducts);
  const productData = useSelector((state) => state.products.productData);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    // Calculate the total items in the cart
    const total = addToCart.reduce(
      (total, product) => total + product.quantity,
      0
    );
    setTotalItems(total);
  }, [addToCart]);

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

        // console.log('Before update - product.inStock:', product.inStock);
        const apiProduct = productData.find((p) => p.name === product.name);
        console.log(apiProduct);
        dispatch(updateProduct({ product: apiProduct, amount: +1 }));
        // Dispatch the updateProduct action to increase in-stock quantity
        dispatch(
          productSlice.actions.updateProductInState({
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

  const handleAdd = async (product, quantityToAdd) => {
    // Check if the product exists in the cart
    const existingProduct = addToCart.find(
      (item) => item.name === product.name
    );
    console.log(product);
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
      const apiProduct = productData.find((p) => p.name === product.name);
      console.log(apiProduct);
      dispatch(updateProduct({ product: apiProduct, amount: -1 }));

      await dispatch(
        productSlice.actions.updateProductInState({
          product: product,
          amount: -1, // Decrease the in-stock quantity by 1
        })
      );
    }
  };

  const calculateTotal = () => {
    let total = 0;

    addToCart.forEach((product) => {
      total += product.price * product.quantity;
    });

    // Format the total as currency
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(total);
  };

  return (
    <div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
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
            <tr key={index} style={{ borderBottom: '1px solid #ccc' }}>
              <td style={{ padding: '10px' }}>{product.name}</td>
              <td style={{ padding: '10px' }}>{product.quantity}</td>
              <td style={{ padding: '10px' }}>
                ${Math.floor(product.price * product.quantity)}
              </td>
              <td style={{ padding: '10px' }}>
                <IconButton
                  onClick={() => handleDelete(product, 1)}
                  size="small"
                  style={{ marginRight: '5px' }}
                >
                  <RemoveIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleAdd(product, 1)}
                  size="small"
                  style={{ marginRight: '5px' }}
                >
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingRight: '10px',
        }}
      >
        <strong>Total: {calculateTotal()} </strong>
        <Link
          to="/shoppingCart"
          style={{
            textDecoration: 'none',
            color: 'black',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ShoppingCartCheckoutIcon />
          <span style={{ marginLeft: '5px' }}>Checkout</span>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
