

import express, { Request, Response } from 'express';
import userRouters from './routers/userRoutes'
import http from 'http'
import itemRouters from './routers/itemRoutes'
import bidRouters from './routers/bidRoutes'
import notificationRouters from './routers/notificationRoutes'
import {Server} from 'socket.io'
import cors from 'cors'
import dotenv from 'dotenv'
import { authenticate } from './middlewares/auth';

dotenv.config()

const app = express()
const server = http.createServer(app)
const PORT = 8001
const baseUiUrl = process.env.NODE_ENV === 'production' ? process.env.baseUiUrlProd : process.env.baseUiUrlLocal

const io = new Server(server, {
    cors: {
        origin: baseUiUrl,
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
})

app.use(cors({
    origin: baseUiUrl,
    methods: ['POST', 'GET', 'DELETE', 'PUT'],
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/uploads", express.static(__dirname + '/uploads'))

export const biddingNamespace = io.of('/bidding');

biddingNamespace.on('connection', (socket: any) => {
    console.log(`User connected to /bidding`);

    socket.on('disconnect', () => {
        console.log(`User disconnected from /bidding`);
    });
});

app.get('/', (req: Request, res: Response) => {
    return res.status(200).json({
        'api/user/register': 'To register the user',
    })
})

app.use('/api/user', userRouters)
app.use('/api/item', itemRouters)
app.use('/api/bid', bidRouters)
app.use('/api/notification', notificationRouters)

server.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})

