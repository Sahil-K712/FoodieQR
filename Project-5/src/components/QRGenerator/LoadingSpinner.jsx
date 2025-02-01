// src/components/QRGenerator/LoadingSpinner.jsx
import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { FaUtensils } from 'react-icons/fa';

const LoadingSpinner = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Box 
                display="flex" 
                flexDirection="column"
                justifyContent="center" 
                alignItems="center" 
                minHeight="400px"
                gap={3}
            >
                <motion.div
                    animate={{
                        rotate: 360,
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <FaUtensils size={40} color="#1976d2" />
                </motion.div>

                <CircularProgress 
                    size={60}
                    thickness={4}
                    sx={{
                        color: 'primary.main',
                        '& .MuiCircularProgress-circle': {
                            strokeLinecap: 'round',
                        }
                    }}
                />

                <Box textAlign="center">
                    <Typography 
                        variant="h6" 
                        color="primary"
                        sx={{ 
                            fontWeight: 500,
                            mb: 1
                        }}
                    >
                        Loading Menu
                    </Typography>
                    <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ maxWidth: 300 }}
                    >
                        Preparing your delicious dishes...
                    </Typography>
                </Box>

                {/* Loading Progress Dots */}
                <Box 
                    display="flex" 
                    gap={1}
                    mt={2}
                >
                    {[0, 1, 2].map((index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0.3 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: index * 0.2,
                            }}
                        >
                            <Box
                                sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    backgroundColor: 'primary.main',
                                }}
                            />
                        </motion.div>
                    ))}
                </Box>
            </Box>
        </motion.div>
    );
};

// Optional: Add loading states
const LoadingStates = [
    "Preparing the menu...",
    "Gathering ingredients...",
    "Adding final touches...",
    "Almost ready..."
];


// Alternative fancy version
const FancyLoadingSpinner = () => {
    return (
        <Box 
            className="loading-container"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '400px',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: 100,
                        height: 100,
                    }}
                >
                    {[0, 1, 2, 3].map((index) => (
                        <motion.div
                            key={index}
                            animate={{
                                rotate: [0, 360],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: index * 0.2,
                            }}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                backgroundColor: '#1976d2',
                                transform: `rotate(${index * 90}deg) translate(30px, 0)`,
                            }}
                        />
                    ))}
                </Box>
            </motion.div>

            <Typography
                variant="h6"
                sx={{
                    mt: 4,
                    textAlign: 'center',
                    color: 'primary.main',
                    fontWeight: 500,
                }}
            >
                Loading Menu
            </Typography>
        </Box>
    );
};

export default LoadingSpinner;