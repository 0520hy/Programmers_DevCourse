//db module
const conn = require("../mariadb");
//http-status-codes module
const { StatusCodes } = require("http-status-codes");
//jwt module
const jwt = require("jsonwebtoken");
//env module
const dotenv = require("dotenv");

// 회원가입
const join = (req, res) => {
  const { email, password } = req.body;
  let sql = "INSERT INTO users (email, password) VALUES (?, ?)";
  let values = [email, password];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.CREATED).json(results);
  });
};

// 로그인
const login = (req, res) => {
  const { email, password } = req.body;

  let sql = "SELECT * FROM users WHERE email = ?";
  conn.query(sql, email, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    const loginUser = results[0];
    if (loginUser && loginUser.password == password) {
      //jwt token
      const token = jwt.sign(
        {
          email: loginUser.email,
        },
        process.env.PRIVATE_KEY,
        {
          expiresIn: "5m",
          issuer: "hy",
        }
      );
      // 쿠키에 토큰 담기
      res.cookie("token", token, {
        httpOnly: true,
      });

      console.log(token);

      return res.status(StatusCodes.OK).json(results);
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).json().end();
    }
  });
};

// 비밀번호 초기화 요청
const pwdResetReq = (req, res) => {
  const { email } = req.body;

  let sql = "SELECT * FROM users WHERE email = ?";
  conn.query(sql, email, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    const user = results[0];
    if (user) {
      return res.status(StatusCodes.OK).json({
        email : email
      });
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).end();
    }
  });
};

// 비밀번호 초기화
const pwdReset = (req, res) => {
  const {email, password} = req.body;
  let sql = 'UPDATE users SET password = ? WHERE email = ?'
  let values = [password, email]
  conn.query(sql, values,
      (err, results)=>{
        if (err) {
          console.log(err);
          return res.status(StatusCodes.BAD_REQUEST).end();
        }
        if (results.affectedRows == 0)
          return res.status(StatusCodes.BAD_REQUEST).end();
        else 
          return res.status(StatusCodes.OK).json(results);
      })

};

module.exports = {
  join,
  login,
  pwdResetReq,
  pwdReset,
};
