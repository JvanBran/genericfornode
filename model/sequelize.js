require('dotenv').config('./env')
const { DB_HOST, DB_NAME, DB_PORT, DB_USER, DB_PWD } =  process.env
const { Sequelize } = require('sequelize');
const { info, debug, error, trace, warn, fatal } = require('@util/log4j')
const sequelizes = new Sequelize(DB_NAME,DB_USER,DB_PWD,{
    host: DB_HOST,
    port: DB_PORT,
    dialect:'mysql',
    logging: log,
    dialectModule: require('mysql2'),
    dialectOptions: {
        charset: "utf8",
        bigNumberStrings: true,
        connectTimeout: 20000,
        dateStrings: true,
        typeCast: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: true,
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci', 
        createdAt:'created_at',
        updatedAt:'updated_at',
        deletedAt:'deleted_at',
        underscored: true,
        freezeTableName: true //强制表名和模型名一致，不自动推断为复数
    },
    timezone: '+08:00', //东八时区
    dialectOptions: {  // 让读取date类型数据时返回字符串而不是UTC时间
        dateStrings: true,
        typeCast(field, next) {
            if (field.type === "DATETIME") {
                return field.string();
            }
            return next();
        }
    }
});
function log(sql,details){
    info(sql)
    // logger.info(details)
}
sequelizes.transaction({
    // to defer all constraints:
    deferrable: Sequelize.Deferrable.SET_DEFERRED,
    // to defer a specific constraint:
    // deferrable: Sequelize.Deferrable.SET_DEFERRED(['some_constraint']),
    // to not defer constraints:
    // deferrable: Sequelize.Deferrable.SET_IMMEDIATE
})
module.exports = sequelizes