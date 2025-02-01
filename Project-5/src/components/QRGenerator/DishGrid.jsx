import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { 
    Container, 
    Typography, 
    Box, 
    Paper,
    Divider,
    useTheme,
    useMediaQuery,
    AppBar,
    Toolbar,
    IconButton,
    Badge
} from '@mui/material';


import { 
    FaUtensils, 
    FaShoppingCart, 
    FaRegClock, 
    FaStar, 
    FaLeaf 

} from 'react-icons/fa';

import DishCard from './DishCard';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import LoadingSpinner from './LoadingSpinner';
import { dishes } from '../../data/dishes-data';
import './QRGenerator.css';

const DishGrid = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [filteredDishes, setFilteredDishes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const categories = ['all', 'vegetarian', 'non-vegetarian', 'starters', 'desserts', 'beverages'];

    useEffect(() => {
        setIsLoading(true);
        const allDishes = Object.values(dishes).flat();
        
        const filtered = allDishes.filter(dish => {
            const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                dish.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || dish.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        setTimeout(() => {
            setFilteredDishes(filtered);
            setIsLoading(false);
        }, 500);
    }, [searchTerm, selectedCategory]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                duration: 0.5,
                staggerChildren: 0.1 
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Paper 
                elevation={0} 
                sx={{ 
                    bgcolor: 'background.default',
                    borderRadius: 4,
                    overflow: 'hidden',
                    mb: 4
                }}
            >
                <Box 
                    className="header-section"
                    sx={{ 
                        background: 'linear-gradient(135deg,rgb(64, 218, 77) 0%, #2a5298 100%)', // More professional gradient
                        color: 'white',
                        py: 8,
                        px: 4,
                        textAlign: 'center',
                        borderRadius: '0 0 30px 30px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'url(/path-to-pattern.png)', // Add subtle pattern
                            opacity: 0.1
                        }
                    }}
                >
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Box display="flex" justifyContent="center" alignItems="center" gap={2} mb={2}>
                            <FaUtensils size={isMobile ? 24 : 32} />
                            <Typography 
                                variant={isMobile ? "h4" : "h3"} 
                                component="h1"
                                sx={{ 
                                    fontWeight: 700,
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                                }}
                            >
                                Digital Menu With QR Codes
                            </Typography>
                        </Box>
                        <Typography variant="h6" sx={{ opacity: 0.9 }}>
                            Scan, Browse, Order
                        </Typography>
                    </motion.div>
                </Box>

                <Box 
                    className="filters-section"
                    sx={{ 
                        px: 4, 
                        py: 3,
                        bgcolor: 'background.paper'
                    }}
                >
                    <SearchBar 
                        searchTerm={searchTerm} 
                        setSearchTerm={setSearchTerm} 
                    />
                    <Divider sx={{ my: 2 }} />
                    <CategoryFilter 
                        categories={categories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                </Box>
            </Paper>

            <AnimatePresence mode="wait">
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <motion.div 
                        className="dish-grid"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {filteredDishes.map((dish, index) => (
                            <motion.div
                                key={dish.id}
                                variants={itemVariants}
                                layout
                                layoutId={dish.id.toString()}
                            >
                                <DishCard dish={dish} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {!isLoading && filteredDishes.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Box 
                        className="no-results"
                        sx={{
                            textAlign: 'center',
                            py: 8,
                            px: 2
                        }}
                    >
                        <Typography 
                            variant="h5"
                            color="text.secondary"
                            gutterBottom
                        >
                            No dishes found matching your criteria
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Try adjusting your search or filters
                        </Typography>
                    </Box>
                </motion.div>
            )}

            {/* Stats Section */}
            <Box 
                sx={{ 
                    mt: 4, 
                    p: 3, 
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                    gap: 2
                }}
            >
                <Box textAlign="center">
                    <Typography variant="h4" color="primary" fontWeight="bold">
                        {Object.values(dishes).flat().length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Total Dishes
                    </Typography>
                </Box>
                <Box textAlign="center">
                    <Typography variant="h4" color="primary" fontWeight="bold">
                        {categories.length - 1}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Categories
                    </Typography>
                </Box>
                <Box textAlign="center">
                    <Typography variant="h4" color="primary" fontWeight="bold">
                        {filteredDishes.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Filtered Results
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default DishGrid;