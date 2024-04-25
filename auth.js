const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config()


const  ensureAuthorization = (req, res)=> {
  try{
    let recievedJwt = req.headers["authorization"];

    if(recievedJwt){
     let decodedJwt = jwt.verify(recievedJwt, process.env.PRIVATE_KEY);
     console.log(decodedJwt);
     return decodedJwt;
    }else{
      throw new ReferenceError("jwt must be provided");
    }

  }catch(err){
    console.log(err);

    return err;
  }
}

module.exports = ensureAuthorization