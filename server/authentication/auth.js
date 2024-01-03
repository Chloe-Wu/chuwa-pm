import jwt from 'jsonwebtoken';

export const userAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userID = decoded.user.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Authentification Failed" });
  }
};  

export const loginAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userID = decoded.user.id;
    next();
  } catch (err) {
    next();
  }
};

export const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.user.admin) {
      return next();
    }
    res.status(401).json({ message: "Authentification Failed" });
  } catch (err) {
    return res.status(401).json({ message: "Authentification Failed" });
  }
};
