import express from 'express'
import homeController from "./../controller/homeController.js"
let router = express.Router()
const initWebRoute = (app) => {
    //getHomePage viết không dấu () để nhận được tất cả các tham số từ express
    router.get('/', homeController.getHomePage)
    //:id biến này thay đổi, id người dùng có thể là 1, 2, 3
    //detail/user/:id/:name
    router.get('/detail/user/:id', homeController.getDetailUser)
    router.post('/create-new-user', homeController.createNewUser)
    router.post('/delete-user', homeController.deleteUser)
    router.get('/edit-user/:id', homeController.editUser)
    router.post('/update-user', homeController.updateUser)
    router.get('/about', homeController.getAbout)
    router.get('/upload', homeController.upLoadFile)
    router.post('/upload-file', homeController.upLoadFileToSave)
    return app.use("/", router)
    //return app.use("/abc",route) -> thêm tiền tố trước mỗi route
    // pải rõ localhost:3000/abc,localhost:3000/abc/about

}
export default initWebRoute