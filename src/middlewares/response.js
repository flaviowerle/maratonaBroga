
const TYPE_JSON = 'application/json';
const STATUS_CODE_OK = 200;
const STATUS_CODE_BAD_REQUEST = 400;
const STATUS_CODE_UNAUTHORIZED = 401;
const STATUS_CODE_NOT_FOUND = 404;
const STATUS_CODE_SERVER_ERROR = 500;

const jsonOK = function(data, message, metadata){
  
  message = message ? message :'Succesful request.';
  metadata = metadata ? metadata: {};
  
  this.status(STATUS_CODE_OK);
  this.type(TYPE_JSON);
  return this.json({message, data, metadata, status:STATUS_CODE_OK});
};

const jsonBadRequest = function(data, message, metadata){
  
  message = message ? message :'Bad request.';
  metadata = metadata ? metadata: {};
  
  this.status(STATUS_CODE_BAD_REQUEST);
  this.type(TYPE_JSON);
  return this.json({message, data, metadata, status:STATUS_CODE_BAD_REQUEST});
};

const response = (req, res, next)=>{
  res.jsonOk = jsonOK;
  res.jasonBadRequest = jsonBadRequest;

    
    next();
};

module.exports = response;