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

export {signUp}