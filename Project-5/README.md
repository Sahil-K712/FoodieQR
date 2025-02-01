# QR Menu Generator Feature 🍽️

## Features Added
- QR Menu page with interactive dish cards
- Search functionality for dishes
- Category-wise filtering (veg, non-veg, starters, etc.)
- Dynamic QR code generation for each dish
- Responsive design for all screen sizes

## Technical Implementation
- React with Vite for fast development
- Material UI for modern UI components
- Framer Motion for smooth animations
- QR code generation using qrcode.react
- CSS animations and transitions

## Components Created
1. **DishGrid.jsx**
   - Main container for all dishes
   - Search and filter functionality
   - Category navigation

2. **DishCard.jsx**
   - Individual dish display
   - QR code generation
   - Nutrition information overlay
   - Image display

3. **Supporting Components**
   - SearchBar.jsx
   - CategoryFilter.jsx
   - LoadingSpinner.jsx

## Data Structure
- Implemented dishes-data.js with:
  - Dish details
  - Nutritional information
  - Categories
  - Pricing

## QR Code Implementation
- Each QR code will redirect to: `/calculator/${dish.id}`
- Ready for integration with calculator page


## Testing Done
- ✅ All dish cards render correctly
- ✅ Search functionality works
- ✅ Category filtering works
- ✅ QR codes generate properly
- ✅ Responsive on all screens
- ✅ Images load correctly

## Next Steps
- Integration with calculator page
- Connection with login/signup flow
- Firebase integration (handled by another team member)

## Notes for Team
- QR codes are set up to redirect to calculator page
- Image paths are ready for Firebase URLs
- Component structure allows easy integration