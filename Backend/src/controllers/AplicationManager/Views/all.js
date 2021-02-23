const connection = require("../../../database/conection")


module.exports={
    async index (req, res){

        const {id} = req.params 
        const data = await connection('aplicacoes').
        select(
            'idAplicacoes',
            'aplicadores.Nome as Aplicador',
            'Hectares_Aplicados',
            'Voltas',
            'produtos.Titulo as Titulo_Produto',
            'Hectares',
            'Capacidade_Tanque',
            'Tipo',
            'Categoria',
            'Dosagem',
            'Quantidade as Quantidade_Aplicada_Galao',
            'Quant_liquido as Quantidade_liquida_Aplicada',
            'talhao.titulo as Titulo_talhao',
            'aplicacoes.Data_da_aplicacao'     



        )
        .join('produtos_aplicacao', 'aplicacoes.idAplicacoes', '=', 'produtos_aplicacao.idAplicacao' )
        .join('aplicadores', 'aplicacoes.idAplicador', '=', 'aplicadores.idAplicadores')
        .join('talhao', 'aplicacoes.idTalhao', '=' ,'talhao.idTalhao')
        .join('veiculo', 'aplicacoes.idVeiculo', '=', 'veiculo.idVeiculo')
        .join('produtos', 'produtos_aplicacao.idProdutos', '=', 'produtos.idProdutos')
        .where('aplicacoes.idAplicacoes', id)
        
        
        return res.json (data)

        
    }
}