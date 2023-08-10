import configViewEngine from "./configs/viewEngine.js"//phải có đuôi .js, biến onfigViewEngine không được dùng {}
//const express = require("express")
import initWebRoute from "./route/web.js"
import initAPIRoute from "./route/api.js"
import connection from "./configs/connectDB.js"
import express from "express" // đã sử dụng import là dùng import hết, không dùng require
import bodyParser from "body-parser"
import morgan from "morgan";
import cors from 'cors'
const app = express()
app.use(cors())

//require('dotenv').config()-> ES5
import dotenv from "dotenv"
dotenv.config()
const port = process.env.PORT || 8080 //phương án 8080 là dự phòng nếu port không lấy được
app.use(morgan('combined'))
app.use((req, res, next) => {
    //check không hợp lệ thì sẽ làm gì
    console.log(req)
    //đi tiếp nếu hợp lệ 
    next()
})
//cấu hình hỗ trợ gửi dữ liệu từ client lên server - dùng trong form submit (2 dòng)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

configViewEngine(app)
//bên trong các router đều có lệnh return nên khi chạy được vào router thì thực thi xong đã thực hiện return nên không chạy middle bên dưới được.
initWebRoute(app)
initAPIRoute(app)
//xây dựng middleware tầng app trả lỗi không tìm thấy file
//code chạy từ trên xuống dưới nên phải đặt middleware ở đây để khi tìm router có thì chạy theo router, không có thì mới chạy tới đây
app.use((req, res) => {
    res.send("Lỗi 404")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})