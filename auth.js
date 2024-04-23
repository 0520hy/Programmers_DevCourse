const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config()


const  ensureAuthorization = (req, res)=> {
  try{
    let recievedJwt = req.headers["authorization"];
    let decodedJwt = jwt.verify(recievedJwt, process.env.PRIVATE_KEY);
  
     console.log(decodedJwt);

     return decodedJwt;
  }catch(err){
    console.log(err);

    return err;
  }
}

module.exports = ensureAuthorization