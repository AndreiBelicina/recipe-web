import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { GoStopwatch } from "react-icons/go"
import { IoHeartOutline } from "react-icons/io5";

export default function RecipeItems() {
    const allRecipes = useLoaderData()
    console.log(allRecipes)
  return (
    <>
        <div className='card-container'>
            {allRecipes.map((recipe, index) => {
                return (
                    <div key={index} className='card'>
                        <img className='coverImage' src = {`http://localhost:4000/images/${recipe.coverImage}`} alt={recipe.title}></img>
                        <div className='card-body'>
                            <div className='title'>{recipe.title}</div> 
                            <div className='icons'>
                                <div className='timer'><GoStopwatch /> {recipe.time}</div>
                                <IoHeartOutline />
                            </div>
                        </div>
                    </div>
                )
            })}
            
        </div>
    </>
    
  )
}
