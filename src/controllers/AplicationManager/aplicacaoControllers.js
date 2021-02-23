
const connection = require('../../database/conection')
const crypto = require('crypto')

module.exports={
    async index (req, res){
        const aplicacoes = await connection('aplicacoes').select('*')

        return res.json(aplicacoes) 
    },
    async create (req, res ){
        const {idAplicacoes, idVeiculo, Vasao, idTalhao, idAplicador, Data_da_aplicacao, Hectares_Aplicados ,Voltas} = req.body
        // const idAplicacoes = crypto.randomBytes(3).toString('hex')

        try{
            const aplicacao = await connection('aplicacoes').insert({
                idAplicacoes,
                idVeiculo,
                idTalhao,
                idVeiculo,
                idAplicador,
                Vasao,
                Data_da_aplicacao,
                Voltas, 
                Hectares_Aplicados

            })
            return res.json(idAplicacoes)
        }catch(err){
            return res.json(err)
        }
    },

    async details (req, res){
        const aplicacoes = await connection('aplicacoes')
        .join('veiculo', 'veiculo.idVeiculo', '=', 'aplicacoes.idVeiculo')
        .join( 'aplicadores', 'aplicadores.idAplicadores', '=', 'aplicacoes.idAplicador')
        .join ('talhao', 'talhao.idTalhao', 'aplicacoes.idTalhao')
        .select(
            'idAplicacoes as idAplicacao',
            'Nome as Aplicador',
            'talhao.Titulo as Area',
            'veiculo.Titulo as Veiculo',
            'Tipo',
            'Hectares',
            'Hectares_Aplicados',   
            'Capacidade_Tanque',
            'Vasao',
            'Data_da_aplicacao',
            'Voltas'

        )
        

        
        
       
     return res.json(aplicacoes) 
    },
    async index_produto_Aplicacao (req, res){

        const {aplicacao} = req.params 

        const verp = await connection('produtos_Aplicacao').join('aplicacoes', 'aplicacoes.idAplicacoes', '=', 'produtos_Aplicacao.idAplicacao')
        
        if(verp.length===0 || verp[0].idAplicacao!== aplicacao){
            return res.json('nao')
        }
    
        const aplicacao_Produtos = await connection('produtos_Aplicacao').where('idAplicacao', aplicacao).select('Titulo', 'Dosagem').innerJoin('produtos', 'produtos.idProdutos', '=', 'produtos_Aplicacao.idProdutos')
       
        return res.json(aplicacao_Produtos)
    },
    async create_produto_Aplicacao (req, res){
        const idprodutoaplicacao = crypto.randomBytes(3).toString('hex')

        const {idAplicacao, idProdutos, Quantidade, Quant_liquido, Dosagem} = req.body;

        try{
            await connection('produtos_aplicacao').insert({idAplicacao, idProdutos, Quantidade, Quant_liquido, Dosagem})
            
            return res.json("Cadastrado com Sucesso")
        }catch(err){
            return res.json(err)
        }

    }
}