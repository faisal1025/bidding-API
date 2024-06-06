
import { PrismaClient, Prisma } from'@prisma/client'
import { query } from 'express';

const prisma = new PrismaClient()

export async function createItem(name: string, description: string, startingPrice: number, endTime: Date, ownerId: number, imageUrl?:string,) {
   
    try {
        const entity = await prisma.item.create({
            data: {
                name,
                description,
                startingPrice,
                imageUrl,
                ownerId,
                endTime
            }
        })

        return entity;

    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            throw new Error(error.message)
        }else if(error instanceof Error){
            throw new Error(error.message)
        }
    }
}

export async function getAllItems(page: number, itemPerPage: number) {
    const skip = (page-1)*itemPerPage
    try {
        const cnt = await prisma.item.count()
        const entities = await prisma.item.findMany({
            skip: skip,
            take: itemPerPage
        })
        return {
            entities: entities,
            pagination: {
                page,
                itemPerPage,
                totalNoItems: cnt,
                totalItemsInPage: entities.length
            }
        }
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            throw new Error(error.message)
        }else if(error instanceof Error){
            throw new Error(error.message)
        }else{
            throw new Error("something went wrong, Items not found")
        }
    }
}

export async function getItemById(id: number) {
    try {
        const entity = await prisma.item.findFirstOrThrow({where: {
            id: id
        }})
        
        return entity
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            throw new Error(error.message)
        }else if(error instanceof Error){
            throw new Error(error.message)
        } else{
            throw new Error('Entity not found, something went wrong')
        }     
    }
}

export async function updateItemById(id: number, ownerId: number, role: string, updatedData: {
    name?: string, description?: string, startingPrice?: number, imageUrl?: string, endTime?: Date
}) {
    
    try {
        const entity = await prisma.item.update({
            where: role === "ADMIN" ? {
                id: id
            } : {
                id,
                ownerId
            },
            data: updatedData
        })
        return entity
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            throw new Error('Entity not found, something went wrong')
        }else if(error instanceof Error){
            throw new Error(error.message)
        } else{
            throw new Error('Entity not found, something went wrong')
        }     
    }
}

export async function deleteItemById(id: number, ownerId: number, role: string) {
    
    try {
        const entity = await prisma.item.delete({
            where: role === "ADMIN"? {
                id
            } : {
                id,
                ownerId
            }
        })
        return entity
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            throw new Error(error.message)
        }else if(error instanceof Error){
            throw new Error(error.message)
        } else{
            throw new Error('Entity not found, something went wrong')
        }     
    }
}

export async function getFilterItems(name: string | undefined, lt: number | undefined
    , gt: number | undefined, price_high_to_low: boolean | undefined, price_low_to_high: boolean | undefined) {
       
        try {
            const items = await prisma.item.findMany({
                where: {
                    name: name ? { contains: name } : {},
                    currentPrice: lt && gt ? { lte: gt, gte: lt } :  {}
                },
                orderBy: price_high_to_low ? { currentPrice: 'desc' } : price_low_to_high ? { currentPrice: 'asc'} : {}
            })
            
            return items
        } catch (error) {
            if(error instanceof Error){
                throw new Error(error.message)
            }
        }
}

