const Router = require("express");
const { check } = require("express-validator");

const controller = require("./authController");
const authMiddleware = require('./middleware/authMiddleware');

const router = new Router();

router.post(
  "/registration",
  [
    check("username", "Empty username").notEmpty(),
    check("password", "Password must be from 4 to 8 chunk").isLength({
      min: 4,
      max: 8,
    }),
  ],
  controller.registration
);
router.post("/login", controller.login);
router.get("/users", authMiddleware, controller.getUsers);

module.exports = router;
