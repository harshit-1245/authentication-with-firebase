const express=require("express")
const { getUser,register, loginUser } = require( "../controller/userController" )
const router=express()

router.route("/user").get(getUser)
router.route("/register").post(register)
router.route("/login").post(loginUser)


module.exports=router