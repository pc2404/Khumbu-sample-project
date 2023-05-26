import User from "../models/User.js";
import bcrypt from "bcrypt";

/* READ */
export const getFeedUsers = async (req, res) => {
    try {
        const UserList = await User.find();
        res.status(200).json(UserList);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

/* UPDATE */

export const updateUserName = async (req, res) => {
    try {
        const { userId, firstName, lastName } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                firstName,
                lastName,
            },
            { new: true }
        );

        const users = await User.find();
        res.status(200).json({updatedUser,users});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const updateEmailAddress = async (req, res) => {
    try {
        const { userId, email } = req.body;
        const isEmail=await User.findOne({email})
        if(isEmail) return res.json({message:"Email address already taken"})
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { email },
            { new: true }
        );

        const users = await User.find();
        res.status(200).json({updatedUser,users, message:null});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


export const updatePassword = async (req, res) => {
    try {
        const { userId, password } = req.body;

        const salt=await bcrypt.genSalt();
        const hashPassword=await bcrypt.hash(password, salt);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { password: hashPassword },
            { new: true }
        );

        const users = await User.find();
        res.status(200).json({updatedUser, users});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
