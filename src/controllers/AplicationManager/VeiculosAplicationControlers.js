const connect = require ('../../database/conection');
const crypto = require ('crypto');


module.exports = {
       async index (req, res){
           const area = 'Aplicacao'
         const veiculos = await connect('veiculo').select('*').where('Area', area)

        return res.json(veiculos)

    },
    async delete (req, res){

        const {id} = req.params
        const responsavel = req.headers.authorization
        

        const verres =  await connect('adms').where('idAdms', responsavel).select('idAdms')

        if (verres.length===0 ||verres[0].idAdms !== responsavel ){
            return res.json('Operação não permitida')
        }
        try{
            await connect('veiculo').where('idVeiculo', id).delete()
            return res.status(204).send();
        }catch(err){
            return res.json(err)
        }
        


    }
}