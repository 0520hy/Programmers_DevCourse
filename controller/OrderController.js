//db module
const conn = require("../mariadb");
//http-status-codes module
const { StatusCodes } = require("http-status-codes");


// 주문하기
const order = (req,res)=>{
  const { items, delivery, totalQuantity, totalPrice, userId, firstBookTitle } = req.body;
  let delivery_id = 3;
  let order_id = 2;

  let sql =
  "INSERT INTO delivery ( address, receiver,contact ) VALUES (?, ?, ?);";

let values = [delivery.address, delivery.receiver, delivery.contact];

// conn.query(sql, values, (err, results) => {
//   if (err) {
//     console.log(err);
//     return res.status(StatusCodes.BAD_REQUEST).end();
//   }
//   delivery_id = 3 //results.insertId;

//   return res.status(StatusCodes.OK).json(results);
// });
sql = `INSERT INTO orders ( book_title, total_quantity, total_price, user_id, delivery_id ) VALUES (?, ?, ?, ?, ?)`;
values =[firstBookTitle, totalQuantity, totalPrice, userId, delivery_id];

// conn.query(sql, values, (err, results) => {
//   if (err) {
//     console.log(err);
//     return res.status(StatusCodes.BAD_REQUEST).end();
//   }
//   order_id = results.insertId //results.insertId;

//   return res.status(StatusCodes.OK).json(results);
// });
sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;
values = []
items.forEach((item)=>
values.push([order_id, item.book_id, item.quantity])
)
conn.query(sql, [values], (err, results) => {
  if (err) {
    console.log(err);
    return res.status(StatusCodes.BAD_REQUEST).end();
  }


  return res.status(StatusCodes.OK).json(results);
});

}

// 주문 목록 조회
const getOrders =(req,res)=>{
  res.json('주문 목록 조회');
}

// 주문 상세 상품 조회
const getOrderDetail = (req,res)=>{
  res.json('주문 상세 상품 조회');
}

module.exports = {
  order,
  getOrders,
  getOrderDetail
}