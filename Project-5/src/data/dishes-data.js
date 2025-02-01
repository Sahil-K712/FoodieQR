export const dishes = {
    vegetarian: [
        // South Indian
        {
            id: 1,
            category: "vegetarian",
            subCategory: "south-indian",
            name: "Masala Dosa",
            image: "masala-dosa.jpg",
            description: "Crispy rice crepe with spiced potato filling",
            items: [
                { 
                    name: "Dosa", 
                    quantity: 1, 
                    caloriesPerUnit: 170,
                    nutrition: {
                        protein: 3.5,
                        carbohydrates: 30,
                        fats: 4.2,
                        fiber: 1.2,
                        sugar: 0.5
                    }
                },
                { 
                    name: "Potato Masala", 
                    quantity: 1, 
                    caloriesPerUnit: 150,
                    nutrition: {
                        protein: 2.8,
                        carbohydrates: 28,
                        fats: 3.5,
                        fiber: 2.4,
                        sugar: 1.2
                    }
                },
                { 
                    name: "Sambhar", 
                    quantity: 1, 
                    caloriesPerUnit: 120,
                    nutrition: {
                        protein: 6,
                        carbohydrates: 20,
                        fats: 2.5,
                        fiber: 4,
                        sugar: 2
                    }
                },
                { 
                    name: "Coconut Chutney", 
                    quantity: 1, 
                    caloriesPerUnit: 80,
                    nutrition: {
                        protein: 2,
                        carbohydrates: 4,
                        fats: 7,
                        fiber: 2,
                        sugar: 1
                    }
                }
            ],
            totalNutrition: {
                calories: 520,
                protein: 14.3,
                carbohydrates: 82,
                fats: 17.2,
                fiber: 9.6,
                sugar: 4.7
            },
            price: 150,
            prepTime: "15 mins",
            servingSize: "1 plate",
            allergens: ["Gluten"],
            dietaryInfo: ["Vegetarian"]
        },
        {
            id: 2,
            category: "vegetarian",
            subCategory: "south-indian",
            name: "Idli Sambar",
            image: "idli-sambar.jpg",
            description: "Steamed rice cakes with lentil soup",
            items: [
                {
                    name: "Idli",
                    quantity: 4,
                    caloriesPerUnit: 60,
                    nutrition: {
                        protein: 2,
                        carbohydrates: 12,
                        fats: 0.2,
                        fiber: 0.8,
                        sugar: 0.1
                    }
                },
                {
                    name: "Sambar",
                    quantity: 1,
                    caloriesPerUnit: 120,
                    nutrition: {
                        protein: 6,
                        carbohydrates: 20,
                        fats: 2.5,
                        fiber: 4,
                        sugar: 2
                    }
                },
                {
                    name: "Coconut Chutney",
                    quantity: 1,
                    caloriesPerUnit: 80,
                    nutrition: {
                        protein: 2,
                        carbohydrates: 4,
                        fats: 7,
                        fiber: 2,
                        sugar: 1
                    }
                }
            ],
            totalNutrition: {
                calories: 440,
                protein: 16,
                carbohydrates: 72,
                fats: 10.3,
                fiber: 9.2,
                sugar: 3.4
            },
            price: 120,
            prepTime: "10 mins",
            servingSize: "4 pieces",
            allergens: ["None"],
            dietaryInfo: ["Vegetarian", "Low Fat"]
        },
        {
            id: 3,
            category: "vegetarian",
            subCategory: "north-indian",
            name: "Paneer Butter Masala",
            image: "paneer-butter-masala.jpg",
            description: "Rich and creamy cottage cheese curry",
            items: [
                {
                    name: "Paneer",
                    quantity: 200,
                    caloriesPerUnit: 265,
                    nutrition: {
                        protein: 18.3,
                        carbohydrates: 3.4,
                        fats: 20.8,
                        fiber: 0,
                        sugar: 1.2
                    }
                },
                {
                    name: "Butter Gravy",
                    quantity: 1,
                    caloriesPerUnit: 350,
                    nutrition: {
                        protein: 4.2,
                        carbohydrates: 12,
                        fats: 32,
                        fiber: 2.5,
                        sugar: 4
                    }
                },
                {
                    name: "Naan",
                    quantity: 2,
                    caloriesPerUnit: 150,
                    nutrition: {
                        protein: 4.5,
                        carbohydrates: 25,
                        fats: 3.8,
                        fiber: 1.1,
                        sugar: 0.8
                    }
                }
            ],
            totalNutrition: {
                calories: 915,
                protein: 31.5,
                carbohydrates: 65.4,
                fats: 60.4,
                fiber: 4.7,
                sugar: 6.8
            },
            price: 280,
            prepTime: "25 mins",
            servingSize: "1 plate",
            allergens: ["Dairy", "Gluten"],
            dietaryInfo: ["Vegetarian", "High Protein"]
        },
        {
            id: 4,
            category: "vegetarian",
            subCategory: "north-indian",
            name: "Dal Makhani",
            image: "dal-makhani.jpg",
            description: "Creamy black lentils cooked overnight",
            items: [
                {
                    name: "Dal",
                    quantity: 1,
                    caloriesPerUnit: 320,
                    nutrition: {
                        protein: 15,
                        carbohydrates: 45,
                        fats: 12,
                        fiber: 8,
                        sugar: 2
                    }
                },
                {
                    name: "Butter Naan",
                    quantity: 2,
                    caloriesPerUnit: 150,
                    nutrition: {
                        protein: 4.5,
                        carbohydrates: 25,
                        fats: 3.8,
                        fiber: 1.1,
                        sugar: 0.8
                    }
                },
                {
                    name: "Onion",
                    quantity: 1,
                    caloriesPerUnit: 30,
                    nutrition: {
                        protein: 1,
                        carbohydrates: 7,
                        fats: 0.1,
                        fiber: 1.5,
                        sugar: 3
                    }
                }
            ],
            totalNutrition: {
                calories: 650,
                protein: 25,
                carbohydrates: 102,
                fats: 19.7,
                fiber: 11.7,
                sugar: 6.6
            },
            price: 220,
            prepTime: "30 mins",
            servingSize: "1 bowl",
            allergens: ["Dairy", "Gluten"],
            dietaryInfo: ["Vegetarian", "High Protein"]
        }
    ],

    


        nonVegetarian: [
            {
                id: 5,
                category: "non-vegetarian",
                subCategory: "chicken",
                name: "Butter Chicken",
                image: "butter-chicken.jpg",
                description: "Creamy tomato-based chicken curry",
                items: [
                    {
                        name: "Chicken",
                        quantity: 250,
                        caloriesPerUnit: 220,
                        nutrition: {
                            protein: 25,
                            carbohydrates: 0,
                            fats: 12,
                            fiber: 0,
                            sugar: 0
                        }
                    },
                    {
                        name: "Butter Gravy",
                        quantity: 1,
                        caloriesPerUnit: 350,
                        nutrition: {
                            protein: 4.2,
                            carbohydrates: 12,
                            fats: 32,
                            fiber: 2.5,
                            sugar: 4
                        }
                    },
                    {
                        name: "Naan",
                        quantity: 2,
                        caloriesPerUnit: 150,
                        nutrition: {
                            protein: 4.5,
                            carbohydrates: 25,
                            fats: 3.8,
                            fiber: 1.1,
                            sugar: 0.8
                        }
                    }
                ],
                totalNutrition: {
                    calories: 870,
                    protein: 38.2,
                    carbohydrates: 62,
                    fats: 51.6,
                    fiber: 4.7,
                    sugar: 5.6
                },
                price: 320,
                prepTime: "30 mins",
                servingSize: "1 plate",
                allergens: ["Dairy", "Gluten"],
                dietaryInfo: ["High Protein"]
            },
            {
                id: 6,
                category: "non-vegetarian",
                subCategory: "chicken",
                name: "Chicken Biryani",
                image: "chicken-biryani.jpg",
                description: "Fragrant rice dish with spiced chicken",
                items: [
                    {
                        name: "Rice",
                        quantity: 1,
                        caloriesPerUnit: 300,
                        nutrition: {
                            protein: 6,
                            carbohydrates: 65,
                            fats: 0.6,
                            fiber: 1,
                            sugar: 0.1
                        }
                    },
                    {
                        name: "Chicken",
                        quantity: 200,
                        caloriesPerUnit: 220,
                        nutrition: {
                            protein: 25,
                            carbohydrates: 0,
                            fats: 12,
                            fiber: 0,
                            sugar: 0
                        }
                    },
                    {
                        name: "Raita",
                        quantity: 1,
                        caloriesPerUnit: 80,
                        nutrition: {
                            protein: 3.2,
                            carbohydrates: 6,
                            fats: 5,
                            fiber: 0.5,
                            sugar: 4
                        }
                    }
                ],
                totalNutrition: {
                    calories: 600,
                    protein: 34.2,
                    carbohydrates: 71,
                    fats: 17.6,
                    fiber: 1.5,
                    sugar: 4.1
                },
                price: 280,
                prepTime: "45 mins",
                servingSize: "1 plate",
                allergens: ["Dairy"],
                dietaryInfo: ["High Protein"]
            },
            {
                id: 7,
                category: "non-vegetarian",
                subCategory: "mutton",
                name: "Mutton Rogan Josh",
                image: "mutton-rogan-josh.jpeg",
                description: "Kashmiri style spiced mutton curry",
                items: [
                    {
                        name: "Mutton",
                        quantity: 250,
                        caloriesPerUnit: 250,
                        nutrition: {
                            protein: 28,
                            carbohydrates: 0,
                            fats: 15,
                            fiber: 0,
                            sugar: 0
                        }
                    },
                    {
                        name: "Gravy",
                        quantity: 1,
                        caloriesPerUnit: 300,
                        nutrition: {
                            protein: 5,
                            carbohydrates: 15,
                            fats: 25,
                            fiber: 3,
                            sugar: 4
                        }
                    },
                    {
                        name: "Naan",
                        quantity: 2,
                        caloriesPerUnit: 150,
                        nutrition: {
                            protein: 4.5,
                            carbohydrates: 25,
                            fats: 3.8,
                            fiber: 1.1,
                            sugar: 0.8
                        }
                    }
                ],
                totalNutrition: {
                    calories: 850,
                    protein: 42,
                    carbohydrates: 65,
                    fats: 47.6,
                    fiber: 5.2,
                    sugar: 5.6
                },
                price: 350,
                prepTime: "45 mins",
                servingSize: "1 plate",
                allergens: ["Gluten"],
                dietaryInfo: ["High Protein"]
            },
            {
                id: 8,
                category: "non-vegetarian",
                subCategory: "seafood",
                name: "Fish Curry",
                image: "fish-curry.jpg",
                description: "Tangy and spicy fish curry",
                items: [
                    {
                        name: "Fish",
                        quantity: 200,
                        caloriesPerUnit: 180,
                        nutrition: {
                            protein: 22,
                            carbohydrates: 0,
                            fats: 10,
                            fiber: 0,
                            sugar: 0
                        }
                    },
                    {
                        name: "Curry",
                        quantity: 1,
                        caloriesPerUnit: 250,
                        nutrition: {
                            protein: 4,
                            carbohydrates: 12,
                            fats: 20,
                            fiber: 3,
                            sugar: 3
                        }
                    },
                    {
                        name: "Rice",
                        quantity: 1,
                        caloriesPerUnit: 130,
                        nutrition: {
                            protein: 2.7,
                            carbohydrates: 28,
                            fats: 0.3,
                            fiber: 0.4,
                            sugar: 0.1
                        }
                    }
                ],
                totalNutrition: {
                    calories: 560,
                    protein: 28.7,
                    carbohydrates: 40,
                    fats: 30.3,
                    fiber: 3.4,
                    sugar: 3.1
                },
                price: 300,
                prepTime: "25 mins",
                servingSize: "1 plate",
                allergens: ["Fish"],
                dietaryInfo: ["High Protein", "Omega-3 Rich"]
            }
        ],
    
        starters: [
            {
                id: 9,
                category: "starters",
                subCategory: "vegetarian",
                name: "Paneer Tikka",
                image: "paneer-tikka.jpg",
                description: "Grilled cottage cheese with spices",
                items: [
                    {
                        name: "Paneer Tikka",
                        quantity: 8,
                        caloriesPerUnit: 120,
                        nutrition: {
                            protein: 6,
                            carbohydrates: 3,
                            fats: 9,
                            fiber: 0.5,
                            sugar: 0.5
                        }
                    },
                    {
                        name: "Mint Chutney",
                        quantity: 1,
                        caloriesPerUnit: 50,
                        nutrition: {
                            protein: 1,
                            carbohydrates: 6,
                            fats: 3,
                            fiber: 1,
                            sugar: 2
                        }
                    }
                ],
                totalNutrition: {
                    calories: 290,
                    protein: 13,
                    carbohydrates: 9,
                    fats: 21,
                    fiber: 1.5,
                    sugar: 2.5
                },
                price: 220,
                prepTime: "20 mins",
                servingSize: "8 pieces",
                allergens: ["Dairy"],
                dietaryInfo: ["Vegetarian", "High Protein"]
            },
            {
                id: 10,
                category: "starters",
                subCategory: "non-vegetarian",
                name: "Chicken 65",
                image: "chicken-65.jpg",
                description: "Spicy deep-fried chicken starter",
                items: [
                    {
                        name: "Chicken",
                        quantity: 250,
                        caloriesPerUnit: 220,
                        nutrition: {
                            protein: 25,
                            carbohydrates: 8,
                            fats: 12,
                            fiber: 0,
                            sugar: 0
                        }
                    },
                    {
                        name: "Sauces",
                        quantity: 1,
                        caloriesPerUnit: 50,
                        nutrition: {
                            protein: 0.5,
                            carbohydrates: 10,
                            fats: 1,
                            fiber: 0.5,
                            sugar: 6
                        }
                    }
                ],
                totalNutrition: {
                    calories: 270,
                    protein: 25.5,
                    carbohydrates: 18,
                    fats: 13,
                    fiber: 0.5,
                    sugar: 6
                },
                price: 260,
                prepTime: "15 mins",
                servingSize: "8 pieces",
                allergens: ["None"],
                dietaryInfo: ["High Protein"]
            }
        ],
    
        breads: [
            {
                id: 11,
                category: "breads",
                name: "Butter Naan",
                image: "butter-naan.jpg",
                description: "Tandoor-baked flatbread with butter",
                items: [
                    {
                        name: "Naan",
                        quantity: 1,
                        caloriesPerUnit: 150,
                        nutrition: {
                            protein: 4.5,
                            carbohydrates: 25,
                            fats: 3.8,
                            fiber: 1.1,
                            sugar: 0.8
                        }
                    },
                    {
                        name: "Butter",
                        quantity: 1,
                        caloriesPerUnit: 102,
                        nutrition: {
                            protein: 0.1,
                            carbohydrates: 0,
                            fats: 11.5,
                            fiber: 0,
                            sugar: 0
                        }
                    }
                ],
                totalNutrition: {
                    calories: 252,
                    protein: 4.6,
                    carbohydrates: 25,
                    fats: 15.3,
                    fiber: 1.1,
                    sugar: 0.8
                },
                price: 40,
                prepTime: "10 mins",
                servingSize: "1 piece",
                allergens: ["Gluten", "Dairy"],
                dietaryInfo: ["Vegetarian"]
            }
        ],
    
        desserts: [
            {
                id: 12,
                category: "desserts",
                name: "Gulab Jamun",
                image: "gulab-jamun.jpg",
                description: "Deep-fried milk solids in sugar syrup",
                items: [
                    {
                        name: "Gulab Jamun",
                        quantity: 2,
                        caloriesPerUnit: 150,
                        nutrition: {
                            protein: 3,
                            carbohydrates: 25,
                            fats: 5,
                            fiber: 0,
                            sugar: 20
                        }
                    },
                    {
                        name: "Sugar Syrup",
                        quantity: 1,
                        caloriesPerUnit: 100,
                        nutrition: {
                            protein: 0,
                            carbohydrates: 25,
                            fats: 0,
                            fiber: 0,
                            sugar: 25
                        }
                    }
                ],
                totalNutrition: {
                    calories: 400,
                    protein: 3,
                    carbohydrates: 75,
                    fats: 5,
                    fiber: 0,
                    sugar: 65
                },
                price: 80,
                prepTime: "5 mins",
                servingSize: "2 pieces",
                allergens: ["Dairy", "Nuts"],
                dietaryInfo: ["Vegetarian", "Sweet"]
            },
            {
                id: 13,
                category: "desserts",
                name: "Rasmalai",
                image: "rasmalai.jpg",
                description: "Cottage cheese dumplings in sweet milk",
                items: [
                    {
                        name: "Rasmalai",
                        quantity: 2,
                        caloriesPerUnit: 180,
                        nutrition: {
                            protein: 8,
                            carbohydrates: 22,
                            fats: 8,
                            fiber: 0,
                            sugar: 20
                        }
                    },
                    {
                        name: "Sweet Milk",
                        quantity: 1,
                        caloriesPerUnit: 120,
                        nutrition: {
                            protein: 4,
                            carbohydrates: 15,
                            fats: 5,
                            fiber: 0,
                            sugar: 14
                        }
                    }
                ],
                totalNutrition: {
                    calories: 480,
                    protein: 20,
                    carbohydrates: 59,
                    fats: 21,
                    fiber: 0,
                    sugar: 54
                },
                price: 90,
                prepTime: "5 mins",
                servingSize: "2 pieces",
                allergens: ["Dairy", "Nuts"],
                dietaryInfo: ["Vegetarian", "Sweet"]
            }
        ],
    
        beverages: [
            {
                id: 14,
                category: "beverages",
                name: "Masala Chai",
                image: "masala-chai.jpg",
                description: "Indian spiced tea",
                items: [
                    {
                        name: "Masala Chai",
                        quantity: 1,
                        caloriesPerUnit: 80,
                        nutrition: {
                            protein: 2,
                            carbohydrates: 14,
                            fats: 2.5,
                            fiber: 0,
                            sugar: 12
                        }
                    },
                    {
                        name: "Milk",
                        quantity: 1,
                        caloriesPerUnit: 60,
                        nutrition: {
                            protein: 3.2,
                            carbohydrates: 5,
                            fats: 3.2,
                            fiber: 0,
                            sugar: 5
                        }
                    }
                ],
                totalNutrition: {
                    calories: 140,
                    protein: 5.2,
                    carbohydrates: 19,
                    fats: 5.7,
                    fiber: 0,
                    sugar: 17
                },
                price: 30,
                prepTime: "5 mins",
                servingSize: "1 cup",
                allergens: ["Dairy"],
                dietaryInfo: ["Vegetarian", "Hot Beverage"]
            },
            {
                id: 15,
                category: "beverages",
                name: "Lassi",
                image: "lassi.jpg",
                description: "Sweet yogurt-based drink",
                items: [
                    {
                        name: "Yogurt",
                        quantity: 1,
                        caloriesPerUnit: 100,
                        nutrition: {
                            protein: 4,
                            carbohydrates: 12,
                            fats: 4,
                            fiber: 0,
                            sugar: 10
                        }
                    },
                    {
                        name: "Sugar",
                        quantity: 1,
                        caloriesPerUnit: 50,
                        nutrition: {
                            protein: 0,
                            carbohydrates: 13,
                            fats: 0,
                            fiber: 0,
                            sugar: 13
                        }
                    }
                ],
                totalNutrition: {
                    calories: 150,
                    protein: 4,
                    carbohydrates: 25,
                    fats: 4,
                    fiber: 0,
                    sugar: 23
                },
                price: 60,
                prepTime: "5 mins",
                servingSize: "1 glass",
                allergens: ["Dairy"],
                dietaryInfo: ["Vegetarian", "Cold Beverage"]
            }
        ]
    };