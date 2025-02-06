import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; // Make sure this is created
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Button,
  IconButton,
  Divider,
  Chip,
  Fade,
  Slider,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart,
  Restaurant,
  Timer,
  Info as InfoIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const CalorieCalculator = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [dish, setDish] = useState(null);
  const [error, setError] = useState(null);
  const [servings, setServings] = useState(1);
  const [calculatedNutrition, setCalculatedNutrition] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      const params = new URLSearchParams(location.search);
      const dishData = params.get('data');
      if (dishData) {
        const parsedDish = JSON.parse(decodeURIComponent(dishData));
        console.log('Parsed dish data:', parsedDish); // Add this line
        setDish(parsedDish);
        setCalculatedNutrition(calculateNutrition(parsedDish.totalNutrition, servings));
      }
    } catch (err) {

      console.error('Error parsing dish data:', err); // Add this line
      setError('Invalid dish data');
    }
    setLoading(false);
  }, [location]);

  const calculateNutrition = (nutrition, servingCount) => {
    if (!nutrition) return null;
    return Object.entries(nutrition).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: Number((value * servingCount).toFixed(1))
    }), {});
  };

  useEffect(() => {
    if (dish?.totalNutrition) {
      setCalculatedNutrition(calculateNutrition(dish.totalNutrition, servings));
    }
  }, [servings, dish]);

  const handleAddToCart = () => {
    const cartItem = {
      id: dish.id,
      name: dish.name,
      price: dish.price,
      image: dish.image, // Make sure this is included
      quantity: servings,
      totalPrice: dish.price * servings,
      nutrition: calculatedNutrition
    };
    addToCart(cartItem);
    setShowAlert(true);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ background: 'linear-gradient(145deg, #f6f8ff 0%, #f0f4ff 100%)' }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Restaurant sx={{ fontSize: 40, color: 'primary.main' }} />
        </motion.div>
      </Box>
    );
  }

  if (error || !dish) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography color="error" variant="h6">{error || 'Dish not found'}</Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/')}
            sx={{ mt: 2 }}
          >
            Back to Menu
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          overflow: 'hidden',
          borderRadius: 4,
          background: 'linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)'
        }}
      >
        <Grid container>
          {/* Left Side - Image */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: '100%',
                minHeight: 400,
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#f5f5f5' // Add background color for better loading appearance
              }}
            >
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                src={dish.image ? `/images/dishes/${dish.image}` : 'https://via.placeholder.com/400x400?text=Food+Image'}
                alt={dish.name}
                onError={(e) => {
                  console.log('Image failed to load:', e);
                  e.target.src = 'https://via.placeholder.com/400x400?text=Food+Image';
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                  p: 2,
                  color: 'white'
                }}
              >
                <Typography variant="h4">{dish.name}</Typography>
                <Chip
                  icon={<Timer />}
                  label={dish.prepTime}
                  sx={{ mt: 1, bgcolor: 'rgba(255,255,255,0.9)' }}
                />
              </Box>
            </Box>
          </Grid>

          {/* Right Side - Details */}
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
                Nutritional Information
              </Typography>

              <Grid container spacing={2} sx={{ mb: 4 }}>
                {calculatedNutrition && Object.entries(calculatedNutrition).map(([key, value]) => (
                  <Grid item xs={6} sm={3} key={key}>
                    <Paper
                      elevation={2}
                      sx={{
                        p: 2,
                        textAlign: 'center',
                        height: '100%',
                        transition: '0.3s',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: 6
                        }
                      }}
                    >
                      <Typography variant="h6" color="primary">
                        {value}
                        {key === 'calories' ? '' : 'g'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                Servings
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <IconButton
                  onClick={() => setServings(Math.max(1, servings - 1))}
                  color="primary"
                >
                  <RemoveIcon />
                </IconButton>
                <Typography variant="h5" sx={{ mx: 3 }}>
                  {servings}
                </Typography>
                <IconButton
                  onClick={() => setServings(servings + 1)}
                  color="primary"
                >
                  <AddIcon />
                </IconButton>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" color="primary" gutterBottom>
                  Total Price
                </Typography>
                <Typography variant="h4">
                  ₹{(dish.price * servings).toFixed(2)}
                </Typography>
              </Box>

              <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
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
                Send to kitchen
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setShowAlert(false)}
        >
           Order sent to kitchen successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CalorieCalculator;