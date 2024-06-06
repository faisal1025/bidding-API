import express from "express";
import multer from 'multer'
import { createItemHandler, 
    fetchSingleItemHandler, 
    updateSingleItemHandler, 
    deleteSingleItemHandler, 
    fetchAllItemsHandler, 
    fetchFilterItemsHandler} from "../controllers/itemControllers";
import { AllowOnlyAuthenticated } from "../middlewares/auth";

const router = express.Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})
const upload = multer({storage})

router.get('/', fetchAllItemsHandler)
router.get('/filter', fetchFilterItemsHandler)
router.get('/:id', fetchSingleItemHandler)
router.post('/create', AllowOnlyAuthenticated, upload.single('imageUrl'), createItemHandler)
router.put('/:id', AllowOnlyAuthenticated, upload.single('imageUrl'), updateSingleItemHandler)
router.delete('/:id', AllowOnlyAuthenticated, deleteSingleItemHandler)


export default router