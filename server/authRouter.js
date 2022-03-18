const Router = require("express");
const { check } = require("express-validator");

const controller = require("./authController");
const authMiddleware = require('./middleware/authMiddleware');
const roleMiddleware = require('./middleware/roleMiddleware')

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
router.get("/users", roleMiddleware(['ADMIN']), controller.getUsers);

module.exports = router;
