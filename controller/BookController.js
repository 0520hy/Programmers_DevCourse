//db module
const conn = require("../mariadb");
//http-status-codes module
const { StatusCodes } = require("http-status-codes");

//도서 전체 조회 (카테고리별, 신간 여부)
const getAllBooks = (req, res) => {

  let { category_id, news, limit, currentPage} = req.query;
  // limit : page당 도서 수
  // currentPage : 현재 페이지 
  // offset : limit * (currentPage - 1)
  
  let sql = "SELECT * FROM books";
  let offset = limit * (currentPage - 1);
  let values = [];
  
  if (category_id&&news){
    sql += " WHERE category_id = ? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 6 MONTH) AND NOW()";
    values = [category_id];
  } else if (category_id) {
    sql += " WHERE category_id = ?";
    values = [category_id];
  } else if (news) {
    sql += " WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 6 MONTH) AND NOW()";
  }
 
   sql += " LIMIT ? OFFSET ?"
   values.push(parseInt(limit), offset)
    conn.query(sql, values, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      if (results.length) return res.status(StatusCodes.OK).json(results);
      else return res.status(StatusCodes.NOT_FOUND).end();
    });
};


//도서 개별 조회
const getBooks = (req, res) => {
  let { id } = req.params;

  let sql = `SELECT * FROM BookStore.books left
             JOIN category ON books.category_id = category.id WHERE books.id = ?`;

  conn.query(sql, id, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    if (results[0]) return res.status(StatusCodes.OK).json(results[0]);
    else return res.status(StatusCodes.NOT_FOUND).end();
  });
};


module.exports = {
  getAllBooks,
  getBooks
};


