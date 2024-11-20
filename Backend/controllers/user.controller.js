import createTokenSaveCookie from "../jwt/generateToken.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"; // For hashing passwords

const signUp = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if ([name, email, password, confirmPassword].some((field) => field?.trim() === "")) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match!" });
    }
    const user = await User.findOne({ email });

    if (user) {
        return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        name,
        email,
        password: hashedPassword, // Save the hashed password
    });

    try {
        // Save the new user to the database
        await newUser.save();
        const createdUser = await User.findById(newUser._id).select(
            "-password "
        )
        if (newUser) {
            createTokenSaveCookie(newUser._id, res)
            res.status(201).json({ message: "User created successfully", createdUser });
        }
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
}

const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({ message: "Email or password is incorrect" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Email or password is incorrect" });
        }

        createTokenSaveCookie(user._id, res);

        const { password: _, ...userWithoutPassword } = user._doc;

        res.status(200).json({ message: "User logged in successfully!", user: userWithoutPassword });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error logging in user", error: error.message });
    }
};

const logOut = async (req, res) => {
    try {
        res.clearCookie('jwt')
        res.status(200).json({ message: "User logged out successfully!" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error logging in user", error: error.message });
    }
}


export {
    signUp,
    logIn,
    logOut
}