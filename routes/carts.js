const express = require('express');
const router = express.Router();

const {
  addCartItem,
  getCartItems,
  RemoveCartItem,
  getOrderCartItems
} = require('../controller/CartController')

router.use(express.json());

// 장바구니 담기
router.post('/', addCartItem)

// 장바구니 조회
router.get('/', getCartItems)

// 장바구니 도서 삭제
router.delete('/:id', RemoveCartItem)

// 장바구니 주문 예상 목록 조회
router.get('/', getOrderCartItems)


module.exports = router 