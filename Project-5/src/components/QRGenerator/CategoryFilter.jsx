import React from 'react';
import { Box, Chip, Typography, Paper, Tooltip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaLeaf, 
    FaDrumstickBite, 
    FaWineGlass, 
    FaCookie, 
    FaFire,
    FaBreadSlice
} from 'react-icons/fa';

const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory }) => {
    // Category icons mapping
    const getCategoryIcon = (category) => {
        switch(category.toLowerCase()) {
            case 'vegetarian':
                return <FaLeaf />;
            case 'non-vegetarian':
                return <FaDrumstickBite />;
            case 'beverages':
                return <FaWineGlass />;
            case 'desserts':
                return <FaCookie />;
            case 'starters':
                return <FaFire />;
            case 'breads':
                return <FaBreadSlice />;
            default:
                return null;
        }
    };

    // Category descriptions for tooltips
    const categoryDescriptions = {
        all: 'View all dishes',
        vegetarian: 'Plant-based dishes',
        'non-vegetarian': 'Meat and seafood dishes',
        starters: 'Appetizers and snacks',
        desserts: 'Sweet treats and desserts',
        beverages: 'Drinks and refreshments',
        breads: 'Fresh baked breads'
    };

    return (
        <Paper 
            elevation={0}
            sx={{ 
                p: 2, 
                bgcolor: 'background.default',
                borderRadius: 3
            }}
        >
            <Typography 
                variant="subtitle2" 
                sx={{ 
                    mb: 2,
                    color: 'text.secondary',
                    fontWeight: 500
                }}
            >
                Filter by Category
            </Typography>
            
            <Box 
                className="category-filters"
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1,
                    justifyContent: 'center'
                }}
            >
                <AnimatePresence>
                    {categories.map((category) => (
                        <motion.div
                            key={category}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Tooltip 
                                title={categoryDescriptions[category.toLowerCase()]}
                                arrow
                                placement="top"
                            >
                                <Chip
                                    icon={getCategoryIcon(category)}
                                    label={category.charAt(0).toUpperCase() + category.slice(1)}
                                    onClick={() => setSelectedCategory(category)}
                                    color={selectedCategory === category ? "primary" : "default"}
                                    variant={selectedCategory === category ? "filled" : "outlined"}
                                    className="category-chip"
                                    sx={{
                                        px: 1,
                                        '& .MuiChip-icon': {
                                            color: selectedCategory === category ? 'inherit' : 'primary.main'
                                        },
                                        transition: 'all 0.3s ease',
                                        fontWeight: selectedCategory === category ? 500 : 400,
                                        borderWidth: '2px',
                                        '&:hover': {
                                            backgroundColor: selectedCategory === category 
                                                ? 'primary.dark'
                                                : 'rgba(25, 118, 210, 0.1)',
                                            transform: 'translateY(-2px)'
                                        },
                                        '&:active': {
                                            transform: 'translateY(0px)'
                                        }
                                    }}
                                />
                            </Tooltip>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </Box>

            {/* Category Stats */}
            <Box 
                sx={{ 
                    mt: 2,
                    pt: 2,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 2,
                    flexWrap: 'wrap'
                }}
            >
                <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                    }}
                >
                    <FaLeaf color="#4caf50" />
                    Vegetarian Options
                </Typography>
                <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                    }}
                >
                    <FaFire color="#ff9800" />
                    Spicy Available
                </Typography>
            </Box>
        </Paper>
    );
};

export default CategoryFilter;