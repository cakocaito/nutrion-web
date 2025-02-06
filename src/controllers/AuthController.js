const Consultor = require('../models/Consultor');

class AuthController {
    static async cadastrarConsultor(req, res) {
        try {
            const novoConsultor = await Consultor.create(req.body);
            res.status(201).json(novoConsultor);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = AuthController;