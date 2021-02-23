
const connection = require("../../../database/conection")




    


module.exports={
    async index (req, res){
        const data = await connection('aplicacoes').select('Data_da_aplicacao', 'Hectares_Aplicados as Hectares Aplicados ')
        
    return res.json(data)
      

        
    }
}