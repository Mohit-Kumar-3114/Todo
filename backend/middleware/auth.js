const jwt=require("jsonwebtoken")

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No token provided' });
    }
    try {
      const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
      req.userId = decoded.id;
      next();
    } catch (error) {
      res.status(500).json({ message: 'Invalid token' });
    }
  };

module.exports={authenticate}