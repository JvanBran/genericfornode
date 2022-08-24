const sequelizes = require('./sequelize.js')
const fs = require('fse')
const path = require('path')
const files = fs
    .readdirSync(__dirname)
    .filter((f)=> !['sequelize.js','index.js'].includes(f) && f.endsWith('.js')
    )
for(const item of files){
    require(path.join(__dirname,item)).init(sequelizes)
}
Object.values(sequelizes.models)
  .filter(model => typeof model.associate === "function")
  .forEach(model => model.associate(sequelizes.models));
// sequelizes.sync({ force: true})
// sequelizes.sync({ alter: true})

module.exports = {
  models: sequelizes.models,
  transaction: sequelizes.transaction.bind(sequelizes)
}