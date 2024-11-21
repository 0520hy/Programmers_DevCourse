
const mariadb = require("mysql2/promise");
//http-status-codes module
const {StatusCodes} = require("http-status-codes");
const jwt = require("jsonwebtoken");
const ensureAuthorization = require("../auth"); // 인증 모듈

// 주문하기
const order = async (req, res) => {
  
  const conn = await mariadb.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'BookStore',
    dateStrings: true
  });
  
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

  const {
    items,
    delivery,
    totalQuantity,
    totalPrice,
    userId,
    firstBookTitle
  } = req.body;

  // delivery 테이블 삽입
  let sql = "INSERT INTO delivery ( address, receiver,contact ) VALUES (?, ?, ?);";

  let values = [delivery.address, delivery.receiver, delivery.contact];

  let [results] = await conn.execute(sql, values);
  let delivery_id = results.insertId;

  //orders 테이블 삽입
  sql = `INSERT INTO orders ( book_title, total_quantity, total_price, user_id, delivery_id ) VALUES (?, ?, ?, ?, ?)`;
  values = [firstBookTitle, totalQuantity, totalPrice, authorization.id, delivery_id];

  [results] = await conn.execute(sql, values);
  let order_id = results.insertId;

  // items로 장바구니 정보 조회
  sql = `SELECT book_id, quantity FROM cartItems WHERE id IN (?)`
  let [orderItems, fields] = await conn.query(sql, [items])

  //orderdBook 테이블 삽입
  sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;

  values = [];

  orderItems.forEach((item) => values.push([order_id, item.book_id, item.quantity]));

  results = await conn.query(sql, [values]);

  let result = await deleteCartItems(conn, items)

  return res.status(StatusCodes.OK).json(result);
};}

const deleteCartItems = async (conn, items) => {
  let sql = `DELETE FROM cartItems WHERE id IN (?)`;

  let result = await conn.query(sql, [items]);
  return result;
}

// 주문 목록 조회
const getOrders = async (req, res) => {
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
  const conn = await mariadb.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'BookStore',
    dateStrings: true
  });
  let sql = `SELECT orders.id, book_title, total_quantity, total_price, created_at, address, receiver, contact 
            FROM orders LEFT JOIN delivery 
            ON orders.delivery_id = delivery.id;`

  let [rows, fields] = await conn.query(sql);
  return res.status(StatusCodes.OK).json(rows);
};}

// 주문 상세 상품 조회
const getOrderDetail = async (req, res) => {
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
  const order_id = req.params.id;

  const conn = await mariadb.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'BookStore',
    dateStrings: true
  });

  let sql = `SELECT book_id, title, author, price, quantity
FROM orderedBook LEFT JOIN books 
ON orderedBook.book_id = books.id
WHERE order_id = ?;`

  let [rows, fields] = await conn.query(sql, [order_id]);
  return res.status(StatusCodes.OK).json(rows);
};}

module.exports = {
  order,
  getOrders,
  getOrderDetail,
};