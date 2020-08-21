const awsAuthService = require('../Services/AwsAuthService');

exports.register = function(req, res){
    let register = awsAuthService.Register(req.body, function(err, result){
    if(err)
        res.send(err);
    res.send(result);
  })
};

exports.confirm_user = function(req,res){
    let confirmUser = awsAuthService.ConfirmUser(req.body, function(err,result){
        if(err)
            res.send(err);
        res.send(result);
    })
}

exports.login = function(req, res){
    let login = awsAuthService.Login(req.body, function(err, result){
        if(err)
           res.send(err)
        res.send(result);
    })
 }

 exports.validate_token = function(req, res){
    let validate = awsAuthService.ValidateToken(req.body.token,function(err, result){
        if(err)
            res.send(err.message);
        res.send(result);
    })
}

