import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const jwttoken = (users)=>{
    return jwt.sign({users}, process.env.JWT_TOKEN, { expiresIn: "1h" });
}