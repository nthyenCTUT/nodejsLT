import express from 'express'
import apiController from '../controller/apiController.js'
let router = express.Router()
const initAPIRoute = (app) => {
    //getHomePage viết không dấu () để nhận được tất cả các tham số từ express
    router.get('/getAllUsers', apiController.getAllUsers)
    router.post('/createAPINewUser', apiController.createAPINewUser)
    router.put('/updateUser', apiController.updateUser) //định  nghĩa method put cho đúng chuẩn API
    router.post('/login', apiController.handleLogin)
    //tiền tố khi gọi API
    return app.use("/api/v1", router)


}
export default initAPIRoute