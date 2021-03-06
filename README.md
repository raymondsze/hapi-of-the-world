# hapi-of-the-world
Stateless ES7 style Hapi restful API Server sample

## Dependencies
<a href = "https://github.com/dwyl/aguid">aguid</a>  
<a href = "https://github.com/babel/babel">babel</a>  
<a href = "https://github.com/ncb000gt/node.bcrypt.js">bcrypt</a>  
<a href = "https://github.com/petkaantonov/bluebird">bluebird</a>  
<a href = "https://github.com/hapijs/boom">boom</a>  
<a href = "https://github.com/hapijs/catbox-redis">catbox-redis</a>  
<a href = "https://github.com/hapijs/code">code</a>  
<a href = "https://github.com/eslint/eslint">eslint</a>  
<a href = "https://github.com/hapijs/good">good</a>  
<a href = "https://github.com/xsellier/good-winston-reporter">good-winston-reporter</a>  
<a href = "https://github.com/hapijs/hapi">hapi</a>  
<a href = "https://github.com/dwyl/hapi-auth-jwt2">hapi-auth-jwt2</a>  
<a href = "https://github.com/toymachiner62/hapi-authorization">hapi-authorization</a>  
<a href = "https://github.com/glennjones/hapi-swagger">hapi-swagger</a>  
<a href = "https://github.com/hapijs/inert">inert</a>  
<a href = "https://github.com/hapijs/joi">hapi</a>  
<a href = "https://github.com/pebble/joi-objectid">joi-objectid</a>  
<a href = "https://github.com/auth0/node-jsonwebtoken">jsonwebtoken</a>  
<a href = "https://github.com/hapijs/lab">lab</a>  
<a href = "https://github.com/lodash/lodash">lodash</a>  
<a href = "https://github.com/Automattic/mongoose">mongoose</a>  
<a href = "https://github.com/NodeRedis/node_redis">redis</a>  
<a href = "https://github.com/hapijs/vision">vision</a>  
<a href = "https://github.com/winstonjs/winston">winston</a>  
  
## How to start
git clone https://github.com/raymondsze/hapi-of-the-world  
operate mongodb in localhost:27017 (could change from config/default/database.js)  
operate redis in localhost:6379 (could change from config/default/server.js)  
npm install  
node ./server.js  
  
go to browser, swagger is pluged, you can visit localhost:8080/documentation  
  
## FAQ  
#### Is this still developing?  
Yes, many TODOs in my mind, will update here if I have spare time.  
1. Add Like/Vote system to document, try use MQ to handle traffic  
2. Build separate frontend(server view) server to handle server side rendering for React view.  
3. Use React and Redux with Semantic UI to build single page website (frontend)  
4. Testcases with Lab and Code

#### Why need to put authorization header everytime?  
I would like to make completely stateless restful api server.   
Without session validation, we could make mobile and web using the same api without concern of CSRF attack.
If I understand wrong, please kindly tell me.
