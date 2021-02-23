const { routes } = require("../routes");

function Views() {
    const dataHectarAplicacao = require('./AplicationManager/Views/dataHectarAplicacao'); //
    const HectaresAplicados = require('./AplicationManager/Views/HectaresAplicados'); //
    const All = require('./AplicationManager/Views/all'); //
    routes.get('/views/dataHectarAplicacao', dataHectarAplicacao.index); //
    routes.get('/views/HectaresAplicados', HectaresAplicados.index); //
    routes.post('/views/AllAplicacoes/:id', All.index);
}
exports.Views = Views;
