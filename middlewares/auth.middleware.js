import { JWT_SECRET } from '../config/loadEnv.js'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

//  HOW this happen !
//  some one making req -> authorized middleware -> verify ! -> if valid -> next -> get user details

const authorized = async (req, res, next ) => {
    try {
        let token ;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token) return res.status(401).json({ message: 'Unauthorized !'});

        const decoded = jwt.verify(token , JWT_SECRET);
        //jwt.verify → Checks if the token is valid and not expired using the secret.

        const user = await User.findById(decoded.userId);
        //Finds the user in MongoDB using the userId from the token payload.

        if(!user) return res.status(401).json({ message: 'Unauthorized ! Dumbaass '})

        req.user = user ;

        next();

    }catch (error){
    res.status(401).json({ message : 'Unauthorized' , error : error.message });
    }
}
export default authorized;