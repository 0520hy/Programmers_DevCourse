const express = require('express');
const router = express.Router();

const {
  getAllBooks,
  getBooks
} = require('../controller/BookController')

router.use(express.json());

// (카테고리별) 도서 전체 조회
router.get('/', getAllBooks)

// 도서 개별 조회
router.get('/:id', getBooks)


module.exports = router 