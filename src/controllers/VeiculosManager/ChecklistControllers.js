const connection = require('../../database/conection')
const crypto = require ('crypto')
module.exports={
    async index (req, res){
        const Checklist = await connection('veiculoChecklist')
        .innerJoin('veiculo', 'veiculo.idveiculo', '=', 'veiculoChecklist.idveiculo')
        .select('veiculo.idveiculo','idChecklist', 'Titulo', 'local','Tipo', 'Area', 'Data','Origem', 'Destino', 'HorimetroI', 'HorimetroF', 'objetivo')

        return res.json(Checklist) 

    },
    async create (req, res){
        const idChecklist = crypto.randomBytes(3).toString('hex')
        const { idveiculo,Data,Origem,Destino,HorimetroI,
        HorimetroF, objetivo} = req.body;
        const {a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, x, y, w, z, aa, ab, ac, ad, ae, af, ag, ah, ai, aj, Observacoes, local, idOperador} = req.body

        try {
           const Checklist= await connection('veiculochecklist').insert(
                {idChecklist, idveiculo, Data, Origem, Destino, HorimetroI, HorimetroF, objetivo,
                    a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, x, y, w, z, aa, ab, ac, ad, ae, af, ag, ah, ai, aj,
                 Observacoes, local, idOperador}
            )
            return res.json('Cadastrado com sucesso')
        } catch (error) {
            return res.json(error.message)
        }
    },
    async delete (req, res){
        const { id } = req.params;
    const Responsavel = req.headers.authorization;

    const verres = await connection('adms').where('idAdms', Responsavel).select('idAdms');      

    if (verres.length === 0 || verres[0].idAdms != Responsavel) {
        return res.json({ error: 'Operacao não foi permitida' });;
    }

    try {
        await connection('veiculochecklist').where('idChecklist', id).delete();
        return res.status(204).send();
    } catch (err) {
        return res.json(err)
    }



    ;


    },
    async details (req, res){
        const {id} = req.params
        
        const Checklist = await connection('veiculoChecklist')
        .innerJoin('veiculo', 'veiculo.idveiculo', '=', 'veiculoChecklist.idveiculo')
        .select('veiculo.idveiculo','idChecklist','local', 'Titulo', 'Tipo', 'Area', 'Data','Origem', 'Destino', 'HorimetroI', 'HorimetroF', 'objetivo', 'Observacoes')
        .where('veiculo.idveiculo', id)

        return res.json(Checklist) 

    },

}