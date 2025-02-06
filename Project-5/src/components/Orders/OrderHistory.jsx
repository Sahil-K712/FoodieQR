// OrderHistory.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Chip,
  Divider,
  IconButton,
  Collapse,
  Badge,
  Tooltip
} from '@mui/material';
import {
  Restaurant,
  AccessTime,
  TableBar,
  RoomService,
  ExpandMore,
  Warning,
  Kitchen,
  Done,
  LocalDining,
  Cancel
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders.reverse()); // Show newest first
  }, []);

  const getStatusInfo = (status) => {
    const statusMap = {
      preparing: {
        color: 'warning',
        icon: <Kitchen />,
        label: 'Preparing',
        time: '15-20 mins'
      },
      ready: {
        color: 'success',
        icon: <Done />,
        label: 'Ready to Serve',
        time: 'Ready now'
      },
      served: {
        color: 'info',
        icon: <LocalDining />,
        label: 'Served',
        time: 'Completed'
      },
      cancelled: {
        color: 'error',
        icon: <Cancel />,
        label: 'Cancelled',
        time: '-'
      }
    };
    return statusMap[status] || statusMap.preparing;
  };

  const OrderCard = ({ order, isExpanded, onToggle }) => {
    const statusInfo = getStatusInfo(order.status);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card 
          sx={{ 
            mb: 2, 
            overflow: 'hidden',
            '&:hover': {
              boxShadow: 6
            }
          }}
        >
          <CardContent>
            {/* Order Header */}
            <Box 
              display="flex" 
              justifyContent="space-between" 
              alignItems="center" 
              mb={2}
              onClick={onToggle}
              sx={{ cursor: 'pointer' }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="h6">
                  Order #{order.id || Math.random().toString(36).substr(2, 5).toUpperCase()}
                </Typography>
                {order.diningOption === 'dineIn' && (
                  <Chip
                    icon={<TableBar />}
                    label={`Table ${order.tableNumber}`}
                    size="small"
                    color="primary"
                  />
                )}
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Chip
                  icon={statusInfo.icon}
                  label={statusInfo.label}
                  color={statusInfo.color}
                />
                <IconButton
                  size="small"
                  sx={{
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: '0.3s'
                  }}
                >
                  <ExpandMore />
                </IconButton>
              </Box>
            </Box>

            {/* Order Time and Type */}
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography color="text.secondary">
                {new Date(order.orderDate).toLocaleString()}
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <AccessTime fontSize="small" color="action" />
                <Typography color="text.secondary">
                  {statusInfo.time}
                </Typography>
              </Box>
            </Box>

            {/* Expanded Content */}
            <Collapse in={isExpanded}>
              <Divider sx={{ my: 2 }} />

              {/* Order Items */}
              <Grid container spacing={2}>
                {order.items.map((item, idx) => (
                  <Grid item xs={12} key={idx}>
                    <Box display="flex" gap={2} alignItems="center">
                      {/* Item Image */}
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: 2,
                          overflow: 'hidden',
                          flexShrink: 0,
                          bgcolor: 'grey.100'
                        }}
                      >
                        <img
                          src={`/images/dishes/${item.image}`}
                          alt={item.name}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/80x80?text=Dish';
                          }}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </Box>

                      {/* Item Details */}
                      <Box flex={1}>
                        <Box display="flex" justifyContent="space-between" alignItems="start">
                          <Box>
                            <Typography variant="subtitle1">{item.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Quantity: {item.quantity}
                            </Typography>
                          </Box>
                          <Typography variant="subtitle1" color="primary">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </Typography>
                        </Box>

                        {/* Allergen Information */}
                        {item.allergens && item.allergens.length > 0 && (
                          <Box display="flex" gap={1} mt={1}>
                            <Tooltip title="Allergen Information">
                              <Warning fontSize="small" color="warning" />
                            </Tooltip>
                            {item.allergens.map((allergen, i) => (
                              <Chip
                                key={i}
                                label={allergen}
                                size="small"
                                variant="outlined"
                                color="warning"
                              />
                            ))}
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              {/* Special Instructions */}
              {order.specialInstructions && (
                <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Special Instructions
                  </Typography>
                  <Typography variant="body2">
                    {order.specialInstructions}
                  </Typography>
                </Box>
              )}

              {/* Order Summary */}
              <Box 
                sx={{ 
                  mt: 2, 
                  p: 2, 
                  bgcolor: 'primary.main', 
                  color: 'white',
                  borderRadius: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Typography variant="subtitle1">Total Amount</Typography>
                <Typography variant="h6">
                  ₹{order.totalAmount.toFixed(2)}
                </Typography>
              </Box>

              {/* Preparation Notes */}
              {order.status === 'preparing' && (
                <Box sx={{ mt: 2, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
                  <Typography variant="body2" color="white">
                    <AccessTime sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Estimated preparation time: {statusInfo.time}
                  </Typography>
                </Box>
              )}
            </Collapse>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>

      {orders.length === 0 ? (
        <Card sx={{ mt: 2, p: 4, textAlign: 'center' }}>
          <Restaurant sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
          <Typography color="text.secondary">
            No orders found
          </Typography>
        </Card>
      ) : (
        <AnimatePresence>
          {orders.map((order, index) => (
            <OrderCard
              key={order.id || index}
              order={order}
              isExpanded={expandedOrder === index}
              onToggle={() => setExpandedOrder(expandedOrder === index ? null : index)}
            />
          ))}
        </AnimatePresence>
      )}
    </Container>
  );
};

export default OrderHistory;