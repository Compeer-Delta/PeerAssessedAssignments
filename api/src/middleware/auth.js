// Authentication controller for validating user credentials

//need to change token "thisismynewcourse" to something else with process.env.JWT_SECRET
import jwt from "jsonwebtoken";
import User from "../schemas/user.js";
import Admin from "../schemas/admin.js";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "").replace(/"/g, ""); // remove "Bearer " from the token and remove the " from the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // decode the token returning {email: "email@email.com", iat: 123456789, exp: 123456789}
    let user;
    user =
      (await User.findOne({ email: decoded.email })) ||
      (await Admin.findOne({ email: decoded.email })); // find the user in the database

    if (!user) {
      throw new Error();
    }

    if (!token) {
      return res.status(401).send({ error: "Access denied." });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

export default auth;
