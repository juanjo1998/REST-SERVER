const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "Dont exist token.",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // buscar usuario que corresponda con el uid

    const user = await User.findById(uid);

    // validar que el usuario con el uid exista

    if (!user) {
      return res.status(404).json({
        msg: `The user dont exist.`,
      });
    }

    if (!user.status) {
      return res.status(401).json({
        msg: `The user: ${user.email} status is inactive.`,
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Invalid token.",
    });
  }
};

module.exports = { validateJWT };
