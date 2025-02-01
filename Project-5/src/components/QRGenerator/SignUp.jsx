// SignUp.jsx
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
    Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    Email,
    Lock,
    Person,
    Visibility,
    VisibilityOff,
    Google,
    Facebook,
    Apple,
} from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

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
    marginBottom: theme.spacing(2), // Reduced spacing
}));

const SocialButton = styled(Button)(({ theme }) => ({
    width: '100%',
    height: '44px', // Slightly reduced height
    borderRadius: '12px',
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: 500,
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
    color: '#333333',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: '#f5f5f5',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
}));
const SignUp = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            navigate('/login');
        } catch (err) {
            setError('Failed to create account. Please try again.');
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
            <Grid container sx={{ minHeight: '100vh' }}>
                {/* Left side - Sign Up Form */}
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
                    <Container maxWidth="md"> {/* Changed from 'sm' to 'md' for wider form */}
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
                                    mb: 3, // Reduced margin
                                    fontWeight: 700,
                                    color: '#333333',
                                    textAlign: 'center',
                                    fontSize: { xs: '2rem', sm: '2.5rem', md: '2.75rem' }
                                }}
                            >
                                Create Account
                            </Typography>

                            {error && (
                                <Alert
                                    severity="error"
                                    sx={{
                                        mb: 2, // Reduced margin
                                        borderRadius: '12px',
                                        fontSize: '1rem'
                                    }}
                                >
                                    {error}
                                </Alert>
                            )}

                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <StyledTextField
                                            required
                                            fullWidth
                                            label="Full Name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Person sx={{ color: '#666666' }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
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
                                    </Grid>
                                    <Grid item xs={12} md={6}>
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
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <StyledTextField
                                            required
                                            fullWidth
                                            label="Confirm Password"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Lock sx={{ color: '#666666' }} />
                                                    </InputAdornment>
                                                ),
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                            edge="end"
                                                        >
                                                            {showConfirmPassword ?
                                                                <VisibilityOff sx={{ color: '#666666' }} /> :
                                                                <Visibility sx={{ color: '#666666' }} />
                                                            }
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        mt: 3,
                                        mb: 2,
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
                                        'Create Account'
                                    )}
                                </Button>

                                <Divider sx={{ my: 2 }}>
                                    <Typography color="text.secondary">or sign up with</Typography>
                                </Divider>

                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <SocialButton startIcon={<Google />}>
                                            Google
                                        </SocialButton>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <SocialButton startIcon={<Facebook />}>
                                            Facebook
                                        </SocialButton>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <SocialButton startIcon={<Apple />}>
                                            Apple
                                        </SocialButton>
                                    </Grid>
                                </Grid>

                                <Box sx={{ mt: 2, textAlign: 'center' }}>
                                    <Typography variant="body1" color="text.secondary">
                                        Already have an account?{' '}
                                        <Link
                                            component={RouterLink}
                                            to="/login"
                                            sx={{
                                                fontWeight: 600,
                                                textDecoration: 'none',
                                                color: '#333333',
                                                '&:hover': {
                                                    textDecoration: 'underline'
                                                }
                                            }}
                                        >
                                            Sign In
                                        </Link>
                                    </Typography>
                                </Box>
                            </form>
                        </Box>
                    </Container>
                </Grid>

                {/* Right side - Floating Card Image */}
                {/* Right side - Floating Card Image */}
                <Grid
                    item
                    xs={false}
                    md={6}
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 4,
                    }}
                >
                    <Box
                        sx={{
                            width: '90%',
                            height: '85%', // Increased height to match signup box
                            borderRadius: '24px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                            transform: 'perspective(1000px) rotateY(-5deg)',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                transform: 'perspective(1000px) rotateY(0deg)',
                            },
                        }}
                    >
                        <img
                            src="/ttt.jpg"
                            alt="Chef"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SignUp;