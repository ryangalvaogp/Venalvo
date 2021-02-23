const connection = require('../../database/conection')
const crypto = require ('crypto')

module.exports = {
    /**Listagem de Ogs cadastradas */
    async create (request, response){
        const {name, password} = request.body;
        
                const idAdms = crypto.randomBytes(3).toString('hex')
                try{
                    await connection('adms').insert({
                        idAdms,
                        name,
                        password
                        //email,
                        //celular,
                        //funcao,
                    })
                    return response.json({Status: "Cadastrado com sucesso"});
        
                }catch(err) {
                    if(err.errno===1062){
                        return response.json({Status: "Administrador já existente", err: err.stack});
        
                    }else{
                        console.log(err)
                        return response.json({Status: "Erro não encontrado"});
        
                    }
                    
        
                }
                
    },

    async index (request, response ){
        const users = await connection('adms').select('name');

        return response.json(users);


    }    
}