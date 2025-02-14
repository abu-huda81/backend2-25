import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

// register
const register = async (req, res) => {
  try {
    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // create user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    })
    const user = await newUser.save()
    const { password, ...info } = user._doc
    res.status(200).json({
      success: true,
      message: 'User Created Successfully',
      data: info,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'User Creation Failed',
      error,
    })
  }
}

// login
const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Email Not Found',
      })
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Password',
      })
    }
    const { password, ...info } = user._doc
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_KEY,
      { expiresIn: '5d' }
    )
    res.status(200).json({
      success: true,
      message: 'User Logged In Successfully',
      data: { ...info, token },
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Login Failed',
      error,
    })
  }
}

export { register, login }
