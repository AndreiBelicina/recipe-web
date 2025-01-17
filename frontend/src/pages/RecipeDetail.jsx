import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function RecipeDetail() {
    const [recipeData, setRecipeData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/recipe/${id}`);
                const fetchedRecipe = response.data;
                setRecipeData(fetchedRecipe);
            } catch (error) {
                console.error("Error fetching recipe details:", error);
            }
        };
        getData();
    }, [id]);

    return (
        <div className='bg-recipe-detail'>
            <div className="recipe-detail-container">
                {Object.keys(recipeData).length === 0 ? (
                    <p>Loading recipe details...</p>
                ) : (
                    <>
                        <h1>{recipeData.title}</h1>
                        <img
                            src={`http://localhost:4000/images/${recipeData.coverImage}`}
                            alt={recipeData.title}
                            className="recipe-image"
                        />
                        <p><strong>Cooking Time:</strong> {recipeData.time}</p>
                        <p><strong>Ingredients:</strong></p>
                        <ul>
                            {recipeData.ingredients?.map((ingredient, index) => (
                                <li key={index}>
                                    <label>
                                        {ingredient}
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <p><strong>Instructions:</strong></p>
                        <p>{recipeData.instruction}</p>
                    </>
                )}
            </div>
        </div>
    );
}
