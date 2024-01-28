const express=require("express")
const { getUser,register, loginUser,logoutUser } = require( "../controller/userController" )
const verifyjwt = require( "../middleware/auth" )
const router=express()

router.route("/user").get(getUser)
router.route("/register").post(register)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyjwt,logoutUser)


module.exports=router