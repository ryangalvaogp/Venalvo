const { routes } = require("../routes");

function Adm() {
    const session = require('./Admin/sessionControllers');
    const usuarioControllers = require('./Admin/usuarioControllers');
    routes.post('/adms', usuarioControllers.create);
    routes.get('/adms', usuarioControllers.index);
    routes.post('/session', session.create);
}
exports.Adm = Adm;
