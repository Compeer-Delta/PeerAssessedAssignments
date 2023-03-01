// Authentication controller for validating user credentials

//need to change token "thisismynewcourse" to something else with process.env.JWT_SECRET
import jwt from "jsonwebtoken";
import User from "../schemas/user.js";
import Admin from "../schemas/admin.js";

const auth = async (req, res, next) => {
  try {
    // token is in the header of the request
    const token = req.header("Authorization").replace("Bearer ", "");
    // verifies the token
    const decoded = jwt.verify(token, "thisismynewcourse");
    let user;
    if (decoded.adminId) {
      user = await Admin.findOne({ _id: decoded._id, "tokens.token": token });
    } else {
      user = await User.findOne({ _id: decoded._id, "tokens.token": token });
    }
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(405).send({ error: "Please authenticate." });
  }
};

export default auth;
