import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import DishGrid from './components/QRGenerator/DishGrid';
import Login from './components/QRGenerator/Login';
import Signup from './components/QRGenerator/SignUp';
import CalorieCalculator from './components/QRGenerator/CalorieCalculator';
import Cart from './components/Cart/Cart'; // New
import OrderHistory from './components/Orders/OrderHistory'; // New
import Navbar from './components/Layout/Navbar'; // New
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext'; // New
import ProtectedRoute from './components/ProtectedRoute';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CartProvider> {/* New Provider */}
          <BrowserRouter>
            <Navbar /> {/* New Navigation Component */}
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <DishGrid />
                  </ProtectedRoute>
                }
              />


              <Route
                path="/calculator"
                element={
                  <ProtectedRoute>
                    <CalorieCalculator />
                  </ProtectedRoute>
                }
              />


<Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <OrderHistory />
                  </ProtectedRoute>
                }
              />

              {/* Redirect all other routes to login */}
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;