// src/components/Orders/OrderHistory.jsx
import React from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Chip
} from '@mui/material';

const OrderHistory = () => {
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders.reverse()); // Show newest first
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>

      {orders.length === 0 ? (
        <Card sx={{ mt: 2, p: 4, textAlign: 'center' }}>
          <Typography color="text.secondary">
            No orders found
          </Typography>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {orders.map((order, index) => (
            <Grid item xs={12} key={index}>
              <Card 
                sx={{ 
                  position: 'relative',
                  '&:hover': {
                    boxShadow: 6
                  }
                }}
              >
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6">
                      Order #{orders.length - index}
                    </Typography>
                    <Chip
                      label={order.status}
                      color={getStatusColor(order.status)}
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </Box>

                  <Typography color="text.secondary" gutterBottom>
                    {new Date(order.orderDate).toLocaleString()}
                  </Typography>

                  <Box sx={{ 
                    mt: 2, 
                    p: 2, 
                    bgcolor: 'background.default', 
                    borderRadius: 1 
                  }}>
                    {order.items.map((item, idx) => (
                      <Box 
                        key={idx} 
                        sx={{ 
                          mb: 1,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          p: 1,
                          '&:not(:last-child)': {
                            borderBottom: '1px solid',
                            borderColor: 'divider'
                          }
                        }}
                      >
                        <Box>
                          <Typography variant="body1">
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Quantity: {item.quantity}
                          </Typography>
                        </Box>
                        <Typography variant="body1" fontWeight="medium">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Box sx={{ 
                    mt: 2, 
                    pt: 2, 
                    borderTop: 1, 
                    borderColor: 'divider',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <Typography variant="subtitle1" color="text.secondary">
                      Total Amount
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ₹{order.totalAmount.toFixed(2)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default OrderHistory;