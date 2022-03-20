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
      console.log(e);
      res.status(400).json({ message: "Registration error" });
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
      console.log(e);
      res.status(400).json({ message: "Login error" });
    }
  }

  async logout(req, res, next) {
    try {
    } catch (e) {
      console.log(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.Link
      await userService.activate(activationLink)
      res.send(process.env.CLIENT_URL)
    } catch (e) {
      console.log(e);
    }
  }

  async refresh(req, res, next) {
    try {
    } catch (e) {
      console.log(e);
    }
  }

  async getUsers(req, res) {
    try {
      const users = await UserSchema.find();
      res.json(users);
    } catch (e) {}
  }
}

module.exports = new UserController();
