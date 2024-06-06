import {Response, Request,  NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import {Socket} from 'socket.io'

const secretKey = process.env.secretKey || "fkjsdfhsdkfhsjkghfkgjkfsdgkjfdfdsjgjfsdkgjfdkhgjfdkghjkfdkgjawoie3q2o9roewifsd"

export function AllowOnlyAuthenticated(req: any, res: Response, next: NextFunction) {
    const token = req.headers.authorization
    
    if(token === undefined) {
        return res.status(403).json({
            status: false,
            message: 'user is not authorized, must be loggedIn',
            data: null
        })
    }

    
    jwt.verify(token.slice(7), secretKey, (err: jwt.VerifyErrors | null, decoded: any) => {
        if(err){
            return res.status(401).json({
                status: false,
                message: err.message,
                data: err
            })
        }
        
        if(decoded !== undefined){
            req.userId = decoded.id
            req.username = decoded.username
            req.userRole = decoded.role
            next()
        }
    })
}


export const authenticate = (socket: any, next: any) => {
    const token = socket.handshake.query.token as any as string;
    if (!token) {
        return next(new Error('Authentication error'));
    }

    jwt.verify(token, secretKey, (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err) {
            return next(new Error('Authentication error'));
        }
        socket.user = decoded;
        next();
    });
};
