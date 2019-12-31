require('dotenv').config()

const mysql = require('mysql');
const {promisify} = require('util');//modulo que convierte callback en promesas


const pool = mysql.createPool(
    {host:process.env.DB_HOST, 
        user:process.env.DB_USER,
        password:process.env.DB_PASS,
        database:process.env.DB_DB
});

pool.getConnection((err, connection)=>{
    if(err){
        if(err.code ==='PROTOCOL_CONNECTION_LOST')
            console.log('DATABASE CONNECTIONS WAS CLOSED');
        if(err.code ==='ER_CON_COUNT_ERROR')
            console.log('DATABASE HAS TO MANY CONNECTIONS');
        if(err.code ==='ECONNREFUSED')     
            console.log("DATABASE CONNECTIONS WAS REFUSED");
    }
    if(connection) connection.release()
    console.log('DB is Connected');
    return;
    
});
//promisify poll Query convierte callback en promesas
pool.query=  promisify(pool.query).bind(pool)

export default pool