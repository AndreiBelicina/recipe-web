import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { set } from 'mongoose'

export default function InputForm({setIsOpen}) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSignUp, setIsSignUp] = useState(false)
    const [error, setError] = useState("")

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        let endpoint = (isSignUp) ? "signUp" : "login"
        await axios.post(`http://localhost:4000/${endpoint}`, {email, password})
        .then((response) => {
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("user", JSON.stringify(response.data.user))
            setIsOpen()           
        })
        .catch((error) => {
            console.error("There was an error!", error.response);
            setError(error.response?.data?.error);
        })
    }

  return (
    <>
        <form className='form' onSubmit = {handleOnSubmit}>
            <div className='form-control'>
                <label>Email</label>
                <input type='email' className='input' placeholder='Enter email' onChange = {(e)=>setEmail(e.target.value)} required></input>
            </div>
            <div className='form-control'>
                <label>Password</label>
                <input type='password' className='input' placeholder='Enter password' onChange = {(e)=>setPassword(e.target.value)} required></input>
            </div>
            <button type='submit'>{(isSignUp) ? "Sign Up":"Login"}</button> <br></br>
            { (error!= "") &&  <h6 className='error'>{error}</h6>}
            <p onClick={()=> setIsSignUp(pre=>!pre)}>{(isSignUp) ? "Already have an account" : "Create new account"}</p>
        </form>
    </>
  )
}
