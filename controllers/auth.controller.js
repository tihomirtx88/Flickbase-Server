const { authService } = require('../services/');

const authCotroller = {
    async test(req, res, next){
       res.json({ok: 'Test'})
    }
}

module.exports = authCotroller;