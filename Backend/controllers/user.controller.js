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
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
}

export{
    signUp
}