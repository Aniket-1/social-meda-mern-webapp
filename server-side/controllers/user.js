import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try{    
        let existingUser = await User.findOne({email});
        if(!existingUser) return res.status(404).json({message:"user Doesn't exist"})
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({message: "Invalid Password"});
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.JWT_TOKEN_SECRET, {expiresIn: '1h'});
        return res.status(200).json({result: existingUser, token})

    }catch(e){
        console.log(e);
        res.status(500).json({message: "Something Went Wrong."})
    }
}

export const signup = async (req, res) =>{
    console.log(req.body)
    const {email, password, firstName, lastName, confirmPassword} = req.body;
    try{
        let existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message:"user exist"});
        if(password != confirmPassword){
            return res.status(400).json({message:"Password Dont Match"});
        }        
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
        const token = jwt.sign( { email: result.email, id: result._id }, process.env.JWT_TOKEN_SECRET, { expiresIn: "1h" } );

        res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }

}
