import User from '../models/user.model.js'

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json({
      success: true,
      message: 'Users Fetched Successfully',
      data: users,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'User Fetch Failed',
      error,
    })
  }
}

// get latest users
const getLatestUsers = async (req, res) => {
  const query = req.query.latest
  try {
    const users = query
      ? await User.find().sort({ createdAt: -1 }).limit(5)
      : await User.find()
    res.status(200).json({
      success: true,
      message: 'Users Fetched Successfully',
      data: users,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'User Fetch Failed',
      error,
    })
  }
}

// get single user
const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User Not Found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'User Fetched Successfully',
      data: user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'User Fetch Failed',
      error,
    })
  }
}

// update user
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User Not Found',
      })
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json({
      success: true,
      message: 'User Updated Successfully',
      data: updatedUser,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'User Update Failed',
      error,
    })
  }
}

// delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User Not Found',
      })
    }
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    res.status(200).json({
      success: true,
      message: 'User deleted Successfully',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'User Deletion Failed!',
      error,
    })
  }
}

// get admin:
const getAdmin = async (req, res) => {
  try {
    const admin = await User.findById(req.params.id)
    if (!admin) {
      return res.status(404).json({
        message: "User can't be found",
      })
    }
    const { password, ...info } = admin._doc
    res.status(200).json({
      message: 'User has been found successfully',
      data: info,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'User query failed',
      error: error,
    })
  }
}

// get user stats
const getUserStats = async (req, res) => {
  try {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

    const userStats = await User.aggregate([
      {
        $match: { createdAt: { $gte: lastYear } },
      },
      {
        $project: {
          month: { $month: '$createdAt' },
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: 1 },
        },
      },
    ])
    res.status(200).json({
      message: 'User Stats Retrieved Successfully',
      userStats,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'An error occurred aquiring User Statistics',
      error: error.message,
    })
  }
}

export {
  getAllUsers,
  getLatestUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getAdmin,
  getUserStats,
}
