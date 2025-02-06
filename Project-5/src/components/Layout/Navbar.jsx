// src/components/Layout/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Badge } from '@mui/material';
import { ShoppingCart, History, Restaurant, RestaurantMenu } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext'; // Assuming you have this

const Navbar = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { logout } = useAuth();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          FoodieQR
        </Typography>
        
        <Button 
          color="inherit" 
          startIcon={<Restaurant />}
          onClick={() => navigate('/')}
        >
          Menu
        </Button>
        
        <Button 
          color="inherit"
          startIcon={
            <Badge badgeContent={cartItems.length} color="secondary">
              <RestaurantMenu />
            </Badge>
          }
          onClick={() => navigate('/cart')}
        >
          Your Orders
        </Button>
        
        <Button 
          color="inherit"
          startIcon={<History />}
          onClick={() => navigate('/orders')}
        >
          Kitchen
        </Button>
        
        <Button 
          color="inherit"
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;