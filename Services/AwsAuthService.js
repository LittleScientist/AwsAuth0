global.fetch = require('node-fetch');
global.navigator = () => null;

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const poolData = {
   UserPoolId: "us-east-2_Kq1EQaW5l",
   ClientId: "7vomvbk6rtgsvgklopi451ttk"
};

const pool_region = "us-east-2";

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

var request = require('request');
var jwkToPem = require('jwk-to-pem');
var jwt = require('jsonwebtoken');
var jwtDecode = require('jwt-decode');

exports.Register = function (body, callback) {
   var name = body.name;
   var email = body.email;
   var password = body.password;
   var attributeList = [];


   attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "email", Value: email }));
   userPool.signUp(name, password, attributeList, null, function (err, result) {
    if (err)
         callback(err);
     var cognitoUser = result.user;
     callback(null, cognitoUser);
        });
}

exports.ConfirmUser = function(body,callback ){
    var userData = {
        Username : body.name,
        Pool : userPool
    };

    var code = body.verificationCode;
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.confirmRegistration(code, true, function(err, result) {
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        }
        console.log('call result: ' + result);
    });    
}

exports.ConfirmUser = function(body, callback){
    var code = body.verificationCode;  
    var userName = body.name; 

    var userData = {
        Username: userName,
        Pool: userPool
   }
   
   var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

   cognitoUser.confirmRegistration(code, true, function(err, result) {
       if (err) {
           //console.log('error while confirming  code: ' + err);
           callback(err);
           return;
       }
       // console.log('email verificaton: ' + result);
       callback(null, result);
   });   
}

exports.Login = function (body, callback) {
    var userName = body.name;
    var password = body.password;       

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
         Username: userName,
         Password: password
    });  
   
    var userData = {
        Username: userName,
        Pool: userPool
   }
   
   var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
         onSuccess: function (result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());
            var accesstoken = result.getAccessToken().getJwtToken();
            callback(null, accesstoken);
    },
        onFailure: (function (err) {
                callback(err);
        })
    })
};

exports.ValidateToken = function(token, callback) {    
    request({
        url: `https://cognito-idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            pems = {};
            var keys = body['keys'];
            for(var i = 0; i < keys.length; i++) {
                //Convert each key to PEM
                var key_id = keys[i].kid;
                var modulus = keys[i].n;
                var exponent = keys[i].e;
                var key_type = keys[i].kty;
                var jwk = { kty: key_type, n: modulus, e: exponent};
                var pem = jwkToPem(jwk);
                pems[key_id] = pem;
            }

           var decodedJwt = jwt.decode(token, {complete: true});

            if (!decodedJwt) {
                console.log("Not a valid JWT token");                
                return;
            }

            var kid = decodedJwt.header.kid;
            var pem = pems[kid];
            if (!pem) {
                console.log('Invalid token');
                return;
            }

            jwt.verify(token, pem, function(err, payload) {
                if(err) {
                    console.log("Invalid Token.");
                } else {
                    console.log("Valid Token.");
                    console.log(payload);
                    callback(payload);
                }
            });
        } else {
            console.log("Error! Unable to download JWKs");
        }
    });
}