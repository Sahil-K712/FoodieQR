// Login.jsx
import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Link,
    Grid,
    InputAdornment,
    IconButton,
    CircularProgress,
    Alert,
    Container,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Add your image paths here
const foodImages = [
    '/damn.jpg',  // Replace with your actual image paths
    '/maza.jpg',
    '/cotton.jpg',
    '/kaka.jpg'
];

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root': {
        height: '56px',
        fontSize: '1.1rem',
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        },
        '&.Mui-focused': {
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            '& fieldset': {
                borderColor: '#333333',
                borderWidth: '2px',
            },
        },
    },
    '& .MuiInputLabel-root': {
        fontSize: '1.1rem',
        '&.Mui-focused': {
            color: '#333333',
        },
    },
    '& .MuiInputBase-input': {
        '&:-webkit-autofill': {
            '-webkit-box-shadow': '0 0 0 30px white inset',
            '-webkit-text-fill-color': 'inherit',
        },
    },
    marginBottom: theme.spacing(3),
}));

const ImagePanel = styled(Box)(({ theme }) => ({
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '16px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
    },
}));

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            login({
                id: 1,
                email: formData.email,
                name: 'Test User'
            });
            navigate('/', { replace: true });
        } catch (err) {
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
        sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #f0fff4 0%, #f0f9ff 100%)',
        }}
    >
            <Grid container spacing={3} sx={{ minHeight: '100vh' }}>
                {/* Left side - Login Form */}
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: { xs: 2, md: 4 },
                    }}
                >
                    <Container maxWidth="sm">
                        <Box
                            sx={{
                                backgroundColor: '#ffffff',
                                borderRadius: '24px',
                                p: 4,
                                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                            }}
                        >
                            <Typography
                                component="h1"
                                variant="h3"
                                sx={{
                                    mb: 4,
                                    fontWeight: 700,
                                    color: '#333333',
                                    textAlign: 'center',
                                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                                }}
                            >
                                Welcome Back
                            </Typography>

                            {error && (
                                <Alert 
                                    severity="error" 
                                    sx={{ 
                                        mb: 3, 
                                        borderRadius: '12px',
                                        fontSize: '1rem'
                                    }}
                                >
                                    {error}
                                </Alert>
                            )}

                            <form onSubmit={handleSubmit}>
                                <StyledTextField
                                    required
                                    fullWidth
                                    label="Email Address"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email sx={{ color: '#666666' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                
                                <StyledTextField
                                    required
                                    fullWidth
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock sx={{ color: '#666666' }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? 
                                                        <VisibilityOff sx={{ color: '#666666' }} /> : 
                                                        <Visibility sx={{ color: '#666666' }} />
                                                    }
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        mt: 3,
                                        mb: 3,
                                        height: 56,
                                        borderRadius: '12px',
                                        textTransform: 'none',
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                        backgroundColor: '#333333',
                                        '&:hover': {
                                            backgroundColor: '#444444',
                                            transform: 'translateY(-2px)',
                                        }
                                    }}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        'Sign In'
                                    )}
                                </Button>

                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography 
                                        variant="body1" 
                                        sx={{ 
                                            color: '#666666',
                                            fontSize: '1rem'
                                        }}
                                    >
                                        Don't have an account?{' '}
                                        <Link
                                            component={RouterLink}
                                            to="/signup"
                                            sx={{
                                                fontWeight: 600,
                                                textDecoration: 'none',
                                                color: '#333333',
                                                '&:hover': {
                                                    textDecoration: 'underline',
                                                }
                                            }}
                                        >
                                            Sign Up
                                        </Link>
                                    </Typography>
                                </Box>
                            </form>
                        </Box>
                    </Container>
                </Grid>

                {/* Right side - Image Panels */}
                <Grid
                    item
                    xs={false}
                    md={6}
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        p: 3,
                    }}
                >
                    <Grid 
                        container 
                        spacing={2} 
                        sx={{ height: '100%' }}
                    >
                        {foodImages.map((image, index) => (
                            <Grid item xs={6} key={index} sx={{ height: '50%' }}>
                                <ImagePanel
                                    sx={{
                                        backgroundImage: `url(${image})`,
                                        opacity: 1,
                                        transform: 'translateY(0)',
                                        animation: `fadeSlideIn 0.5s ease-out ${index * 0.1}s`,
                                        '@keyframes fadeSlideIn': {
                                            from: {
                                                opacity: 0,
                                                transform: 'translateY(20px)',
                                            },
                                            to: {
                                                opacity: 1,
                                                transform: 'translateY(0)',
                                            },
                                        },
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Login;