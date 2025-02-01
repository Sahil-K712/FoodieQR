import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent, CardMedia, Typography, Chip, Box, IconButton } from '@mui/material';
import { FaLeaf, FaDrumstickBite, FaFire, FaInfoCircle } from 'react-icons/fa';
import { MdTimer, MdLocalOffer } from 'react-icons/md';
import AnimatedCard from './AnimatedCard';

const DishCard = ({ dish, index }) => {

    


    const [isFlipped, setIsFlipped] = useState(false);
    const [showNutrition, setShowNutrition] = useState(false);
    const [imageError, setImageError] = useState(false);

    
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [servingCount, setServingCount] = useState(1);


    const getCategoryIcon = () => {
        switch(dish.category) {
            case 'vegetarian': return <FaLeaf style={{ color: '#2e7d32' }} />;
            case 'non-vegetarian': return <FaDrumstickBite style={{ color: '#d32f2f' }} />;
            default: return <FaFire style={{ color: '#ed6c02' }} />;
        }
    };

    return (
        <Card sx={{ 
            maxWidth: 345, 
            m: 2,
            position: 'relative',
            cursor: 'pointer',
            '&:hover': {
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
            }
        }}>
            <CardMedia
                component="img"
                height="200"
                image={imageError ? 'https://via.placeholder.com/400x300?text=Food+Image' : `/images/dishes/${dish.image}`}
                alt={dish.name}
                onError={() => setImageError(true)}
               sx={{ objectFit: 'cover' }}
               
            />

             


            <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                    {getCategoryIcon()}
                    <Typography variant="h6">
                        {dish.name}
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" mb={2}>
                    {dish.description}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Box display="flex" alignItems="center" gap={0.5}>
                        <MdLocalOffer color="#1976d2" />
                        <Typography variant="h6" color="primary">
                            ₹{dish.price}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={0.5}>
                        <MdTimer color="#ed6c02" />
                        <Chip 
                            label={dish.prepTime}
                            size="small"
                            color="secondary"
                        />
                    </Box>
                </Box>

                {/* Nutrition and QR Buttons */}
                <Box display="flex" justifyContent="space-between">
                    <IconButton 
                        size="small"
                        onClick={() => setShowNutrition(true)}
                        sx={{ 
                            bgcolor: 'rgba(0,0,0,0.05)',
                            '&:hover': { bgcolor: 'rgba(0,0,0,0.1)' }
                        }}
                    >
                        <FaInfoCircle />
                    </IconButton>
                    <IconButton 
                        size="small"
                        onClick={() => setIsFlipped(!isFlipped)}
                        sx={{ 
                            bgcolor: 'rgba(0,0,0,0.05)',
                            '&:hover': { bgcolor: 'rgba(0,0,0,0.1)' }
                        }}
                    >
                        <QRCodeSVG value={JSON.stringify(dish)} size={20} />
                    </IconButton>
                </Box>
            </CardContent>

            {/* Nutrition Overlay */}
            <AnimatePresence>
                {showNutrition && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(255,255,255,0.95)',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}
                    >
                        <IconButton
                            sx={{ position: 'absolute', top: 8, right: 8 }}
                            onClick={() => setShowNutrition(false)}
                        >
                            ×
                        </IconButton>
                        <Typography variant="h6" gutterBottom>
                            Nutritional Info
                        </Typography>
                        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1}>
                            <Typography>Calories: {dish.totalNutrition?.calories}</Typography>
                            <Typography>Protein: {dish.totalNutrition?.protein}g</Typography>
                            <Typography>Carbs: {dish.totalNutrition?.carbohydrates}g</Typography>
                            <Typography>Fat: {dish.totalNutrition?.fats}g</Typography>
                        </Box>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* QR Code Overlay */}
            <AnimatePresence>
                {isFlipped && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(255,255,255,0.95)',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <IconButton
                            sx={{ position: 'absolute', top: 8, right: 8 }}
                            onClick={() => setIsFlipped(false)}
                        >
                            ×
                        </IconButton>
                        <QRCodeSVG 
                            value={JSON.stringify(dish)}
                            size={200}
                            level="H"
                        />
                        <Typography variant="caption" sx={{ mt: 2 }}>
                            Scan to view details
                        </Typography>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    );
};

DishCard.propTypes = {
    dish: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        prepTime: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        totalNutrition: PropTypes.object
    }).isRequired,
    index: PropTypes.number
};

export default DishCard;