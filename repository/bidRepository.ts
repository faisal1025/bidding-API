import {PrismaClient, Prisma} from '@prisma/client'

const prisma = new PrismaClient()

export async function getAllBidsOfItem(itemId: number){
    try {
        const entities =  await prisma.bid.findMany({
            where: {
                itemId: itemId
            },
        })
        return entities
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            throw new Error("bids not found")
        }else if(error instanceof Error){
            throw new Error(error.message)
        }
    } finally {
        await prisma.$disconnect()
    }
}

export async function createBidOfItem(itemId: number, userId: number, bidAmount: number){
    try {
        const entity = await prisma.bid.create({
            data: {
                itemId: itemId,
                userId: userId,
                bidAmount
            }
        })
        return entity

    } catch (error) {
        if(error instanceof Prisma.PrismaClientValidationError){
            throw new Error(error.message)
        }else if(error instanceof Prisma.PrismaClientKnownRequestError){
            throw new Error(error.message)
        }else if(error instanceof Error){
            throw new Error(error.message)
        }
    } finally {
        await prisma.$disconnect()
    }
}