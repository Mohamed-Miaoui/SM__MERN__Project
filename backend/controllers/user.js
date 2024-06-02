const User = require('../models/User')


const getUser = async (req,res) =>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({errors : error.message})
    }
}

const getUserFreinds = async (req,res) => {
   try {
    const {id} = req.params;
    const user = await User.findById(id)

    // fetch all freinds by the id of each from freinds record
    const freinds = await Promise.all(
        user.freinds.map((id) => User.findById(id))
    )
    const formattedFreinds = freinds.map(
        ({_id,firstName,lastName,occupation,location,picturePath}) =>{
            return {_id,firstName,lastName,occupation,location,picturePath};
        }
    )
    res.status(200).json(formattedFreinds)
    
   } catch (error) {
    res.status(404).json({errors : error.message})
   }
}

const addAndRemoveFreind = async (req,res) =>{
    //this methode work to add and remove at the same time , if id of freind exist in user freinds then remove freind elese add
    try {
        const {id,friendId} = req.params;
        const user = await User.findById(id)
        const friend = await User.findById(friendId)

        //remove from  each other freinds list
        if(user.freinds.includes(friendId)){
            user.freinds = user.freinds.filter((id)=> id !== friendId)
            friend.freinds = friend.freinds.filter((id) => !id ==id);

        // add each other in freind list if they where not before
        }else{
            user.freinds.push(friendId);
            friend.freinds.push(id);   
        }
        await user.save()
        await friend.save()

        //we get the user's freind list after the adding or removal of freind
        const freinds = await Promise.all(
            user.freinds.map((id) => User.findById(id))
        )
        const formattedFreinds = freinds.map(
            ({_id,firstName,lastName,occupation,location,picturePath}) =>{
                return {_id,firstName,lastName,occupation,location,picturePath};
            }
        );
        res.status(200).json(formattedFreinds)
    } catch (error) {
        res.status(404).json({errors : error.message})
    }
}


module.exports = {
    getUser,
    getUserFreinds,
    addAndRemoveFreind
}