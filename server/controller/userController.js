const asyncHandler=require("express-async-handler")
const User = require( "../models/userModel" )

const { ApiResponse } = require( "../utils/ApiResponse" )
const { validateRegistration } = require( "../configuration/validation" )




const getUser=asyncHandler(async(req,res)=>{
    try {
        const user=await User.find()
        res.status(200).json(new ApiResponse(200,{user},"user information"))
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something gone wrong while getting user"})
    }
})

const register=asyncHandler(async(req,res)=>{
    try {
            // Validate the request body against the registration schema
            const {error}=validateRegistration(req.body)

            if (error) {
                // Validation failed
                return res.status(400).json({ message: 'Validation error', errors: error.details.map(d => d.message) });
              }
          // Destructure user input
    const { email, phone, password } = req.body;

    // Check if the user already exists based on email or phone
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or phone already exists' });
    }

    // Create a new user instance
    const newUser = new User({ email, phone, password });

    // Generate authentication token
    const authToken = await newUser.generateAuthToken();

    // Save the user to the database
    await newUser.save();

    res.status(201).json(new ApiResponse(201, { user: newUser, authToken }, "User registered successfully"));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong during registration" });
    }
})

module.exports={getUser,register}