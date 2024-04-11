const express = require('express');
const router = express.Router();

const {
  getAllBooks,
  getBooks,
  booksByCategory,
} = require('../controller/BookController')

router.use(express.json());

// 도서 전체 조회
router.get('/', getAllBooks)

// 도서 개별 조회
router.get('/:id', getBooks)

// 카테고리별 도서 목록 조회
router.get('/books', booksByCategory)


module.exports = router 