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
      return res.Status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  })
 
}

//도서 개별 조회
const getBooks = (req,res)=>{
  res.json('도서 개별 조회');
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