const { routes } = require("../routes");

function VeiculosManager() {
    const ChecklistControllers = require('./VeiculosManager/ChecklistControllers');

    routes.get('/Veiculos/Checklist', ChecklistControllers.index);
    routes.post('/Veiculos/Checklist', ChecklistControllers.create);
    routes.delete('/Veiculos/Checklist/:id', ChecklistControllers.delete);

    

}
exports.VeiculosManager = VeiculosManager;
