const express = require('express');
const router = express.Router();

const {
  allCategory
} = require('../controller/CategoryController')

router.use(express.json());

// (카테고리별) 도서 전체 조회
router.get('/', allCategory)




module.exports = router 
