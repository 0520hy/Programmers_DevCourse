const express = require('express');
const router = express.Router();

const {
  addCartItem,
  getCartItems,
  RemoveCartItem,
} = require('../controller/CartController')

router.use(express.json());

// 장바구니 담기
router.post('/', addCartItem)

// 장바구니 조회, 선택한 장바구니 상품 목록 조회 api
router.get('/', getCartItems)

// 장바구니 도서 삭제
router.delete('/:id', RemoveCartItem)




module.exports = router 