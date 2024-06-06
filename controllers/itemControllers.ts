import { Request, Response } from "express";
import { createItem, deleteItemById, getAllItems, getFilterItems, getItemById, updateItemById } from "../repository/itemRepository";

async function createItemHandler(req: any, res: Response) {
    const ownerId = req.userId;
    const {name, description, startingPrice, endTime} = req.body
    const imageUrl = req.file?.path
    try {
        if(!ownerId || (!name) || (!description) || (!startingPrice) || (!endTime)){
            throw new Error('bad request, invalid data')
        }
        const entity = await createItem(name, description, startingPrice, endTime, ownerId, imageUrl)
        return res.status(201).json({
            message: 'Item created successfully',
            status: true,
            data: entity
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

async function fetchSingleItemHandler(req: Request, res: Response) {
    const id = Number(req.params.id);

    try {
        const entity = await getItemById(id)
        
        return res.status(200).json({
            status: true,
            message: 'item is fetched correctly',
            data: entity
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

async function deleteSingleItemHandler(req: any, res: Response) {
    const id = Number(req.params.id)
    const role = req.userRole
    const ownerId = req.userId
    try {
        
        if(!ownerId || (!id) || (!role)){
            throw new Error('bad request, invalid data')
        }
        const entity = await deleteItemById(id, ownerId, role)
        return res.status(200).json({
            status: true,
            message: 'Item is removed successfully',
            data: entity
        })
        
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({
                status: false,
                messaage: error.message,
                data: error
            })
        }
    }
}

async function updateSingleItemHandler(req: any, res: Response) {
    const id = Number(req.params.id)
    const role = req.userRole
    const ownerId = req.userId
    let updatedData = req.body
    const imageUrl = req.file?.path
    updatedData = {...updatedData, imageUrl}
    try {
        if(!ownerId || (!id) || (!role)){
            
            throw new Error('bad request, invalid data')
        }
        const entity = await updateItemById(id, ownerId, role, updatedData)
        return res.status(201).json({
            status: true,
            message: 'item is successfully updated',
            data: entity
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

async function fetchAllItemsHandler(req: Request, res: Response) {
    const page = Number(req.query.page) || 1
    const itemPerPage = 8

    try {
        const result = await getAllItems(page, itemPerPage)
        return res.status(200).json({
            status: true,
            message: "All items for auctions",
            data: result
        })
        
    } catch (error) {
        if (error instanceof Error){
            return res.status(500).json({
                status: true,
                message: error.message,
                data: error
            })
        }
    }
}

async function fetchFilterItemsHandler(req: Request, res: Response) {
    const {name, lt, gt, price_low_to_high, price_high_to_low} = req.query
    
    try {
        const entities = await getFilterItems(name as any as string, lt as any as number, gt as any as number, price_high_to_low as any as boolean, price_low_to_high as any as boolean)
        
        return res.status(200).json({
            status: true,
            message: "All items filtered item fetched",
            data: entities
        })
    } catch (error) {
        
    }
}


export {createItemHandler, fetchFilterItemsHandler, fetchSingleItemHandler, deleteSingleItemHandler, updateSingleItemHandler, fetchAllItemsHandler}