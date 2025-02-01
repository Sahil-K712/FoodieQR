import React, { useState } from 'react';
import { 
    TextField, 
    InputAdornment, 
    IconButton, 
    Paper,
    Box,
    Tooltip,
    Fade,
    Chip
} from '@mui/material';

import { 
    FaSearch, 
    FaTimes, 
    FaHistory,
    FaFilter
} from 'react-icons/fa';

import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [searchHistory] = useState(['Butter Chicken', 'Masala Dosa', 'Biryani']);
    const [showHistory, setShowHistory] = useState(false);

    const handleClear = () => {
        setSearchTerm('');
        setShowHistory(false);
    };

    const handleHistoryClick = (term) => {
        setSearchTerm(term);
        setShowHistory(false);
    };

    return (
        <Box sx={{ position: 'relative' }}>
            <motion.div
                initial={false}
                animate={{ scale: isFocused ? 1.02 : 1 }}
                transition={{ duration: 0.2 }}
            >
                <Paper
                    elevation={isFocused ? 4 : 1}
                    sx={{
                        transition: 'all 0.3s ease',
                        borderRadius: '12px',
                        '&:hover': {
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                        }
                    }}
                >
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search for dishes, cuisines, or ingredients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => {
                            setIsFocused(true);
                            setShowHistory(true);
                        }}
                        onBlur={() => {
                            setIsFocused(false);
                            // Delay hiding history to allow for clicks
                            setTimeout(() => setShowHistory(false), 200);
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FaSearch 
                                        style={{ 
                                            color: isFocused ? '#1976d2' : '#666',
                                            transition: 'color 0.3s ease'
                                        }}
                                    />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        {searchTerm && (
                                            <Tooltip title="Clear search">
                                                <IconButton
                                                    size="small"
                                                    onClick={handleClear}
                                                    sx={{ 
                                                        transition: 'all 0.3s ease',
                                                        '&:hover': { 
                                                            backgroundColor: 'rgba(0,0,0,0.1)' 
                                                        }
                                                    }}
                                                >
                                                    <FaTimes />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                        <Tooltip title="Search history">
                                            <IconButton
                                                size="small"
                                                onClick={() => setShowHistory(!showHistory)}
                                                sx={{
                                                    transition: 'all 0.3s ease',
                                                    transform: showHistory ? 'rotate(180deg)' : 'none'
                                                }}
                                            >
                                                <FaHistory />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Advanced filters">
                                            <IconButton
                                                size="small"
                                                sx={{ 
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': { 
                                                        backgroundColor: 'rgba(0,0,0,0.1)' 
                                                    }
                                                }}
                                            >
                                                <FaFilter />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </InputAdornment>
                            ),
                            sx: {
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none'
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    border: 'none'
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    border: 'none'
                                },
                                padding: '12px 16px'
                            }
                        }}
                        sx={{
                            '& .MuiInputBase-input': {
                                fontSize: '1.1rem'
                            }
                        }}
                    />
                </Paper>
            </motion.div>

            {/* Search History Dropdown */}
            <AnimatePresence>
                {showHistory && searchHistory.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            zIndex: 1000,
                            marginTop: '8px'
                        }}
                    >
                        <Paper
                            elevation={4}
                            sx={{
                                p: 2,
                                borderRadius: '12px',
                                backgroundColor: 'rgba(255, 255, 255, 0.98)'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 1
                                }}
                            >
                                {searchHistory.map((term, index) => (
                                    <Chip
                                        key={index}
                                        label={term}
                                        onClick={() => handleHistoryClick(term)}
                                        onDelete={() => {/* Handle delete */}}
                                        sx={{
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                backgroundColor: 'primary.light',
                                                color: 'white'
                                            }
                                        }}
                                    />
                                ))}
                            </Box>
                        </Paper>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Quick Suggestions */}
            <Fade in={searchTerm.length > 0}>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 1,
                        mt: 1
                    }}
                >
                    {['Vegetarian', 'Spicy', 'Quick Meals', 'Desserts'].map((suggestion, index) => (
                        <Chip
                            key={index}
                            label={suggestion}
                            size="small"
                            variant="outlined"
                            onClick={() => setSearchTerm(suggestion)}
                            sx={{
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: 'primary.light',
                                    color: 'white'
                                }
                            }}
                        />
                    ))}
                </Box>
            </Fade>
        </Box>
    );
};

export default SearchBar;