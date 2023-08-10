// import connection from "../configs/connectDB.js";
import pool from "../configs/connectDB.js";
import multer from "multer";
import path from 'path'

let getHomePage = async (req, res) => {
    //viết logic lấy dữ liệu xong mới render ra view theo mô hình MVC

    //console.log("eh")
    // connection.query(
    // 'SELECT * FROM `users`',
    // function (err, results, fields) {
    //     // results contains rows returned by server
    //     // console.log(fields); // fields contains extra meta data about results, if available
    //     //  results: arrays of object
    //     //  console.log("du liue:", data)
    //     // data = JSON.stringify(results)
    //     //data = results.map((row) => { [row.id, row.firstname] })

    //     //res.render(view [, locals] [, callback]), locals: object
    //     //var arr = [{ key: "11", value: "1100" }, { key: "22", value: "2200" }];
    //     //chuyển array of object về array of array
    //     //let data = results.map((row) => { return { id: row.id, firstname: row.firstname } })
    //     //console.log("type of" + typeof data)
    //     // console.log(data);
    //     //data = JSON.stringify(results)
    //     // console.log(typeof results)
    //     // console.log(typeof data)
    //     // return res.render("index.ejs", { data: results, test: "abc string" })
    // }
    // // query database

    // )
    //destructuring
    const [rows, fields] = await pool.execute('SELECT * FROM `users`')
    return res.render("index.ejs", { data: rows })

}
let getDetailUser = async (req, res) => {
    //
    //lấy giá trị biến truyền trên url console.log(req.params)
    let id = req.params.id
    let user = await pool.execute('select * from users where id=?', [id])
    console.log(user)
    return res.send(JSON.stringify(user[0]))
}
let getAbout = (req, res) => {
    return res.render("about.ejs")
}
let createNewUser = async (req, res) => {
    //console.log(req.body)
    //lưu vào database
    let { firstname, lastname, email, address } = req.body
    //console.log(firstname)
    //let newuser = await pool.execute('insert into users values (?,?,?,?', [null, req.body.firstname, req.body.lastname, req.body.email, req.body.address])
    await pool.execute('insert into users values (?,?,?,?,?)',
        ['NULL', firstname, lastname, email, address])
    //không return, xem lại tài liệu 
    res.redirect('/')
    //return res.send("xong")
}
let deleteUser = async (req, res) => {
    let { id } = req.body
    await pool.execute('delete from users where id=?',
        [id])
    res.redirect('/')
}
let editUser = async (req, res) => {
    let id = req.params.id
    const [user] = await pool.execute('select * from users where id=?', [id])
    return res.render("updateUser.ejs", { data: user })
    // return res.send("edit user")
}
let updateUser = async (req, res) => {
    let { id, firstname, lastname, email, address } = req.body
    await pool.execute('update users set firstname=?, lastname=?,email=?,address=? where id=?'
        , [firstname, lastname, email, address, id])
    res.redirect('/')
    // return res.send("edit user")
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/tmp/my-uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({ storage: storage })
let upLoadFile = async (req, res) => {
    // let { id, firstname, lastname, email, address } = req.body
    // await pool.execute('update users set firstname=?, lastname=?,email=?,address=? where id=?'
    //     , [firstname, lastname, email, address, id])
    // res.redirect('/')

    return res.render("upload.ejs")
}
let upLoadFileToSave = async (req, res) => {

    return res.send("Lưu file xong")
}

//export dưới dạng object để có thể export nhiều function
export default { getHomePage, getAbout, getDetailUser, createNewUser, deleteUser, editUser, updateUser, upLoadFile, upLoadFileToSave }