//db module
const conn = require("../mariadb");
//http-status-codes module
const { StatusCodes } = require("http-status-codes");
const ensureAuthorization = require("../auth"); 
// jwt
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config()

// 좋아요 추가
const addLike = (req,res)=>{
 
  let book_id = req.params.id;
  
  let authorization = ensureAuthorization(req);

  let sql = "INSERT INTO likes (user_id, liked_book_id) VALUES (?,?)";
  let values = [authorization.id, book_id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });

};

// 좋아요 취소
const removeLike = (req,res)=>{


  let sql = "DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?";
  let book_id = req.params.id; 

  let authorization = ensureAuthorization(req);

  let values = [authorization.id, book_id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });

};


module.exports = {
  addLike,
  removeLike
}
