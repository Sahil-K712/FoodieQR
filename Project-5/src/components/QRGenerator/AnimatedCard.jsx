// src/components/QRGenerator/AnimatedCard.jsx - Enhanced Version
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const AnimatedCard = ({ 
    children, 
    delay = 0,
    animationType = 'default',
    isVisible = true,
    onComplete
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const animationTypes = {
        default: {
            hidden: { opacity: 0, y: 20, scale: 0.95 },
            visible: { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: { duration: 0.5, delay }
            },
            hover: { scale: 1.02 },
            tap: { scale: 0.98 }
        },
        fade: {
            hidden: { opacity: 0 },
            visible: { 
                opacity: 1,
                transition: { duration: 0.5, delay }
            },
            hover: { opacity: 0.8 },
            tap: { opacity: 0.7 }
        },
        slide: {
            hidden: { x: -100, opacity: 0 },
            visible: { 
                x: 0, 
                opacity: 1,
                transition: { 
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay 
                }
            },
            hover: { x: 10 },
            tap: { x: -5 }
        },
        bounce: {
            hidden: { scale: 0 },
            visible: { 
                scale: 1,
                transition: { 
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay 
                }
            },
            hover: { 
                scale: 1.1,
                transition: { 
                    type: "spring",
                    stiffness: 400,
                    damping: 10
                }
            },
            tap: { scale: 0.9 }
        }
    };

    const glowEffect = {
        hover: {
            boxShadow: isHovered 
                ? "0px 0px 20px rgba(25, 118, 210, 0.3)"
                : "0px 0px 0px rgba(25, 118, 210, 0)",
            transition: { duration: 0.3 }
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    whileHover="hover"
                    whileTap="tap"
                    variants={animationTypes[animationType]}
                    onAnimationComplete={onComplete}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                >
                    <motion.div
                        variants={glowEffect}
                        style={{
                            borderRadius: '12px',
                            overflow: 'hidden'
                        }}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

AnimatedCard.propTypes = {
    children: PropTypes.node.isRequired,
    delay: PropTypes.number,
    animationType: PropTypes.oneOf(['default', 'fade', 'slide', 'bounce']),
    isVisible: PropTypes.bool,
    onComplete: PropTypes.func
};

export default AnimatedCard;