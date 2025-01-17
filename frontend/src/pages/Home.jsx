import React from 'react'
import test1 from '../assets/test2.jpg'
import NavBar from '../components/NavBar'
import Footer from '../components/footer'
import RecipeItems from '../components/RecipeItems'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Modal from '../components/modal'
import InputForm from '../components/inputForm'

export default function Home(){
const navigate = useNavigate()
const [isOpen, setIsOpen] = useState(false)

const addRecipe =()=> {
    let token = localStorage.getItem("token")
    if(token)
     navigate("/addRecipe")
    else{
        setIsOpen(true)
    }
}
    return (
        <>
         <section className='home'>
                <div className='left'>
                    <h1><span className='taste'>Taste</span><span className='buds'>Buds</span></h1>
                    <h5> <span> Welcome to TasteBuds </span> – Where Your Culinary Creations Come to Life!
                    <br /><br />

At TasteBuds, we believe everyone has a recipe worth sharing. Our platform lets you easily create and share your own recipes, as well as explore a growing collection of mouthwatering dishes submitted by other food enthusiasts. Whether you're looking for inspiration or want to contribute your own unique recipe, you'll find a vibrant community here to help you cook, discover, and connect.   
<br />
<br />

What We Offer:
<li>Share Your Recipes: Post your favorite dishes and recipes for others to try, complete with ingredients, instructions, and images.</li>

<li>Browse & Discover: Explore a wide variety of recipes created by fellow users and find your next favorite meal.</li>

<li>Favorites: Save the recipes you love with a simple click, and keep them in your personal favorites list for easy access.</li>

<li>Delete & Manage: Update or remove any recipes you've shared with ease, keeping your collection fresh and relevant.</li>
<br />
<br />
Join our community, showcase your culinary talent, and let the world of flavors inspire you.

Start sharing and discovering today at TasteBuds </h5>
                    <button onClick={addRecipe}>Share your recipe</button>
                </div>
                <div className='right'>
                    <img className ='picture' width={"700px"} height = {"500px"} src = {test1}/>
                </div>
            </section>
            <div className = 'bg'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d4f6e8" fill0opacity="1" d="M0,160L17.1,138.7C34.3,117,69,75,103,48C137.1,21,171,11,206,21.3C240,32,274,64,309,69.3C342.9,75,377,53,411,74.7C445.7,96,480,160,514,181.3C548.6,203,583,181,617,160C651.4,139,686,117,720,133.3C754.3,149,789,203,823,202.7C857.1,203,891,149,926,133.3C960,117,994,139,1029,160C1062.9,181,1097,203,1131,224C1165.7,245,1200,267,1234,256C1268.6,245,1303,203,1337,202.7C1371.4,203,1406,245,1423,266.7L1440,288L1440,320L1422.9,320C1405.7,320,1371,320,1337,320C1302.9,320,1269,320,1234,320C1200,320,1166,320,1131,320C1097.1,320,1063,320,1029,320C994.3,320,960,320,926,320C891.4,320,857,320,823,320C788.6,320,754,320,720,320C685.7,320,651,320,617,320C582.9,320,549,320,514,320C480,320,446,320,411,320C377.1,320,343,320,309,320C274.3,320,240,320,206,320C171.4,320,137,320,103,320C68.6,320,34,320,17,320L0,320Z"></path></svg>
            </div>

         {(isOpen) && <Modal onClose = {() => setIsOpen(false)}><InputForm setIsOpen = {() => setIsOpen(false)}></InputForm></Modal>}

            <div className ='recipe'>
                <RecipeItems/>
            </div>
        </>
    )
}