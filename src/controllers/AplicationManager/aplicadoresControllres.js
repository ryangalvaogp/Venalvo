const connection = require('../../database/conection')
const crypto = require('crypto')

module.exports = {

    async index(req, res) {
        const aplicadores = await connection('aplicadores').select('*')

        return res.json(aplicadores)
    },
    async create(req, res) {
        const { Nome } = req.body
        const idAplicadores = crypto.randomBytes(3).toString('hex')

        try {

            const aplicador = await connection('aplicadores').insert({
                idAplicadores,
                Nome
            })
            return res.json("Aplicador Cadastrado Com Sucesso")
        } catch (err) {
            console.log(err)
            return res.json('Não foi possível cadastrar')
        }
    },
    async delete(request, response) {
        const { id } = request.params;
        const Responsavel = request.headers.authorization;

        const verres = await connection('adms').where('idAdms', Responsavel).select('idAdms');      

        if (verres.length === 0 || verres[0].idAdms != Responsavel) {
            return response.json({ error: 'Operacao não foi permitida' });;
        }

        try {
            await connection('aplicadores').where('idaplicadores', id).delete();
            return response.status(204).send();
        } catch (err) {
            return response.json(err)
        }



        ;
    }

}