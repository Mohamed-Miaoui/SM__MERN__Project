import User from '../models/User';

const bcrypt = require('bcrypt');

//register user
export const register = async (req,res) =>{
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