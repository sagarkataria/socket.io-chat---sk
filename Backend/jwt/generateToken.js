import jwt from "jsonwebtoken"

const createTokenSaveCookie = (userId , res)=>{
    const token = jwt.sign({userId},process.env.JWT_TOKEN,{
        expiresIn:"5d"
    });
    res.cookie("jwt",token,{
        httpOnly:true, //xss
        secure:true,
        sameSite:"strict" // csrf
    })
}

export default createTokenSaveCookie