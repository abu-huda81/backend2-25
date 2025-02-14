import mongoose from 'mongoose'
import colors from 'colors'
import dotenv from 'dotenv'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('Database has been connected!!'.bgYellow.white)
  } catch (error) {
    console.log(error)
  }
}

export default connectDB
