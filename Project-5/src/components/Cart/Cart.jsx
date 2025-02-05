// src/components/Cart/Cart.jsx
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Grid,
  Divider,
  TextField,
  Alert,
  Snackbar,
  CardMedia
} from '@mui/material';
import { Add, Remove, Delete, ShoppingBag, Restaurant } from '@mui/icons-material';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Cart = () => {
  const { cartItems, totalAmount, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = React.useState(false);
  const [imageErrors, setImageErrors] = React.useState({});

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handlePlaceOrder = () => {
    const order = {
      items: cartItems,
      totalAmount,
      orderDate: new Date().toISOString(),
      status: 'pending'
    };

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([...orders, order]));

    clearCart();
    setOrderPlaced(true);
    
    setTimeout(() => {
      navigate('/orders');
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ py: 8 }}>
            <ShoppingBag sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
            <Typography variant="h5" color="text.secondary" gutterBottom>
              Your cart is empty
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/')}
              sx={{ mt: 2 }}
            >
              Browse Menu
            </Button>
          </Box>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Your Cart
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {cartItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card sx={{ mb: 2, overflow: 'hidden' }}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={3}>
                      <Box
                        sx={{
                          position: 'relative',
                          width: '100%',
                          height: 100,
                          borderRadius: 2,
                          overflow: 'hidden',
                          bgcolor: 'grey.100'
                        }}
                      >
                        {!imageErrors[item.id] ? (
                          <img
                            src={`/images/dishes/${item.image}`}
                            alt={item.name}
                            onError={() => {
                              setImageErrors(prev => ({
                                ...prev,
                                [item.id]: true
                              }));
                            }}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: '100%',
                              height: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              bgcolor: 'grey.200'
                            }}
                          >
                            <Restaurant sx={{ fontSize: 40, color: 'grey.400' }} />
                          </Box>
                        )}
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} sm={4}>
                      <Typography variant="h6" sx={{ mb: 1 }}>{item.name}</Typography>
                      <Typography color="text.secondary">
                        ₹{item.price} per serving
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={3}>
                      <Box display="flex" alignItems="center" justifyContent="center">
                        <IconButton
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          color="primary"
                          size="small"
                        >
                          <Remove />
                        </IconButton>
                        <TextField
                          value={item.quantity}
                          size="small"
                          sx={{ 
                            width: '60px', 
                            mx: 1,
                            '& input': { textAlign: 'center' }
                          }}
                          InputProps={{ readOnly: true }}
                        />
                        <IconButton
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          color="primary"
                          size="small"
                        >
                          <Add />
                        </IconButton>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} sm={2}>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="h6" color="primary">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </Typography>
                        <IconButton
                          color="error"
                          onClick={() => removeFromCart(item.id)}
                          size="small"
                          sx={{ mt: 1 }}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Divider sx={{ my: 2 }} />
              
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography>Subtotal</Typography>
                <Typography>₹{totalAmount.toFixed(2)}</Typography>
              </Box>
              
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography>Delivery Fee</Typography>
                <Typography>₹40.00</Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box display="flex" justifyContent="space-between" mb={3}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" color="primary">
                  ₹{(totalAmount + 40).toFixed(2)}
                </Typography>
              </Box>
              
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handlePlaceOrder}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #2196F3 60%, #21CBF3 90%)',
                  }
                }}
              >
                Place Order
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={orderPlaced}
        autoHideDuration={2000}
        onClose={() => setOrderPlaced(false)}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setOrderPlaced(false)}
        >
          Order placed successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Cart;