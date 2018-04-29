const jwt = require('jsonwebtoken');

const tokenSecret= 'patient-nurse-base';

function createToken(val){
           // generate a signed son web token with the contents of user object and return it in the response
      return jwt.sign(val, tokenSecret);

}

function verifyToken(token){
    return jwt.verify(token,tokenSecret);
}

module.exports={createToken:createToken, verifyToken:verifyToken};