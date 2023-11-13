// CartPage.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import addCartSlice from '../../store/cart';
import productSlice from '../../store/products';
import { updateProduct } from '../../store/products';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Card,
  Grid,
  CardContent,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const addToCart = useSelector((state) => state.addCart.addedProducts);
  const productData = useSelector((state) => state.products.productData);
  const calculateTotal = () => {
    let total = 0;

    addToCart.forEach((product) => {
      total += product.price * product.quantity;
    });

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(total);
  };

  const [selectedDate, handleDateChange] = useState(new Date());

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    useBillingAsShipping: false,
    billingAddress: {
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
    },
    creditCard: '',
    expiration: '',
    cvv: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      useBillingAsShipping: e.target.checked,
    });
  };

  const handleBillingInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      billingAddress: {
        ...formData.billingAddress,
        [name]: value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your purchase');
  };

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

  return (
    <div
      style={{
        paddingBottom: '60px',
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <h1>Shopping Cart</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {addToCart.map((product, index) => (
              <TableRow key={index}>
                <TableCell>
                  <img
                    src={`http://source.unsplash.com/random?${product.name}`}
                    alt={product.name}
                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>${product.price * product.quantity}</TableCell>
                <TableCell>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <strong>Total: {calculateTotal()}</strong>
      </div>

      <Card variant="outlined" style={{ marginTop: '20px' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Checkout
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Full Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Address"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="City"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="State"
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Zip Code"
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.useBillingAsShipping}
                      onChange={handleCheckboxChange}
                      name="useBillingAsShipping"
                    />
                  }
                  label="Use Billing Address as Shipping Address"
                />
              </Grid>
              {!formData.useBillingAsShipping && (
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Billing Address
                  </Typography>
                </Grid>
              )}
              {!formData.useBillingAsShipping && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Full Name"
                    type="text"
                    name="name"
                    value={formData.billingAddress.name}
                    onChange={handleBillingInputChange}
                    fullWidth
                    margin="normal"
                    required={!formData.useBillingAsShipping}
                  />
                </Grid>
              )}
              {!formData.useBillingAsShipping && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Address"
                    type="text"
                    name="address"
                    value={formData.billingAddress.address}
                    onChange={handleBillingInputChange}
                    fullWidth
                    margin="normal"
                    required={!formData.useBillingAsShipping}
                  />
                </Grid>
              )}
              {!formData.useBillingAsShipping && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="City"
                    type="text"
                    name="city"
                    value={formData.billingAddress.city}
                    onChange={handleBillingInputChange}
                    fullWidth
                    margin="normal"
                    required={!formData.useBillingAsShipping}
                  />
                </Grid>
              )}
              {!formData.useBillingAsShipping && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="State"
                    type="text"
                    name="state"
                    value={formData.billingAddress.state}
                    onChange={handleBillingInputChange}
                    fullWidth
                    margin="normal"
                    required={!formData.useBillingAsShipping}
                  />
                </Grid>
              )}
              {!formData.useBillingAsShipping && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Zip Code"
                    type="text"
                    name="zipCode"
                    value={formData.billingAddress.zipCode}
                    onChange={handleBillingInputChange}
                    fullWidth
                    margin="normal"
                    required={!formData.useBillingAsShipping}
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={8}>
                <TextField
                  label="Credit Card"
                  type="text"
                  name="creditCard"
                  value={formData.creditCard}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="MM/YY"
                    name="expiration"
                    value={selectedDate}
                    onChange={handleDateChange}
                    fullWidth
                    margin="normal"
                    required
                    views={['month', 'year']}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="CVV"
                  type="text"
                  name="cvv"
                  value={formData.creditCard}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  style={{ marginTop: '20px' }}
                >
                  Place Order
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShoppingCart;
