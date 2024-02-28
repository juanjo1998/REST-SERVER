const jwt = require("jsonwebtoken");

const generateJWT = (uid = "") => {
  return new Promise((res, rej) => {
    const payload = { uid };

    // firmar un nuevo token

    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          rej("jwt error");
        } else {
          res(token);
        }
      }
    );
  });
};

module.exports = { generateJWT };
