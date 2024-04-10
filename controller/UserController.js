//db module
const conn = require('../mariadb');
//http-status-codes module
const {StatusCodes} =require('http-status-codes');

const join =  (req,res)=>{
  const {email, password} = req.body;
  let sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
  let values = [email, password];

  conn.query(sql, values, 
    (err, results)=>{
    if(err){
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end(); 
    }
    return res.status(StatusCodes.CREATED).json(results);
  })
 
}

module.exports = join;