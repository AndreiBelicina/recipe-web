import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditRecipe() {
    const [recipeData, setRecipeData] = useState({});
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const getData = async () => {
            await axios.get(`http://localhost:4000/recipe/${id}`)
                .then(response => {
                    let responsed = response.data;
                    setRecipeData({
                        title: responsed.title,
                        ingredients: responsed.ingredients.join(", "), // Joining for displaying
                        instruction: responsed.instruction,
                        time: responsed.time
                    });
                })
                .catch(error => console.error("Error fetching recipe:", error));
        };
        getData();
    }, [id]);

    const onHandleChange = (e) => {
        let val = (e.target.name === "ingredients") 
            ? e.target.value.split(",").map(item => item.trim()) // Splitting back into an array
            : (e.target.name === "file") 
            ? e.target.files[0] 
            : e.target.value;
        
        setRecipeData(prev => ({ ...prev, [e.target.name]: val }));
    };

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        console.log(recipeData); // Log the recipe data to ensure it's correct

        const formData = new FormData();
        for (const key in recipeData) {
            if (Array.isArray(recipeData[key])) {
                // For ingredients, loop through and append each value separately
                recipeData[key].forEach((item, index) => {
                    formData.append(`${key}[${index}]`, item);
                });
            } else {
                formData.append(key, recipeData[key]);
            }
        }

        try {
            const response = await axios.put(`http://localhost:4000/recipe/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
            console.log(response.data); // Log the response from the backend
            navigate("/myRecipe");
        } catch (error) {
            console.error("There was an error!", error);
        }
    };

    return (
        <>
            <div className='container'>
                <form className='form' onSubmit={onHandleSubmit}>
                    <div className='form-control'>
                        <label>Title</label>
                        <input 
                            type="text" 
                            className='input' 
                            name="title" 
                            onChange={onHandleChange} 
                            value={recipeData.title} 
                            required 
                        />
                    </div>
                    <div className='form-control'>
                        <label>Time</label>
                        <input 
                            type="text" 
                            className='input' 
                            name="time" 
                            onChange={onHandleChange} 
                            value={recipeData.time} 
                            required 
                        />
                    </div>
                    <div className='form-control'>
                        <label>Ingredients</label>
                        <textarea 
                            className='input-textarea' 
                            name="ingredients" 
                            rows="5" 
                            onChange={onHandleChange} 
                            value={recipeData.ingredients} 
                            required 
                        />
                    </div>
                    <div className='form-control'>
                        <label>Instructions</label>
                        <textarea 
                            className='input-textarea' 
                            name="instruction" 
                            rows="5" 
                            onChange={onHandleChange} 
                            value={recipeData.instruction} 
                            required 
                        />
                    </div>
                    <div className='form-control'>
                        <label>Recipe Image</label>
                        <input 
                            type="file" 
                            className='input' 
                            name="file" 
                            onChange={onHandleChange} 
                        />
                    </div>
                    <button type="submit">Edit Recipe</button>
                </form>
            </div>
        </>
    );
}
