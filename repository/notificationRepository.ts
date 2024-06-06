import {Prisma, PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export async function markNotficationsOfUser(userId: number) {
    try {
        const notifications = prisma.notification.updateMany({
            where: {
                userId: userId
            },
            data: {
                isRead: true
            }
        })
        return notifications
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            throw new Error(error.message)
        }else if(error instanceof Error){
            throw new Error(error.message)
        }
    } finally {
        prisma.$disconnect()
    }
}

export async function getAllNotificationOfUser(username: string) {
    try {
        const user = await prisma.user.findFirstOrThrow({
            where: {
                username
            },
            select: {
                notifications: true
            }
        })

        return user
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            throw new Error(error.message)
        }else if(error instanceof Prisma.PrismaClientValidationError){
            throw new Error(error.message)
        }else if(error instanceof Error){
            throw new Error(error.message)
        }        
    } finally {
        await prisma.$disconnect()
    }
}