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
                    <h5> <span> Welcome to TasteBuds </span> – Where Your Culinary Creations Come to Life!
                    <br /><br />

                    At TasteBuds, we believe everyone has a recipe worth sharing. Our platform lets you easily create and share your own recipes, as well as explore a growing collection of mouthwatering dishes submitted by other food enthusiasts. Whether you're looking for inspiration or want to contribute your own unique recipe, you'll find a vibrant community here to help you cook, discover, and connect.   
                    <br /> </h5>

                    <button onClick={addRecipe}>Share your recipe </button> 

                    <h5>Join our community, showcase your culinary talent, and let the world of flavors inspire you. Start sharing and discovering today at TasteBuds!</h5>
                </div>
                <div className='right'>
                    <img className ='picture' width={"700px"} height = {"500px"} src = {test1}/>
                </div>
            </section>
            <div className = 'bg'>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#FF8C64" fill-opacity="1" d="M0,32L34.3,37.3C68.6,43,137,53,206,53.3C274.3,53,343,43,411,37.3C480,32,549,32,617,53.3C685.7,75,754,117,823,138.7C891.4,160,960,160,1029,170.7C1097.1,181,1166,203,1234,202.7C1302.9,203,1371,181,1406,170.7L1440,160L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#B5C68F" fill-opacity="1" d="M0,192L34.3,170.7C68.6,149,137,107,206,90.7C274.3,75,343,85,411,117.3C480,149,549,203,617,234.7C685.7,267,754,277,823,245.3C891.4,213,960,139,1029,112C1097.1,85,1166,107,1234,101.3C1302.9,96,1371,64,1406,48L1440,32L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#A8D5BA" fill-opacity="1" d="M0,288L48,288C96,288,192,288,288,261.3C384,235,480,181,576,165.3C672,149,768,171,864,197.3C960,224,1056,256,1152,245.3C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
            

            </div>

         {(isOpen) && <Modal onClose = {() => setIsOpen(false)}><InputForm setIsOpen = {() => setIsOpen(false)}></InputForm></Modal>}

            <div className ='recipe'>
                <RecipeItems/>
            </div>
        </>
    )
}