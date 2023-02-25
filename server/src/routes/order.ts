import express from 'express'
import path from 'path'
import multer from 'multer'
import { getAllOrders, createNewGroup } from '../controllers/order'
const router = express.Router()

export const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
      console.log(file)
    }
  })

})


router.route('/').get(getAllOrders).post(upload.single('pic'), createNewGroup)

export default router