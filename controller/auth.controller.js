import bcrypt from "bcrypt";
import prisma from "../config/db.config.js";

class AuthController {
  static async register(req, res) {
    const { name, email, password } = req.body;
    if (!name && !email && !password) {
      res.json({
        message: "All fields are required. Please fill are detail",
      });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: bcrypt.hashSync(password, 10),
      },
    });

    return res.json({ message: "Account created successfully" });
  }
}

export default AuthController;
