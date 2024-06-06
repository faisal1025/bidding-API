import  express from 'express'
import {registerHandler, loginHandler, profileHandle} from '../controllers/userControllers' 
import { AllowOnlyAuthenticated } from '../middlewares/auth'

const router = express.Router()

router.post('/register', registerHandler)
router.post('/login', loginHandler)
router.get('/profile', AllowOnlyAuthenticated, profileHandle)


export default router