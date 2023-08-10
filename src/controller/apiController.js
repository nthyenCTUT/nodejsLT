import pool from "../configs/connectDB.js";
import userService from '../services/userService.js'
let getAllUsers = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `users`')
    return res.status(200).json({
        message: 'ok',
        data: rows
    })

}
let createAPINewUser = async (req, res) => {
    let { firstname, lastname, email, address } = req.body
    if (!firstname || !lastname || !email | !address) {
        return res.status(200).json({
            message: 'lỗi, chưa đưa giá trị các biến'

        })
    }
    await pool.execute('insert into users values (?,?,?,?,?)',
        ['NULL', firstname, lastname, email, address])
    return res.status(200).json({
        message: 'tạo tài khoản thàn công'

    })
}
let updateUser = async (req, res) => {
    let { id, firstname, lastname, email, address } = req.body
    if (!firstname || !lastname || !email | !address || !id) {
        return res.status(200).json({
            message: 'lỗi, chưa đưa giá trị các biến'

        })
    }
    await pool.execute('update users set firstname=?, lastname=?,email=?,address=? where id=?'
        , [firstname, lastname, email, address, id])
    return res.status(200).json({
        message: 'update thành công'

    })

}
let handleLogin = async (req, res) => {
    let { username, password } = req.body
    if (!username || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'lỗi, chưa đưa giá trị các biến'

        })
    }


    let userData = await userService.handleUserLogin(username, password)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        role: userData.role,
        user: userData.user


    })

}

//export dưới dạng object để có thể export nhiều function
export default { getAllUsers, createAPINewUser, updateUser, handleLogin }