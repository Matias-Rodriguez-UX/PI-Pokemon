const { Pokemon, Types } = require('../../db.js')

export default getDBInfo = async () => {
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