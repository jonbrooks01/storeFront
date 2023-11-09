// CartPage.jsx
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ShoppingCart = () => {
  const addToCart = useSelector((state) => state.addCart.addedProducts);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });
  // Function to calculate the total
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
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the form data (e.g., send it to a server or payment gateway)
    // Reset the form or show a confirmation message
  };

  return (
    <div>
      <h1>Checkout</h1>
      <div className="checkout-items"></div>
      <div className="checkout-total">
        <strong>Total: {calculateTotal()}</strong>
      </div>
      <div className="checkout-form">
        {/* Your checkout form can go here */}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              required
            />
          </div>
          <div>
            <label htmlFor="address">Shipping Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleFormChange}
              required
            />
          </div>
          <div>
            <label htmlFor="cardNumber">Card Number:</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleFormChange}
              required
            />
          </div>
          <div>
            <label htmlFor="expirationDate">Expiration Date:</label>
            <input
              type="text"
              id="expirationDate"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleFormChange}
              required
            />
          </div>
          <div>
            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleFormChange}
              required
            />
          </div>
          <button type="submit">Place Order</button>
        </form>
      </div>
      <div className="checkout-actions">
        <Link to="/payment">Proceed to Payment</Link>
      </div>
    </div>
  );
};

export default ShoppingCart;
