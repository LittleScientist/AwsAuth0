# AwsAuth0
User Authentication using AWS Cognito

## Setup
Clone the repository and install dependancies
```bash
$ git clone https://github.com/LittleScientist/AwsAuth0.git
$ cd AwsAuth0
$ npm install
$ npm run start
```

## How to Test API's
Once you get Server is running on port 3000 on your terminal you can test api's using postman.

## Endpoint, inputs and respective outputs for Api's

1) Register Api

endpoint : http://localhost:3000/auth/register

input : 
```bash
{
 "name":"gauree",   
 "email":"swapnali.dive20@gmail.com",
 "password":"Hello$World3" 
 }
 ```

 output:
 ```bash
 {
    "username": "gauree",
    "pool": {
        "userPoolId": "us-east-2_Kq1EQaW5l",
        "clientId": "7vomvbk6rtgsvgklopi451ttk",
        "client": {
            "endpoint": "https://cognito-idp.us-east-2.amazonaws.com/",
            "fetchOptions": {}
        },
        "advancedSecurityDataCollectionFlag": true
    },
    "Session": null,
    "client": {
        "endpoint": "https://cognito-idp.us-east-2.amazonaws.com/",
        "fetchOptions": {}
    },
    "signInUserSession": null,
    "authenticationFlowType": "USER_SRP_AUTH",
    "keyPrefix": "CognitoIdentityServiceProvider.7vomvbk6rtgsvgklopi451ttk",
    "userDataKey": "CognitoIdentityServiceProvider.7vomvbk6rtgsvgklopi451ttk.gauree.userData"
}
```

2) Confirm User after registration using email verification code.

endpoint : http://localhost:3000/auth/confirm

input:
```bash
{
    "name":"gauree",
    "verificationCode":"238311"
}
```

output:
```bash
SUCCESS
```

3) Login Api

endpoint : http://localhost:3000/auth/login

input : 
```bash
{
 "name":"gauree",    
 "password":"Hello$World3" 
}
```

output:
```bash
eyJraWQiOiIzbEJtU0pySms5N2xaSlwvSDVvdDRXRms1WWJTUDgyMzdwMDYrXC9QYVl3Ums9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI1M2ViZTQ3MC0wYWY4LTRmYzEtYjE3NC1iODhlMTVmNzQzM2EiLCJldmVudF9pZCI6ImI4ZmQxN2E0LWQyZjgtNDQ1NS04YWVlLWZkZDEyYzZkZjI4MCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1OTc5NDAzMzYsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yX0txMUVRYVc1bCIsImV4cCI6MTU5Nzk0MzkzNiwiaWF0IjoxNTk3OTQwMzM2LCJqdGkiOiI5YjY1ZGM2Yy1hYTU3LTRiYTUtOGE0My1lNGZiMzk3MDFjYTUiLCJjbGllbnRfaWQiOiI3dm9tdmJrNnJ0Z3N2Z2tsb3BpNDUxdHRrIiwidXNlcm5hbWUiOiJnYXVyZWUifQ.mhftikfsnZsEvnPb0pi8l7u75IC9xNq8RYMbK7cQYqf3MgjIYZb87gzmziVu8Ixyp6LiLuekmrqX05ZDaDyveF2YYufwUtFuY_M_RGbkWijq6kXVn6tUbjAyjgPw9uyFoHuQEUaRb_73L7nwx49iCoxcJtU4A7vMJf7bG2eQ7oL4bQk3M-c-pKYCI3uo7J4s6Z3hxrQvGNYWlG4HUKad_Y_GDPLEh62y_FMLFzKwtf46zlYkMA8ajRvRtkeMDudddH6ty3ihZ-5gR0ne9Eeys_SNlbdxq8JaAD4RYyiRh_QOwwAvtGg9JcX_s0XAypUccQH1GaWAEenhA5G0nhWp-A
```

4) Validate jwt token received as output in login api

endpoint : http://localhost:3000/auth/validate

input:
```bash
{    "token":"eyJraWQiOiIzbEJtU0pySms5N2xaSlwvSDVvdDRXRms1WWJTUDgyMzdwMDYrXC9QYVl3Ums9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI1M2ViZTQ3MC0wYWY4LTRmYzEtYjE3NC1iODhlMTVmNzQzM2EiLCJldmVudF9pZCI6ImI4ZmQxN2E0LWQyZjgtNDQ1NS04YWVlLWZkZDEyYzZkZjI4MCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1OTc5NDAzMzYsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yX0txMUVRYVc1bCIsImV4cCI6MTU5Nzk0MzkzNiwiaWF0IjoxNTk3OTQwMzM2LCJqdGkiOiI5YjY1ZGM2Yy1hYTU3LTRiYTUtOGE0My1lNGZiMzk3MDFjYTUiLCJjbGllbnRfaWQiOiI3dm9tdmJrNnJ0Z3N2Z2tsb3BpNDUxdHRrIiwidXNlcm5hbWUiOiJnYXVyZWUifQ.mhftikfsnZsEvnPb0pi8l7u75IC9xNq8RYMbK7cQYqf3MgjIYZb87gzmziVu8Ixyp6LiLuekmrqX05ZDaDyveF2YYufwUtFuY_M_RGbkWijq6kXVn6tUbjAyjgPw9uyFoHuQEUaRb_73L7nwx49iCoxcJtU4A7vMJf7bG2eQ7oL4bQk3M-c-pKYCI3uo7J4s6Z3hxrQvGNYWlG4HUKad_Y_GDPLEh62y_FMLFzKwtf46zlYkMA8ajRvRtkeMDudddH6ty3ihZ-5gR0ne9Eeys_SNlbdxq8JaAD4RYyiRh_QOwwAvtGg9JcX_s0XAypUccQH1GaWAEenhA5G0nhWp-A"
}
```

output:
```bash
{ sub: '53ebe470-0af8-4fc1-b174-b88e15f7433a',
  event_id: 'b8fd17a4-d2f8-4455-8aee-fdd12c6df280',
  token_use: 'access',
  scope: 'aws.cognito.signin.user.admin',
  auth_time: 1597940336,
  iss:
   'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_Kq1EQaW5l',
  exp: 1597943936,
  iat: 1597940336,
  jti: '9b65dc6c-aa57-4ba5-8a43-e4fb39701ca5',
  client_id: '7vomvbk6rtgsvgklopi451ttk',
  username: 'gauree' }
  ```
