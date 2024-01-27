const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const crypto=require("crypto")

//defining userSChema
const userSchema=new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },
      phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
      },
      isEmailVerified: {
        type: Boolean,
        default: false,
      },
      emailVerificationToken: {
        type: String,
      },
      tokens: [{
        token: {
          type: String,
          required: true,
        },
      }],
})

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
    const user = this;
  
    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  
    next();
  });
  
  // Generate a token for user authentication
  userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'your_secret_key'); // Replace 'your_secret_key' with your actual secret key
  
    user.tokens = user.tokens.concat({ token });
    await user.save();
  
    return token;
  };
  
  // Generate a token for email verification
  userSchema.methods.generateEmailVerificationToken = function () {
    const user = this;
    const token = crypto.randomBytes(20).toString('hex');
    user.emailVerificationToken = token;
  
    return token;
  };
  
  // Create the User model
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;