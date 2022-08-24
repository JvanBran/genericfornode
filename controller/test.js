const {Sequelize,Op} = require('sequelize');
const {models} = require('@model/index.js');
class SysConfigController{
    static async Test (ctx){
        const { pageNo, pageSize, type, organizational_id} = ctx.query
        let offset = (Number(pageNo) - 1) * Number(pageSize);
        const Filter = {
            [Op.and]: [
                type ? { type: { [Op.like]: `%${type}%` } } : {},
                organizational_id ? { OrganizationalId: { [Op.like]: `%${organizational_id}%` } } : {},{},
            ]
        }
        const info = await models.SysConfig.findAndCountAll({
            where:Filter,
            limit: Number(pageSize),
            attributes: [
                "id",
                "type", 
                "key", 
                "value",
                "organizational_id",
                [Sequelize.col('Organizational.dept_name'), 'dept_name'],
                [Sequelize.col('Organizational.parent_id'), 'parent_id'],
                "created_at",
                "updated_at",
            ],
            include:[{
                attributes: [],
                model:models.Organizational,
                require: false,
            }],
            offset,
            order: [ [ 'created_at', 'DESC' ]],//倒序
        })
        ctx.success({
            data: info.rows,
            total: info.count,
            pageNo: Number(pageNo),
            pageSize: Number(pageSize)
        })
    }
    static async Add (ctx){
        const { type, key, value, organizational_id} = ctx.request.body
        const Info = await models.SysConfig.create({
            type, key, value, OrganizationalId:organizational_id
        })
        ctx.success(Info)
    }
    static async Edit (ctx){
        const { id, type, key, value, organizational_id} = ctx.request.body
        const updateStatus =  await models.SysConfig.update({
            type, key, value,OrganizationalId:organizational_id
        },{
            where:{
                id
            }
        })
        if(updateStatus[0]>0){
            const returnUpdated =  await models.SysConfig.findOne({
                where:{
                    id
                },
                attributes: [
                    "id",
                    "type", 
                    "key", 
                    "value",
                    "organizational_id",
                    [Sequelize.col('Organizational.dept_name'), 'dept_name'],
                    [Sequelize.col('Organizational.parent_id'), 'parent_id'],
                    "created_at",
                    "updated_at",
                ],
                include:[{
                    attributes: [],
                    model:models.Organizational,
                    require: false,
                }],
            })
            ctx.success(returnUpdated)
        }else{
            ctx.fail('更新失败',9002,{})
        }
    }
    static async Delete (ctx){
        const { id } = ctx.query
        await models.SysConfig.destroy({
            where:{
                id
            }
        })
        ctx.success({}, '删除成功')
        
    }
}
module.exports = SysConfigController
