//db module
const conn = require("../mariadb");
//http-status-codes module
const { StatusCodes } = require("http-status-codes");

// 장바구니 담기 api
const addCartItem = (req,res)=>{
  let sql = "INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?, ?, ?);";
  let {book_id, quantity, user_id} = req.body;

  let values = [book_id, quantity, user_id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });
}

// 장바구니 조회 api
const getCartItems = (req,res)=>{
  res.json('장바구니 조회');
}

// 장바구니 도서 삭제 api
const RemoveCartItem = (req,res)=>{
  res.json('장바구니 도서 삭제');
}

// 장바구니 주문 예상 목록 조회 api
const getOrderCartItems = (req,res)=>{
  res.json('장바구니 주문 예상 목록 조회');
}

module.exports = {
  addCartItem,
  getCartItems,
  RemoveCartItem,
  getOrderCartItems
}