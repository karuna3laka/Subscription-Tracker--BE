import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';
import{JWT_SECRET,JWT_EXPIRES_IN} from '../config/loadEnv.js';

//what is req body? -> an object containing data from client

export const signUp = async (req, res ,next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const {name ,email ,password} = req.body;

        //Check it user Exist already !
        const existingUser = await User.findOne( { email });

        if(existingUser){
            const error = new Error('user already exists !');
            error.statusCode = 409 ;
            throw error;
        }

        //Hash PW
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUsers = await User.create([{name, email, password: hashedPassword}],{session});

        const token = jwt.sign({ userId: newUsers[0]._id}, JWT_SECRET, {expiresIn : JWT_EXPIRES_IN});


        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success : true,
            message : 'User created Successfully .! ',
            data : {
             token,
             user:newUsers[0],
            }
        })
    }catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const signIn = async ( req , res ,next) => {

}

export const signOut = async ( req , res ,next) => {

}


