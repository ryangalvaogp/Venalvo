
const connection = require("../../../database/conection")

module.exports={
    async index (req, res){
        const a = await connection('aplicacoes').sum('Hectares_Aplicados as Total_Hectares_Aplicados').first()
        const total_Ha = await connection('talhao').sum('Hectares as TotalHa').first() 
        
        return res.json({a, total_Ha})
    }
}


//SELECT SUM(Hectares_Aplicados) as Total_HectaresAplicados FROM aplicacoes WHERE idAplicacoes= idAplicacoes;
