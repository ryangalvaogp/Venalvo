const { routes } = require("../routes");

function Gerais() {
    const veiculosControllers = require('./Gerais/veiculosControllers');
    const talhaoControllers = require('./Gerais/talhaoControllers');


    /** Rotas para os talhões */
    routes.post('/talhao', talhaoControllers.create);
    routes.get('/talhao', talhaoControllers.index);
    routes.delete('/talhao/:id', talhaoControllers.delete);


    /** Rotas para o Veículos  */
    routes.post('/veiculos', veiculosControllers.create);
    routes.get('/veiculos', veiculosControllers.index);
    routes.delete('/veiculos/:id', veiculosControllers.delete);
}
exports.Gerais = Gerais;
