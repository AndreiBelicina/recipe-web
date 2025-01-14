import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddFoodRecipe() {
    const [recipeData, setRecipeData] = useState({});
    const navigate = useNavigate();

    const onHandleChange = (e) => {
        let val = (e.target.name === "ingredients") ? e.target.value.split(",") : (e.target.name === "file") ? e.target.files[0] : e.target.value;
        setRecipeData(pre => ({ ...pre, [e.target.name]: val }));
    };

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        console.log(recipeData); // Log the recipe data to ensure it's correct
        const formData = new FormData();
        for (const key in recipeData) {
            formData.append(key, recipeData[key]);
        }
        try {
            const response = await axios.post("http://localhost:4000/recipe", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
            console.log(response.data); // Log the response from the backend
            navigate("/");
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
                        <input type="text" className='input' name="title" onChange={onHandleChange} required />
                    </div>
                    <div className='form-control'>
                        <label>Time</label>
                        <input type="text" className='input' name="time" onChange={onHandleChange} required />
                    </div>
                    <div className='form-control'>
                        <label>Ingredients</label>
                        <textarea className='input-textarea' name="ingredients" rows="5" onChange={onHandleChange} required></textarea>
                    </div>
                    <div className='form-control'>
                        <label>Instructions</label>
                        <textarea className='input-textarea' name="instruction" rows="5" onChange={onHandleChange} required></textarea>
                    </div>
                    <div className='form-control'>
                        <label>Recipe Image</label>
                        <input type="file" className='input' name="file" onChange={onHandleChange} required />
                    </div>
                    <button type="submit">Add Recipe</button>
                </form>
            </div>
        </>
    );
}