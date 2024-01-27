const express=require("express")
const { getUser,register } = require( "../controller/userController" )
const router=express()

router.route("/user").get(getUser)
router.route("/register").post(register)


module.exports=router