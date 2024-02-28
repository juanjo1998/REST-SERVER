const { response, request } = require("express");
const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generateJWT");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        msg: `The user with email: ${email} dont exist.`,
      });
    }

    if (!user.status) {
      res.status(400).json({
        msg: `The user: ${user.email}, is inactive.`,
      });
    }

    // validar contraseña

    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
      res.status(400).json({
        msg: `The password is not correct.`,
      });
    }

    // generar JWT

    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {}
};

module.exports = { login };
