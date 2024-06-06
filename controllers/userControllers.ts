import {Request, Response} from 'express'
import { createUser, getUserByUsername } from '../repository/userRepository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

async function registerHandler(req: Request, res: Response) {
    const {email, username, password} = req.body

    try {
        if(!email || (!username) || (!password)){
            return res.status(400).json({
                status: false,
                message: "bad request form data is not valid",
                data: null
            })   
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const entity = await createUser(email, username, hashPassword)
        return res.status(201).json({
            status: true,
            message: "user account created successfully",
            data: entity
        })
    } catch (error) {
        if(error instanceof Error)
            return res.status(500).json({
                status: false,
                message: error.message,
                data: error
            })   
    }
}

async function loginHandler(req: Request, res: Response) {
    const {username, password} = req.body
    const secretKey = process.env.secretKey || "fkjsdfhsdkfhsjkghfkgjkfsdgkjfdfdsjgjfsdkgjfdkhgjfdkghjkfdkgjawoie3q2o9roewifsd"
    try {
        if(!username || (!password)){
            throw new Error('bad request form data is not valid')
        }
        const entity = await getUserByUsername(username)

        if(entity) {
            const match = await bcrypt.compare(password, entity.password)

            if(match){
                const payload = {
                    id: entity.id,
                    username: entity.username,
                    email: entity.email,
                    role: entity.role
                }

                jwt.sign(payload, secretKey, {
                    expiresIn: "10h"
                }, (err, token) => {
                    if(token){
                        return res.status(200).json({
                            status: true,
                            message: `Hi, ${entity.username} you are successfully loggedIn`,
                            data: {...entity, token:token}
                        })
                    }else{
                        return res.status(200).json({
                            status: true,
                            message: err?.message,
                            data: err
                        })
                    }
                })

            }else{

                return res.status(400).json({
                    status: false,
                    message: "invalid username or password",
                    data: null
                })

            }
        }
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({
                status: false,
                message: error.message,
                data: error
            })
        }else{
            return res.status(500).json({
                status: false,
                message: 'something went wrong',
                data: error
            })
        }
    }
}

async function profileHandle(req: any, res: Response) {
    
    const username = req.username

    try {
        if(!username) {
            throw new Error('bad request, username is required')
        }
        const entity = await getUserByUsername(username)
        return res.status(200).json({
            status: true,
            message: `Hi, ${entity.username} successfully found your information`,
            data: entity
        })
    } catch (error) {
        if(error instanceof Error){
            return res.status(400).json({
                status: true,
                message: error.message,
                data: error
            })
        }else{
            return res.status(500).json({
                status: true,
                message: 'something went wrong !!',
                data: error
            })
        }
    }
}

export { registerHandler, loginHandler, profileHandle }