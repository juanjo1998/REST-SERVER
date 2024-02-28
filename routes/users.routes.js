const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const {
  isRoleValid,
  emailExist,
  userExistById,
} = require("../helpers/db-validators");

const {
  getUsers,
  putUser,
  postUser,
  deleteUser,
  patchUser,
} = require("../controllers/UsersController");
const { validateJWT } = require("../middlewares/validateJWT");

const router = Router();

router.get("/", getUsers);

router.put(
  "/:id",
  [
    check("id", "MongoId invalid.").isMongoId(),
    check("id").custom(userExistById),
    check("role").custom(isRoleValid),
    validateFields,
  ],
  putUser
);

router.post(
  "/",
  [
    check("name", "The name is required.").not().isEmpty(),
    check("password", "The password must be more than 6 characters.").isLength({
      min: 6,
    }),
    check("email", "The email is not valid.").isEmail(),
    check("email").custom(emailExist),
    // check('role', 'No es un role válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check("role").custom(isRoleValid),
    validateFields,
  ],
  postUser
);

router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "MongoId invalid.").isMongoId(),
    check("id").custom(userExistById),
    validateFields,
  ],
  deleteUser
);

router.patch("/", patchUser);

module.exports = router;
