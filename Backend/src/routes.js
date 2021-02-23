const express = require('express')
const routes = express.Router();
exports.routes = routes;

const { Gerais } = require("./controllers/Gerais");
const { AplicationManager } = require("./controllers/AplicationManager");
const { Adm } = require("./controllers/Adm");
const { Views } = require("./controllers/ViewsAplicacaoManager");
const { VeiculosManager } = require("./controllers/VeiculosManager");
//Controlers Gerais
Gerais();
Adm();

//APP
AplicationManager(); Views();
VeiculosManager();





module.exports=routes;







