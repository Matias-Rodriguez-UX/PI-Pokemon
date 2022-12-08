const { Pokemon, Types } = require('../../db.js')

const getDBInfo = async () => {
    const dbInfo = await Pokemon.findAll({
        include: {
            model: Types,
            attr1: ['name'],
            through: {
                atrr2: []
            }
        }
    })
    return dbInfo
}

module.exports = {
    getDBInfo
}