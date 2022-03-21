const userService = require("../service/user-service");

class UserController {
  async registration(req, res, next) {
    try {
      // const errors = validationResult(req);

      // if (!errors.isEmpty()) {
      //   return res.status(400).json({ message: "Validation error" });
      // }

      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);

      //   if (candidate) {
      //     return res.status(400).json({ message: "User name exist" });
      //   }

      //   user.save();
      //   return res.json({ message: "User has been successfully registered" });
    } catch (e) {
      next(e)
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "user not find" });
      }
      const validatePassword = bcrypt.compareSync(password, user.password);
      if (!validatePassword) {
        return res.status(400).json({ message: "incorrect password" });
      }

      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token });
    } catch (e) {
      next(e)
    }
  }

  async logout(req, res, next) {
    try {
    } catch (e) {
      next(e)
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      console.log("link activation...", activationLink);
      await userService.activate(activationLink);
      res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e)
    }
  }

  async refresh(req, res, next) {
    try {
    } catch (e) {
      next(e)
    }
  }

  async getUsers(req, res) {
    try {
      const users = await UserSchema.find();
      res.json(users);
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new UserController();
