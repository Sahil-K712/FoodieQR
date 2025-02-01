import React, { useState, useEffect } from "react";
import { PlusCircle, MinusCircle } from "lucide-react";

const DishTracker = ({ id }) => {
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [servings, setServings] = useState(1);
  const [calculatedNutrition, setCalculatedNutrition] = useState(null);

  useEffect(() => {
    const fetchDish = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://project02-a6ab2-default-rtdb.firebaseio.com/dishes/${id}.json`);
        if (!response.ok) {
          throw new Error("Failed to fetch dish");
        }
        const data = await response.json();
        if (!data) {
          throw new Error("Dish not found");
        }
        setDish(data);
        setCalculatedNutrition(calculateNutrition(data.items, servings));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDish();
    }
  }, [id]);

  useEffect(() => {
    if (dish?.items) {
      setCalculatedNutrition(calculateNutrition(dish.items, servings));
    }
  }, [servings, dish]);

  const calculateNutrition = (items, servingCount) => {
    const totalNutrition = items.reduce(
      (totals, item) => {
        const quantityFactor = item.quantity / 100; // Assuming nutrition values are per 100g/unit
        return {
          calories: totals.calories + item.caloriesPerUnit * quantityFactor,
          protein: totals.protein + item.nutrition.protein * quantityFactor,
          carbohydrates: totals.carbohydrates + item.nutrition.carbohydrates * quantityFactor,
          fats: totals.fats + item.nutrition.fats * quantityFactor,
          fiber: totals.fiber + item.nutrition.fiber * quantityFactor,
          sugar: totals.sugar + item.nutrition.sugar * quantityFactor,
        };
      },
      { calories: 0, protein: 0, carbohydrates: 0, fats: 0, fiber: 0, sugar: 0 }
    );

    return {
      calories: (totalNutrition.calories || 0) * servingCount,
      protein: (totalNutrition.protein || 0) * servingCount,
      carbohydrates: (totalNutrition.carbohydrates || 0) * servingCount,
      fats: (totalNutrition.fats || 0) * servingCount,
      fiber: (totalNutrition.fiber || 0) * servingCount,
      sugar: (totalNutrition.sugar || 0) * servingCount,
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (!dish) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">No dish found</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/food-bg-image.jpg')" }}
    >
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 opacity-90">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">{dish.name}</h2>
        
        <div className="flex flex-col md:flex-row gap-6 mb-4">
          <img
            src={dish.image || "/api/placeholder/400/300"}
            alt={dish.name}
            className="w-full md:w-1/3 h-48 object-cover rounded-lg shadow-md"
          />
          
          <div className="flex-1">
            <p className="text-gray-600 mb-4">{dish.description}</p>

            {/* Nutrition Information */}
            <h3 className="font-semibold text-lg mb-2">Nutritional Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {calculatedNutrition &&
                Object.entries(calculatedNutrition).map(([key, value]) => (
                  <div key={key} className="bg-green-100 p-4 rounded-lg shadow-md transition hover:bg-green-200">
                    <div className="text-xl font-bold text-green-800">
                      {typeof value === "number" ? value.toFixed(1) : value}
                      {key === "calories" ? "" : "g"}
                    </div>
                    <div className="text-sm text-gray-600 capitalize">{key}</div>
                  </div>
                ))}
            </div>

            {/* Servings Control */}
            <h3 className="font-semibold text-lg mb-2">Servings</h3>
            <div className="flex items-center gap-4 mb-4 border-t pt-4 border-gray-300">
              <button
                onClick={() => setServings(Math.max(0.5, servings - 0.5))}
                className="p-2 text-green-600 hover:bg-green-100 rounded-full transition"
              >
                <MinusCircle size={24} />
              </button>
              <span className="w-16 text-center text-xl font-bold">{servings}</span>
              <button
                onClick={() => setServings(servings + 0.5)}
                className="p-2 text-green-600 hover:bg-green-100 rounded-full transition"
              >
                <PlusCircle size={24} />
              </button>
            </div>

            {/* Ingredients and Info */}
            <h3 className="font-semibold text-lg mb-2">Ingredients</h3>
            <p className="text-gray-600 mb-4">{dish.items?.map((item) => item.name).join(", ")}</p>

            {dish.dietaryInfo && (
              <>
                <h3 className="font-semibold text-lg mb-2">Dietary Info</h3>
                <p className="text-gray-600 mb-4">{dish.dietaryInfo.join(", ")}</p>
              </>
            )}
            
            {dish.allergens && (
              <>
                <h3 className="font-semibold text-lg mb-2">Allergens</h3>
                <p className="text-gray-600 mb-4">{dish.allergens.join(", ")}</p>
              </>
            )}
            
            {dish.prepTime && (
              <>
                <h3 className="font-semibold text-lg mb-2">Prep Time</h3>
                <p className="text-gray-600">{dish.prepTime}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishTracker;
