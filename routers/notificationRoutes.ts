import express from 'express'
import { AllowOnlyAuthenticated } from '../middlewares/auth'
import { getMyAllNotificationHandler, markMyAllNotificationHandler } from '../controllers/notificationControllers'


const router = express.Router()


router.get('/', AllowOnlyAuthenticated, getMyAllNotificationHandler)
router.put('/mark-read', AllowOnlyAuthenticated, markMyAllNotificationHandler)

export default router