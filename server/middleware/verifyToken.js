import jwt from 'jsonwebtoken'

const verifyToken = async (req, res, next) => {
  try {
    let token = req.header('Authorization')
    if (!token) {
      return res.status(403).send('Access Denied')
    }
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trim()
    }
    const verified = jwt.verify(token, process.env.JWT_KEY)
    req.user = verified
    next()
  } catch (error) {
    console.log(error)
    res.status(500).send('Token verification failed')
  }
}

// verify Admin
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next()
    } else {
      res.status(403).send('Access Denied')
    }
  })
}

export { verifyToken, verifyAdmin }
