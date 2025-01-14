import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'  
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation'
import axios from "axios"
import AddFoodRecipe from './pages/AddFoodRecipe'

axios.defaults.baseURL = 'http://localhost:4000'; 

const getAllRecipes = async () => {
  let allRecipes = []
  await axios.get('http://localhost:4000/recipe').then(response=>{
    allRecipes = response.data
  })
  return allRecipes
}

const getMyRecipes = async()=> {
  let user = JSON.parse(localStorage.getItem("user"))
  let allRecipes = await getAllRecipes()
  return allRecipes.filter(item=>item.createdBy===user._id)
}

const router = createBrowserRouter([
  {path: "/", element: <MainNavigation/>, children:[
    {path: "/", element: <Home/>, loader: getAllRecipes},
    {path: "/myRecipe", element: <Home/>, loader: getMyRecipes},
    {path: "/favRecipe", element: <Home/>, loader: getAllRecipes},
    {path: "/addRecipe", element: <AddFoodRecipe/>},
  ]}
])

export default function App() {
    return (
        <>
           <RouterProvider router = {router} >
              
           </RouterProvider>
        </>
    )
}