//db module
const conn = require("../mariadb");
//http-status-codes module
const { StatusCodes } = require("http-status-codes");

const addLike = (req,res)=>{
  let sql = "INSERT INTO likes (user_id, liked_book_id) VALUES (?,?)";
  let {id} = req.params; //book_id
  let {user_id} = req.body;

  let values = [user_id, id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });

};

const removeLike = (req,res)=>{
  let sql = "DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?";
  let {id} = req.params; //book_id
  let {user_id} = req.body;

  let values = [user_id, id];

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
