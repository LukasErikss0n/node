const mysql = require('mysql2/promise');

async function connection(){
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "chatbot"
    });
}

async function answers(input){
    const con = await connection()
    const result = await con.execute("SELECT * FROM response WHERE input = ?", [input])

    await con.end()
    return result[0]
}

module.exports = {
    answers,
}