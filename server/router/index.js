const Router = require("express").Router;
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const router = Router();
const jwt = require("jsonwebtoken");
// import model
const User = require("../models/user-model");

router.post(
  "/registration",
  [
    check("name", "Please Currect Type Your Name").isLength({ min: 3 }),
    check("surname", "Please Currect Type Your Surname").isLength({ min: 3 }),
    check("email", "Not validation email").isEmail(),
    check("password", "Min length 6 symbol").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "error register",
        });
      }
      const { name, surname, email, password } = req.body;

      const createdUser = await User.findOne({ email });
      if (createdUser) {
        return res
          .status(400)
          .json({
            message: "There is an account with the given email address",
          });
      }

      const pass = await bcrypt.hash(password, 12);

      const user = new User({
        name: name,
        surname: surname,
        email: email,
        password: pass,
      });
      const created = await user.save();
      return res.status(200).json({
        data: created,
        status: true,
      });
    } catch (error) {
      return res.status(500).json({ message: error, status: false });
    }
  }
);

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    console.log(error, "error user");
  }
});
router.post(
  "/sign-in",
  [
    check("email", "Invalid Email").normalizeEmail().isEmail(),
    check("password", "pass yes").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "error login",
        });
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (user && bcrypt.compareSync(password, user.password)) {
        const tokenUser = jwt.sign({ password: user.password }, "secret123");
        return res.json({
          status: true,
          user: tokenUser,
          email: user.email,
          name: user.name,
          surname: user.surname,
          password: user.password,
        });
      } else {
        return res.json({ status: false, user: "error" });
      }
    } catch (error) {
      return res.status(500).json({ message: "not" });
    }
  }
);

module.exports = router;
