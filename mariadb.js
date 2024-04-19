// mysql 모듈
const mariadb = require('mysql2/promise');

//DB와 연결통로 생성
const connection = async()=> {
   const conn = await mariadb.createConnection({
      host: 'localhost',
      user : 'root',
      password : 'root',
      database : 'BookStore',
      dateStrings : true
});
  return conn;  
}

module.exports = connection;