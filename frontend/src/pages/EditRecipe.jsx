import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditRecipe() {
    const [recipeData, setRecipeData] = useState({
        title: '',
        ingredients: [],
        instruction: [],
        time: '',
        file: null,
    });
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch existing recipe data
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/recipe/${id}`);
                const responsed = response.data;
                setRecipeData({
                    title: responsed.title || '',
                    ingredients: responsed.ingredients || [],
                    instruction: responsed.instruction || [],
                    time: responsed.time || '',
                    file: null, // Reset file field for editing
                });
            } catch (error) {
                console.error("Error fetching recipe:", error);
            }
        };
        getData();
    }, [id]);

    const onHandleChange = (e) => {
        let val;
        if (e.target.name === "ingredients") {
            // Split ingredients into an array
            val = e.target.value.split("\n").map(item => item.trim());
        } else if (e.target.name === "instruction") {
            // Split instructions into an array by newline
            val = e.target.value.split("\n").map(item => item.trim());
        } else if (e.target.name === "file") {
            val = e.target.files[0];
        } else {
            val = e.target.value;
        }
        setRecipeData(prev => ({ ...prev, [e.target.name]: val }));
    };

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        console.log(recipeData);

        const formData = new FormData();
        for (const key in recipeData) {
            if (Array.isArray(recipeData[key])) {
                // Append array items separately
                recipeData[key].forEach((item, index) => {
                    formData.append(`${key}[${index}]`, item);
                });
            } else if (key === "file" && recipeData[key]) {
                formData.append(key, recipeData[key]);
            } else {
                formData.append(key, recipeData[key]);
            }
        }

        try {
            const response = await axios.put(`http://localhost:4000/recipe/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authorization': 'Bearer ' + localStorage.getItem("token"),
                },
            });
            console.log(response.data);
            navigate("/myRecipe");
        } catch (error) {
            console.error("There was an error!", error);
        }
    };

    return (
        <div className='container'>
            <form className='form' onSubmit={onHandleSubmit}>
                <div className='form-control'>
                    <label>Title:</label>
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
                    <label>Cooking Time:</label>
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
                    <label>Ingredients:</label>
                    <textarea
                        className='input-textarea'
                        name="ingredients"
                        rows="5"
                        onChange={onHandleChange}
                        value={recipeData.ingredients.join("\n")}
                        placeholder="Enter each ingredient on a new line"
                        required
                    />
                </div>
                <div className='form-control'>
                    <label>Instructions:</label>
                    <textarea
                        className='input-textarea'
                        name="instruction"
                        rows="5"
                        onChange={onHandleChange}
                        value={recipeData.instruction.join("\n")}
                        placeholder="Enter each instruction step on a new line"
                        required
                    />
                </div>
                <div className='form-control'>
                    <label>Recipe Image:</label>
                    <input
                        type="file"
                        className='imageInput'
                        name="file"
                        onChange={onHandleChange}
                    />
                </div>
                <button type="submit">Update Recipe</button>
            </form>
        </div>
    );
}
