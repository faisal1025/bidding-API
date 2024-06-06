import {Request, Response} from 'express'
import { createBidOfItem, getAllBidsOfItem } from '../repository/bidRepository'
import { getUserByUsername } from '../repository/userRepository'
import { io } from '..'
import { authenticate } from '../middlewares/auth'


async function getAllItemBids(req: Request, res : Response) {
    const itemId = Number(req.params.itemId)

    try {
        const bids = await getAllBidsOfItem(itemId)
        return res.status(200).json({
            status: true,
            message: 'All bids of item has fetched',
            data: bids
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

async function createItemBid(req: any, res : Response) {
    const itemId = Number(req.params.itemId)
    const username = req.username
    const {bidAmount} = req.body

    const biddingNamespace = io.of('/bidding');

    biddingNamespace.use(authenticate).on('connection', (socket: any) => {
        console.log(`User ${socket.user.username} connected to /bidding`);
    
        socket.on('disconnect', () => {
            console.log(`User ${socket.user.username} disconnected from /bidding`);
        });
    });

    try {
        const user = await getUserByUsername(username)
        const bids = await createBidOfItem(itemId, user.id, bidAmount)

        biddingNamespace.emit('notify', {data: bids, user: username})

        return res.status(200).json({
            status: true,
            message: 'Bid created successfully for the specified item',
            data: bids
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

export { getAllItemBids, createItemBid }