import { syncIndexes } from "mongoose";
import User from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function createUser(req, res) {

    try {

        const passwordHash = bcrypt.hashSync(req.body.password,10)
        console.log(passwordHash) 



        const newUser = new User(
            {
                email: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: passwordHash
            }
        )

        await newUser.save()

        res.json({
            message: "User Created Successfully"
        })
    } catch (error) {
        res.json(
            {
                message: "error createing user"
            }
        )

    }
}

export async function loginUser(req,res){
    try{
        const user =await User.findOne({
            email :req.body.email
        })
        console.log(user)

        if(user==null){
            res.status(404).json({
                message:"User Not Found"
            })
        }else{
const ispasswordCorrect =bcrypt.compareSync(req.body.password,user.password)

            if(ispasswordCorrect){

                const payload = {
                    email : user.email,
                    firstname : user.firstname,
                    lastname : user.lastname,
                    isAdmin :user.isAdmin,
                    isBlocked : user.isBlocked,
                    isEmailVerified : user.isEmailverified,
                    image :user.image
                }
                
                const token =jwt.sign(payload,"computer",{
                    expiresIn : "48h"
                })
            
               res.json({
                token : token
               })
            }else{
                res.status(401).json({
                    message : "Invalied Password"
                })

            }
        }


    }catch(errror){
        res.status(504).json({
            message :"error Log in"
        })
    }
}



export  function isAdmin(req){
        if(req.user == null){
            return false
        }
        if(req.user.isAdmin){
            return true
        }else{
            return false
        }
}