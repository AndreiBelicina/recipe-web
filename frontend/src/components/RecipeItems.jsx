import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { FaClock } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function RecipeItems() {
    const recipes = useLoaderData();
    const [allRecipes, setAllRecipes] = useState(recipes);
    let path = window.location.pathname === "/myRecipe";
    let favRecipes = JSON.parse(localStorage.getItem("fav")) ?? [];
    const [favorites, setFavorites] = useState(favRecipes);

    console.log(allRecipes);

    useEffect(() => {
        setAllRecipes(recipes);
    }, [recipes]);

    const onDelete = async (id) => {
        await axios.delete(`http://localhost:4000/recipe/${id}`);
        setAllRecipes(recipes => recipes.filter(recipe => recipe._id !== id));
        let filterItem = favorites.filter(recipe => recipe._id !== id);
        localStorage.setItem("fav", JSON.stringify(filterItem));
        setFavorites(filterItem);
    };

    const favRecipe = (recipe) => {
        let updatedFavRecipes;
        if (favorites.some(fav => fav._id === recipe._id)) {
            updatedFavRecipes = favorites.filter(fav => fav._id !== recipe._id); // Remove from favorites
        } else {
            updatedFavRecipes = [...favorites, recipe]; // Add to favorites
        }
        localStorage.setItem("fav", JSON.stringify(updatedFavRecipes));
        setFavorites(updatedFavRecipes); // Update the local state to reflect changes immediately
    };

    return (
        <>
            <div className="card-container">
                {allRecipes.map((recipe, index) => (
                    <Link
                        key={index}
                        to={`/recipe/${recipe._id}`}
                        className="card-link"
                    >
                        <div className="card">
                            <img
                                className="coverImage"
                                src={`http://localhost:4000/images/${recipe.coverImage}`}
                                alt={recipe.title}
                            />
                            <div className="card-body">
                                <div className="title">{recipe.title}</div>
                                <div className="icons">
                                    <div className="timer">
                                        <FaClock size={15} /> {recipe.time}
                                    </div>
                                    {!path ? (
                                        <FaHeart
                                            onClick={(e) => {
                                                e.preventDefault();
                                                favRecipe(recipe);
                                            }}
                                            style={{
                                                color: favorites.some(
                                                    (response) =>
                                                        response._id === recipe._id
                                                )
                                                    ? "red"
                                                    : "",
                                            }}
                                        />
                                    ) : (
                                        <div className="action">
                                            <Link
                                                to={`/editRecipe/${recipe._id}`}
                                                className="editIcon"
                                            >
                                                <FaEdit size={18} />
                                            </Link>
                                            <AiFillDelete
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    onDelete(recipe._id);
                                                }}
                                                className="deleteIcon"
                                                size={20}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}
