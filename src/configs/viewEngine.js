import express from "express"
const configViewEngine = (app) => {
    app.use(express.static('./src/public'))//cho phép truy cập vào public
    //app.use(express.static(__dirname+"/public"))
    app.set("view engine", "ejs")
    app.set("views", "./src/views")

}
//dùng default thì import không được phép dùng dấu {}
export default configViewEngine