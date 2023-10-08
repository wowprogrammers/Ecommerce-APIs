import mongoose  from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        trim:true
    },
    lastName:{
        type:String,
        trim:true
    },
    // Embeding the document As according to requirnment One user have exactly one address
    // one-to-one relationship
    address:{
        street:{
            type:String
        },
        houseNo:{
            type:String
        },
        postalCode:{
            type:Number 
        },
        landmarkLocation :{
            type:String
        }
    },
    email:{
        type:String,
        lowercase:true,
        validate:[validator.isEmail,"Please Enter Valid email address"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        select:false,
        minlength:8
    },
    passwordConfirm:{
        type:String,
        required:[true,"Confirm Password is required"],
        validate:{
            validator:function(elem){
                return elem === this.password;
            },
            message:"Password and confirm password are not same"
        }
    },
    role:{
        type:String,
        enum:['user','admin','vendor'],
        default:'user'
    },
    photo:{
        type:String,
        default:'defaultFile.jpg'
    }
})
// Thick Model thin Controller
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    // Hasing the password
    this.password = await bcrypt.hash(this.password,12);
    // Deleting the confirm password field
    this.passwordConfirm = undefined;
})

const User = mongoose.model('User',userSchema);
export {User};