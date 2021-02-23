const connection = require('../../database/conection')
const crypto = require ('crypto')

module.exports = {

async create (request, response){

    const { Titulo, Quantidade_Disponivel, Volume_por_galao, Categoria} = request.body;

    const idProdutos = crypto.randomBytes(3).toString('HEX');
   // const Responsavel_id=request.headers.authorization;
   
    await connection('produtos').insert({   
        idProdutos,
        Titulo, 
        Quantidade_Disponivel,
        Volume_por_galao,
        Categoria
    });
return response.json(`${Titulo} foi cadastrado com sucesso`)
},
async index (request, response ){
   
    const produtos = await connection('produtos')
    .select('*');
    

    // const produtos = await connection('venalvo')
    // .join('usuario', 'usuario.id', '=', 'eventos.Responsavel_id')
    // .select('eventos.*', 'usuario.name', 'usuario.email');
    // //.select('*');
   
   
    return response.json(produtos);


},


async delete (request, response){
    const  {id}  = request.params;
    const Responsavel=request.headers.authorization;

    const adms = await connection ('adms').where('idAdms', Responsavel).select ('idAdms')

    if (adms.length===0 || adms[0].idAdms != Responsavel){
        return response.json({error: 'Operacao não foi permitida'});;
    }
    try{   
    await connection('produtos').where('idProdutos', id).delete();
        return response.status(204).send();
    }catch(err){
        return res.json(err)
    }
  

   },

   async detailsProdutos (req, res){
       const {id} = req.params;
       
       const produto = await connection ('produtos').where('idProdutos', id).select('*').first()

       return res.json(produto)
   }
    
    


}