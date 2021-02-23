const connection = require('../../database/conection')

module.exports = {
async create (request, response){
    const { name, password } = request.body;
    
    const Usuario = await connection ('adms')
    .where('name', name)
    .where('password',password)
    .select('Name', 'Email', 'id')
    .first();

    if (!Usuario){
        return response.status (400).json({error: 'Usuario não cadastrado pelo Administrador'})
    }
    
    return response.json(Usuario)
   
    



}


}
