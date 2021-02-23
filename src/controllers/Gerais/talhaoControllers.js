const connection = require('../../database/conection')
const crypto = require ('crypto')

module.exports = {

async create (request, response){

    const {Titulo, Hectares, Fazenda} = request.body;
    
    const idTalhao = crypto.randomBytes(3).toString('hex');
    
    try{
        await connection('talhao').insert({     
            idTalhao,  
            Titulo,
            Hectares,
            Fazenda
                });
    return response.json(`${Titulo} Cadastrado com Sucesso`)
    }catch(err){
        return response.json(err)
    }
    
},

async index (request, response ){
    
    const talhoes = await connection('talhao')
    .select('*');
    //.select('*')
    return response.json(talhoes);


},


async delete (request, response){
    const  {id}  = request.params;
    const Responsavel=request.headers.authorization;

    const verres = await connection ('adms').where('idAdms', Responsavel ).select ('idAdms')

    if (verres.length===0 || verres[0].idAdms != Responsavel){
        return response.json({error: 'Operacao não foi permitida'});;
    }
       try{
        await connection('talhao').where('idTalhao', id).delete();
        return response.status(204).json('Deletado com Sucesso');
    
       }catch(err){
        return res.json(err)
       } 
  

    ;}



}