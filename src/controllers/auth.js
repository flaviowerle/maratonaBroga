const express = require('express');
const bcrypt = require('bcrypt');
const { Account }  = require('../models');
const {accountSignUp, accountSignIn} = require('../validators/account');
const { getMessage } = require('../helpers/validator');
const {generateJwt, generateRefreshJwt} = require('../helpers/jwt');
const account = require('../validators/account');

const router = express.Router();

const saltRounds =10;

router.post('/sign-in',accountSignIn, async (req, res)=>{
    const {email, password }= req.body;
    const account = await Account.findOne({where:{ email }});

    const match = account ? bcrypt.compareSync(password, account.password) : null;
   if (!match) return res.jsonBadRequest(null, getMessage('account.signin.invalid'));

   const token = generateJwt({id: account.id});
   const refreshtoken = generateRefreshJwt({id: account.id});

    return res.jsonOk(account, getMessage('account.signin.sucess'), {token, refreshtoken});
});        

router.post('/sign-up',accountSignUp ,async (req, res)=>{
    const {email, password} = req.body;
    

   const account = await Account.findOne({where:{ email }});
   if (!account) return res.jsonBadRequest(null, getMessage('account.signup.email_exists'));
    
   const hash = bcrypt.hashSync(password, saltRounds);
   const newAccount = await Account.create({email, password: hash });
    
    const token = generateJwt({id: newAccount.id});
    const refreshtoken = generateRefreshJwt({id: newAccount.id});

    return res.jsonOk(newAccount, getMessage('account.signup.sucess'),{token, refreshtoken});
});

module.exports = router;
