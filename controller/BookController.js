//db module
const conn = require("../mariadb");
//http-status-codes module
const { StatusCodes } = require("http-status-codes");


//도서 전체 조회
const getAllBooks = (req,res)=>{

  let sql = "SELECT * FROM books";

  conn.query(sql, (err, results)=>{
    if(err){
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  })
 
}

//도서 개별 조회
const getBooks = (req,res)=>{
  
  let {id} = req.params;
  
  let sql = "SELECT * FROM books WHERE id = ?";
 
  conn.query(sql, id, (err, results)=>{
    if(err){
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    if(results[0])
     return res.status(StatusCodes.OK).json(results[0]);
    else
      return res.status(StatusCodes.NOT_FOUND).end();
  });
 
}

//카테고리별 도서 목록 조회
const  booksByCategory =(req,res)=>{
  res.json('카테고리별 도서 목록 조회');
}

module.exports = {
  getAllBooks,
  getBooks,
  booksByCategory
} 