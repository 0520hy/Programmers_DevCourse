//db module
const conn = require("../mariadb");
//http-status-codes module
const { StatusCodes, UNAUTHORIZED } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const ensureAuthorization = require("../auth"); // 인증 모듈


// 장바구니 담기 api
const addCartItem = (req, res) => {
  let authorization = ensureAuthorization(req, res);
  if(authorization instanceof jwt.TokenExpiredError){
    return res.status(StatusCodes.UNAUTHORIZED).json({
     "message": "로그인 세션이 만료되었습니다."
    });
  }else if(authorization instanceof jwt.JsonWebTokenError){
    return res.status(StatusCodes.BAD_REQUEST).json({
      "message": "잘못된 토큰입니다."
    });
  }else{

  let sql = "INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?, ?, ?);";
  let { book_id, quantity } = req.body;

  let values = [book_id, quantity, authorization.id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });
}
};



// 장바구니 조회 api,  선택한 장바구니 상품 목록 조회 api
const getCartItems = (req, res) => {
  let { selected } = req.body; // selected = [1, 3]
  let authorization = ensureAuthorization(req, res);
  if(authorization instanceof jwt.TokenExpiredError){
    return res.status(StatusCodes.UNAUTHORIZED).json({
     "message": "로그인 세션이 만료되었습니다."
    });
  }else if(authorization instanceof jwt.JsonWebTokenError){
    return res.status(StatusCodes.BAD_REQUEST).json({
      "message": "잘못된 토큰입니다."
    });
  }else{
    let sql = `SELECT cartItems.id, book_id, title, summary,quantity,price FROM cartItems LEFT JOIN books ON cartItems.book_id = books.id WHERE user_id = ?`;
    let values = [authorization.id];

    // selected 가 있으면 선택한 장바구니 목록 조회 쿼리문 추가
    if(selected){ // 선택한 장바구니 목록 조회
     sql += ` AND cartItems.id IN (?)`;
     values.push(selected);
    }


    conn.query(sql, values, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      return res.status(StatusCodes.OK).json(results);
    });
  }

};


// 장바구니 도서 삭제 api
const RemoveCartItem = (req, res) => {
  let authorization = ensureAuthorization(req, res);
  if(authorization instanceof jwt.TokenExpiredError){
    return res.status(StatusCodes.UNAUTHORIZED).json({
     "message": "로그인 세션이 만료되었습니다."
    });
  }else if(authorization instanceof jwt.JsonWebTokenError){
    return res.status(StatusCodes.BAD_REQUEST).json({
      "message": "잘못된 토큰입니다."
    });
  }else{

  let sql = "DELETE FROM cartItems WHERE id = ?";
  let cartItemId = req.params.id; 

  conn.query(sql, cartItemId, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });}
};



module.exports = {
  addCartItem,
  getCartItems,
  RemoveCartItem,
};
