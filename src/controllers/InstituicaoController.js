const Instituicao = require('../models/Instituicao');

class InstituicaoController {
    static async cadastrarInstituicao(req, res) {
        try {
            const novaInstituicao = await Instituicao.create(req.body);
            res.status(201).json(novaInstituicao);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = InstituicaoController;