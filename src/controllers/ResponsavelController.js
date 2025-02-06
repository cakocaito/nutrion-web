const Responsavel = require('../models/Responsavel');

class ResponsavelController {
    static async cadastrarResponsavel(req, res) {
        try {
            const novoResponsavel = await Responsavel.create(req.body);
            res.status(201).json(novoResponsavel);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ResponsavelController;