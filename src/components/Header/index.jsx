import AppBar from '@mui/material/AppBar';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ShoppingCart } from '@mui/icons-material';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import Popover from '@mui/material/Popover';
import Cart from '../SimpleCart';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const Header = () => {
  const totalItems = useSelector((state) => {
    const addToCart = state.addCart.addedProducts;
    const productData = state.products.productData;

    return productData.reduce((total, product) => {
      const productInCart = addToCart.find(
        (item) => item.name === product.name
      );
      return total + (productInCart ? productInCart.quantity : 0);
    }, 0);
  });

  const [cartAnchorEl, setCartAnchorEl] = useState(null);

  const handleCartClick = (event) => {
    setCartAnchorEl(event.currentTarget);
  };

  const handleCartClose = () => {
    setCartAnchorEl(null);
  };
  return (
    <Box>
      <AppBar position="static" style={{ padding: '4px' }}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Jonathan's Store
          </Typography>

          <nav>
            <ul
              style={{
                display: 'flex',
                alignItems: 'center',
                listStyle: 'none',
                padding: 10,
              }}
            >
              <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
                <HomeIcon />
              </Link>
              <Link
                to={'/products'}
                style={{ textDecoration: 'none', color: 'white' }}
              >
                Products
              </Link>

              {/* <li style={{ marginRight: '10px' }}></li> */}
              {/* Add other links here with similar <li> elements */}
            </ul>
          </nav>
          <Button color="inherit" onClick={handleCartClick}>
            <ShoppingCart />({totalItems} items){' '}
            {/* Display the total items here */}
          </Button>

          <Popover
            open={Boolean(cartAnchorEl)}
            anchorEl={cartAnchorEl}
            onClose={handleCartClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {/* Content for the cart popover */}
            <Cart />
          </Popover>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
