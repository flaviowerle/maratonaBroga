require('dotenv').config();

const jwt = require('jsonwebtoken');

const tokenPrivateKey = process.env.JWT_TOKEN_PRIVATE_KEY;
const refreshtokenPrivateKey = process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY;

const options = { expiresIn: '30 minutes'};
const refreshoptions = { expiresIn: '30 days'};

const generateJwt = (payload)=>{
return jwt.sign(payload, tokenPrivateKey, options);
}; 

const generateRefreshJwt = (payload)=>{
    return jwt.sign(payload, refreshtokenPrivateKey, refreshoptions);
    };

const verifyJwt =(token)=>{
    return jwt.verify(token, tokenPrivateKey);
};

const verifyRefreshJwt =(token)=>{
    return jwt.verify(token, refreshtokenPrivateKey);
};

module.exports={generateJwt, verifyJwt, generateRefreshJwt, verifyRefreshJwt};