const Users = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secretKey =  process.env.SECRET_KEY;
//Register User

const registerUser = async (req, res) => {
    

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    //already exist user
    const user = await Users
        .findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new Users({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role
    });

    try {
        await newUser.save();
        res.status(200).json({
            message: 'User created successfully'
        });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


//Login User
const loginUser = async (req, res) => {
    Users.findOne({ email: req.body.email })
    .then(user => {
        if(user){
            if(bcrypt.compareSync(req.body.password,user.password)){
                const payload ={
                    username: user.username,
                    email: user.email,
                    role: user.role
                };
                let token = jwt.sign(payload, secretKey,{
                    expiresIn: 1440
                });
                
                res.status(200).json({token: token});
                
            }else{
                res.status(401).json({message: 'Password is not correct'});

            }
           }
           else{
               res.status(404).json({message: 'User not found'});
           }
        })
        .catch(err => {
            res.status(500).json({message: err.message});

        });
    };


//update User Role
const updateUserRole = async(req, res) => {
    const id = req.params.id;

    try {
        const updatedUser = await Users.findByIdAndUpdate (id, req.body,
            {new: true});
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//view all users
const viewAllUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const resetPassword = async (req, res) => {
     try{
        const authHeader = req.headers.authorization;
        
        if(!authHeader){
            return res.status(403).json({message: 'Access Denied'});
        }

        const token = authHeader.split(' ')[1];

        let verified;
        try{
            verified = jwt.verify(token, secretKey);
      
         }catch (error) {
            return res.status(403).json({message: 'Invalid Token'});
        }
        const email = verified.email;
        const user = await Users.findOne({ email: email });
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        
        //check old password correct and add new password
        if(bcrypt.compareSync(req.body.oldPassword,user.password)){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
            user.password = hashedPassword;
            await user.save();
            //password updated status true update
            await user.updateOne({passwordResetstatus: true});
            res.status(200).json({message: 'Password updated successfully'});
        }
        else{
            res.status(401).json({message: 'Old password is not correct'});
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

const removeUser = async (req, res) => {
    const id = req.params.id;

    try {
        await Users.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//find user password restatus status true or false
const findUserPasswordResetStatus = async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email });
        res.status(200).json({ passwordResetstatus: user.passwordResetstatus });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//view user profile by id
const viewUserprofile = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(403).json({message: 'Access Denied'});
        }

        const token = authHeader.split(' ')[1];

        let verified;
        try{
            verified = jwt.verify(token, secretKey);
      
         }catch (error) {
            return res.status(403).json({message: 'Invalid Token'});
        }
        const email = verified.email;
        const user = await Users.findOne({ email: email });
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}


module.exports = {
    registerUser,
    loginUser,
    updateUserRole,
    viewAllUsers,
    resetPassword,
    removeUser,
    findUserPasswordResetStatus,
    viewUserprofile
};
    
