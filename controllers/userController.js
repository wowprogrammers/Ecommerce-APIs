import {User} from '../models/userSchema.js';
console.log(User)

// Create User
const signUp = async(req,res) => {
    try {
      
        const {firstName,lastName,address,email,password,passwordConfirm,role,photo} = req.body;

        const user = await User.create({
            firstName,
            lastName,
            photo,
            role,
            address,
            email,
            password,
            passwordConfirm

        })

        if(user){
            return res.status(201).json({
                status:"Success",
                user
            })
        }

    } catch (error) {
        res.status(400).json({Error:error.message});
    }
} 
// Get user by Id
const getUserById = async(req,res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({
                status:"fails",
                Error:"User with this id does not exist"
            })
        }
        
        res.status(200).json({
            status:"Success",
            user
        })
    } catch (error) {
        res.status(400).json({Error:error.message});
    }
}

// FilterObj
const FilterObj = (obj,...allowedFields) => {
    // console.log(obj,allowedFields)
    const newObj = {};
    Object.keys(obj).forEach(elem => {
        if(allowedFields.includes(elem)){
            newObj[elem] = obj[elem]
        }
    })
    return newObj
}

// Update User Address field

const updateUser = async(req,res) => {
    try {
        
        const id = req.params.id;
        const checkUser = await User.findById(id);
        if(!checkUser){
            return res.status(404).json({
                status:"Error",
                Error:"User with this id does not exist"
            })
        }
       const filterdBody = FilterObj(req.body,"address");

       const updatedUser = await User.findByIdAndUpdate(id,filterdBody,{
        new:true,
        runValidators:true
       })

       if(updateUser){
        return res.status(200).json({
            status:"Success",
            user:updatedUser
        })
       }



    } catch (error) {
        res.status(400).json({Error:error.message});
    }
}

export {signUp,getUserById,updateUser}