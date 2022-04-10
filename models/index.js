const dbConfig = require('../config/database')

const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
})

sequelize.authenticate()
.then(() => {console.log('Connected')})
.catch(err => {console.log('Error' + err)})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.products = require('./Product')(sequelize, DataTypes)
db.users = require('./User')(sequelize, DataTypes)
db.usersExternal = require('./UserExternal')(sequelize, DataTypes)
db.categories = require('./Category')(sequelize, DataTypes)
db.photos = require('./Photo')(sequelize, DataTypes)
db.pages = require('./Page')(sequelize, DataTypes)

//if force:true all table data will be cleared on each server running
db.sequelize.sync({ force: false })
.then(() => {console.log('re-sync done!')})

db.products.hasMany(db.photos, {
  foreignKey: 'product_id',
  as: 'photos'
})

db.photos.belongsTo(db.products, {
  foreignKey: 'product_id',
  as: 'products'
})

module.exports = db