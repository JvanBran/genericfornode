const {Sequelize,Model,DataTypes} = require('sequelize')
class Test extends Model {
    static init(sequelize){
        return super.init(
            {
                asset_id:{
                    type: DataTypes.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    primaryKey: true,
                    comment:'唯一主键'
                },
                test_num:{
                    type: DataTypes.INTEGER(10),
                    allowNull: false,
                    defaultValue: 0, //0是没有排序的
                    comment: 'test编号'
                },
                test_name:{
                    type: DataTypes.STRING,
                    allowNull: false,
                    comment: 'test名称'
                }
            },
            { 
                sequelize, 
                freezeTableName: true,
                modelName: 'Test', 
                comment: "Test"
            }
        )
    }
    static associate(models){
        // models.Test.hasMany(models.xxx)
        // models.Test.belongsTo(models.xxx)
        // models.Test.belongsToMany(models.xxx,{through: models.xxx})
    }
}

module.exports = Test