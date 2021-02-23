const express = require('express')
const routes = express.Router();

const main = require ('./controllers/main')

routes.get('/', main.index)



module.exports=routes;







