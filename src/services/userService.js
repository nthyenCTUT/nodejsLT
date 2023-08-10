import pool from "../configs/connectDB.js";
let handleUserLogin = async (user, password) => {

    let userData = {}
    let isUserExist = await checkUserExist(user)

    if (isUserExist) {
        userData.errCode = 1
        userData.errMessage = `Username is exist, password wrong`
        let users = await compareUserPassword(user, password)
        if (users.length == 1) {
            userData.errCode = 2
            userData.errMessage = `Username is exists`
            userData.role = users[0].role
            userData.user = users[0].username

        }

    }
    else {
        userData.errCode = 0
        userData.errMessage = `Username isn't exist`

    }

    return userData

}
let checkUserExist = async (user) => {
    let [rows, fields] = await pool.execute('select * from adminusers where username=?', [user])

    if (rows.length > 0) {

        return true
    }
    return false

}
let compareUserPassword = async (user, pass) => {
    let [rows, fields] = await pool.execute('select username, role from adminusers where username=? and password=?', [user, pass])
    console.log(rows)
    return rows

}
let getAllUsersOrSingle = async (userId) => {
    let sql = ''
    let [rows, fields] = []
    if (userId == 'ALL')
        [rows, fields] = await pool.execute('SELECT id,username,role FROM `adminusers`')
    else if (userId && userId != 'ALL')
        [rows, fields] = await pool.execute('SELECT id,username,role FROM `adminusers` where id=?', [userId])

    return rows

}
export default { handleUserLogin, getAllUsersOrSingle }