import jwt from 'jsonwebtoken'

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(authHeader===''|| authHeader===null || authHeader === undefined){
        return res.status(401).json({message:"UnAuthorized"})
    }

    const token = authHeader.split(" ")[1]

    jwt.verify(token,process.env.SECRET_KEY,(err,payload)=>{
        if(err) return res.status(401).json({status:401,message:"UnAuthorization"})

        req.user = payload
        next()
    })

}

export default authMiddleware