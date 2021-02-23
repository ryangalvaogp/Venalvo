const { routes } = require("../routes");

function AplicationManager() {
    const aplicacaoControllers = require('./AplicationManager/aplicacaoControllers');
    const produtosControllers = require('./AplicationManager/produtosControllers');
    const aplicadores = require('./AplicationManager/aplicadoresControllres');
    const veiculosAplicacaoControllers = require ('./AplicationManager/VeiculosAplicationControlers')

    /** Rotas para aplicadores */
    routes.post('/aplicadores', aplicadores.create);
    routes.get('/aplicadores', aplicadores.index);
    routes.delete('/aplicadores/:id', aplicadores.delete);



    routes.post('/aplicacao', aplicacaoControllers.create);
    routes.get('/aplicacao', aplicacaoControllers.index);
    routes.get('/aplicacao/details', aplicacaoControllers.details);

    /** Rotas para Produtos das aplicacoes */
    routes.get('/aplicacao/details/produtos/:aplicacao', aplicacaoControllers.index_produto_Aplicacao);

    routes.post('/aplicacao/details/produtos', aplicacaoControllers.create_produto_Aplicacao);
    //routes.delete('/aplicacao/:id', aplicacaoControllers.delete)
    /** Rotas para os Produtos */
    routes.post('/produtos/new', produtosControllers.create);
    routes.get('/produtos', produtosControllers.index);
    routes.delete('/produtos/:id', produtosControllers.delete);
    routes.post('/produtos/:id', produtosControllers.detailsProdutos);

    routes.get('/AplicationManager/Veiculos', veiculosAplicacaoControllers.index);
    

}
exports.AplicationManager = AplicationManager;
