import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/db.config.js";

class AuthController {
  static async register(req, res) {
    try {
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
    } catch (error) {
      res.status(501).json({
        message: "Something went wrong. Please try again later",
      });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (user) {
        const isValidPassword = await bcrypt.compare(password,user.password);
       if(isValidPassword){
        const payload = {
          id:user.id,
          name:user.name,
          email:user.email
        }
        const token = jwt.sign(payload,process.env.SECRET_KEY,{
          expiresIn:"365d"
        })
        console.log(token)
       return res.json({message:"Logged in successfully",access_token:`Bearer ${token}`})
       }
    
      }

    return  res.status(401).json({ message: "Invalid Crediential" });
    } catch (error) {
    return  res.status(501).json({
        message: "Something went wrong. ",
      });
    }
  }


  static async user(req,res){
    const user = req.user;
    return res.status(200).json({user})
  }

}

export default AuthController;
