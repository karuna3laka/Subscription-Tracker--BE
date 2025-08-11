import User from '../models/user.model.js'

// fetch all the users
export const getUsers = async (req, res, next ) => {
    try {
        const users = await User.find();

//       1.  User -> refer to mongoose model shit
//       2.  .find -> mongoose method, tell mongoDB to give me all the info in
//        users collection

        res.status(200).json({ success: true, data : users });
    } catch(error){
        next(error);
    }
}

// fetch just single user
export const getUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id).select('-password');

//      3. .select('-password) is mongoose feature to which fields of the document
//         to include or exclude from the result.


        if(!user) {
            const error = new Error ('User not found !');
            error.statusCode = 404 ;
            throw error;
        }
        res.status(200).json({ success: true, data: user });
    }catch(error){
        next(error);
    }
}