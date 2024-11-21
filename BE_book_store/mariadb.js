// mysql 모듈
const mariadb = require('mysql2');

//DB와 연결통로 생성
const connection  = mariadb.createConnection({
      host: 'localhost',
      user : 'root',
      password : 'root',
      database : 'BookStore',
      dateStrings : true
});
  

module.exports = connection;