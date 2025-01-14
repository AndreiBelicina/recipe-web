const User = require("../models/user")
const bcrypt = require("bcrypt")
const { response } = require("express")
const jwt = require("jsonwebtoken")

const userSignUp = async(request, response) => {
    const {email, password} = request.body
    if (!email || !password)
    {
        return response.status(400).json({message: "Email and password is required."})
    }
    let user = await User.findOne({email})
    if (user)
    {
        return response.status(400).json({error: "Email already exist."})
    }
    
    const hashPwd = await bcrypt.hash(password, 10)
    const newUser = await User.create({
        email, password: hashPwd})

    let token = jwt.sign({email, id:newUser._id}, process.env.SECRET_KEY)
    return response.status(200).json({token, user: newUser})
}

const userLogin = async(request, response) => {
    const {email, password} = request.body
    if (!email || !password)
    {
        return response.status(400).json({message: "Email and password is required."})
    }
    let user = await User.findOne({email})
    if (user && await bcrypt.compare(password, user.password))
    {
        let token = jwt.sign({email, id:user._id}, process.env.SECRET_KEY)
        return response.status(200).json({token, user})
    }
    else {
        return response.status(400).json({error: "Invalid credentials."})
    }
}
const getUser = async(request, response) => {
    const user = await User.findById(request.params.id)
    response.json({email:user.email})
}

module.exports = {userLogin, userSignUp, getUser}