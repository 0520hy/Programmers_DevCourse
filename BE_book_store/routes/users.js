//express module
const express = require('express');
const router = express.Router();
//db module
const conn = require('../mariadb');

const {
  join,
  login, 
  pwdResetReq,  
  pwdReset
} = require('../controller/UserController')

router.use(express.json());

// 회원가입
router.post('/join', join)

// 로그인
router.post('/login', login)

// 비밀번호 초기화 요청
router.post('/reset', pwdResetReq)

// 비밀번호 초기화
router.put('/reset', pwdReset)

module.exports = router 