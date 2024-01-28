const express = require("express")
const cors=require("cors")
const colors=require("colors")
const session=require("express-session")
const cookieParser=require("cookie-parser")
const userRouter=require("./routing/useRoute")
const { connectDB } = require( "./database/db" )
const app=express()

require("dotenv").config()

const port=process.env.PORT || 4000

connectDB()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 3600000,
    },
  }));

app.use("/",userRouter)



app.listen(port,()=>{
    console.log(`server live at port ${port}`.yellow.bold)
})


