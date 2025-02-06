// Cart.jsx - Restaurant Style
import React, { useState } from 'react';
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
  Radio,
  RadioGroup,
  FormControlLabel
} from '@mui/material';
import {
  Add,
  Remove,
  Delete,
  Restaurant,
  RoomService,
  RestaurantMenu,
  TableBar,
  Kitchen
} from '@mui/icons-material';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Cart = () => {
  const { cartItems, totalAmount, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const [diningOption, setDiningOption] = useState('dineIn'); // 'dineIn' or 'takeaway'
  const [tableNumber, setTableNumber] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [showAlert, setShowAlert] = useState({ show: false, message: '', type: 'success' });

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handlePlaceOrder = () => {
    if (diningOption === 'dineIn' && !tableNumber) {
      setShowAlert({
        show: true,
        message: 'Please enter your table number',
        type: 'error'
      });
      return;
    }

    const order = {
      items: cartItems,
      totalAmount,
      orderDate: new Date().toISOString(),
      status: 'preparing',
      diningOption,
      tableNumber: diningOption === 'dineIn' ? tableNumber : null,
      specialInstructions
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
            <Restaurant sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
            <Typography variant="h5" color="text.secondary" gutterBottom>
              Your order is empty
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/')}
              sx={{ mt: 2 }}
            >
              View Menu
            </Button>
          </Box>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Your Order
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
                    {/* Image Section */}
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
                    
                    {/* Dish Details */}
                    <Grid item xs={12} sm={4}>
                      <Typography variant="h6" sx={{ mb: 1 }}>{item.name}</Typography>
                      <Typography color="text.secondary">
                        ₹{item.price} per serving
                      </Typography>
                    </Grid>
                    
                    {/* Quantity Controls */}
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
                    
                    {/* Price and Remove */}
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
              {/* Dining Options */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Dining Option
                </Typography>
                <RadioGroup
                  value={diningOption}
                  onChange={(e) => setDiningOption(e.target.value)}
                >
                  <FormControlLabel
                    value="dineIn"
                    control={<Radio />}
                    label={
                      <Box display="flex" alignItems="center" gap={1}>
                        <TableBar />
                        <Typography>Dine In</Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="takeaway"
                    control={<Radio />}
                    label={
                      <Box display="flex" alignItems="center" gap={1}>
                        <RoomService />
                        <Typography>Takeaway</Typography>
                      </Box>
                    }
                  />
                </RadioGroup>
              </Box>

              {/* Table Number (for Dine In) */}
              {diningOption === 'dineIn' && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Table Number
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Enter your table number"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                  />
                </Box>
              )}

              {/* Special Instructions */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Special Instructions
                </Typography>
                <TextField
                  multiline
                  rows={2}
                  fullWidth
                  placeholder="Any special requests for your order?"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                />
              </Box>

              {/* Order Summary */}
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Divider sx={{ my: 2 }} />
              
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="h6">Total Amount</Typography>
                <Typography variant="h6" color="primary">
                  ₹{totalAmount.toFixed(2)}
                </Typography>
              </Box>

              {/* Place Order Button */}
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handlePlaceOrder}
                startIcon={<RoomService />}
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
        open={showAlert.show}
        autoHideDuration={3000}
        onClose={() => setShowAlert({ ...showAlert, show: false })}
      >
        <Alert
          severity={showAlert.type}
          variant="filled"
          onClose={() => setShowAlert({ ...showAlert, show: false })}
        >
          {showAlert.message}
        </Alert>
      </Snackbar>

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