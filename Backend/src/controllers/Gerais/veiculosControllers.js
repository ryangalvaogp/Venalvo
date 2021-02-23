const connect = require ('../../database/conection');
const crypto = require ('crypto');


module.exports = {
    async create (req, res){
       
        const { Titulo, Capacidade_Tanque, Tipo, Area} = req.body 
        const idVeiculo = crypto.randomBytes(3).toString('hex')
        
        await connect('veiculo').insert({
            idVeiculo, Titulo, Capacidade_Tanque, Tipo, Area
        });
        
        return res.json({status: "Veículo Cadastrado com Sucesso"})
    },
    async index (req, res){
         const veiculos = await connect('veiculo').select('*')

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