import { Response } from "express";
import { markNotficationsOfUser, getAllNotificationOfUser } from "../repository/notificationRepository";
import { getUserByUsername } from "../repository/userRepository";


async function getMyAllNotificationHandler(req: any, res: Response) {
    const username = req.username
    try {
        const notifications = await getAllNotificationOfUser(username)
        return res.status(200).json({
            status: true,
            message: `Hi, ${username} we retrived all your notifications`,
            data: notifications
        })
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).json({
                status: false,
                message: error.message,
                data: error
            })
        }
    }
}

async function markMyAllNotificationHandler(req: any, res: Response) {
    const username = req.username;
    
    try {
        const user = await getUserByUsername(username)
        const result = await markNotficationsOfUser(user.id)
        return res.status(200).json({
            status: true,
            message: 'notifictions are successfully marked as true',
            data: result
        })
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({
                status: false,
                message: error.message,
                data: error
            })
        }
    }
}


export {getMyAllNotificationHandler, markMyAllNotificationHandler} 