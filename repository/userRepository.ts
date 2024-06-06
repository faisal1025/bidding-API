import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export async function createUser(email: string, username: string, hashPassword: string) {

    try {
        const entity = await prisma.user.create({
           data: {
            username,
            email,
            password: hashPassword,
           }
        })

        return entity;

    } catch (error) {
        if(error instanceof Error)
            throw new Error(error.message)
        else
            throw new Error('something went wrong, please try again')
    }
}

export async function getUserByUsername(username: string) {
    try {
        const entity = prisma.user.findFirstOrThrow({
            where: {username: username}
        })

        return entity
    } catch (error) {
        if(error instanceof Prisma.PrismaClientInitializationError){
            throw new Error(error.message)
        }else if(error instanceof Prisma.PrismaClientUnknownRequestError){
            throw new Error(error.message)
        }else if(error instanceof Prisma.PrismaClientKnownRequestError){
            throw new Error(error.message)
        }else{
            throw new Error('user not found') 
        }
    }
}

