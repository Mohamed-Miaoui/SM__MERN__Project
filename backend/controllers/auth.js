const User = require('../models/User')
const jwt = require("jsonwebtoken");



const bcrypt = require('bcrypt');

//register user
 const register = async (req,res) =>{
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            freinds,
            location,
            occupation
        } = req.body;

        //password encryption with the generated salt by bcrypt
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password : passwordHash,
            picturePath,
            freinds,
            location,
            occupation,
            viewedProfile:Math.floor(Math.random() * 10000),//dummy data
            impressions:Math.floor(Math.random() * 10000)//dummy data
        })
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({errors : error.message})
    }
}

//login user
const login = async (req,res) => {
    try {
        const {email, password} =req.body
        const user = await User.findOne({email:email});
        // NO user with specified email
        if(!user){
            return res.status(400).json({msg:"user does not exist"})
        }
        // if email exist check encrypted password 
        const isMatch= await bcrypt.compare(password, user.password);
        //password do not match
        if(!isMatch){
            return res.status(400).json({msg:"Wrong Password" })
        }
        //The sign method creates a JWT by encoding the payload(userid) with the secret key in (process.env.JWT_SECRET).
        //token = validation(it proves ur authenticty)
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
        //we delete the password so it will not be send to frontend for safty reasons
        delete user.password;
        res.status(200).json({token,user})
    } catch (error) {
        res.status(500).json({errors:error.message})
    }
}

module.exports = {
    register,
    login
}