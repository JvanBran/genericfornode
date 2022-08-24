const datalize = require('datalize');
const catchError = async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        if(error instanceof datalize.Error){
            ctx.fail('参数错误',9998,error.errors)
        }else{
            console.log(error.name)
            if(error.name == 'SequelizeForeignKeyConstraintError'){
                ctx.fail('数据库外键错误',501,error.message)
            }else if(error.name == 'SequelizeUniqueConstraintError'){
                ctx.fail('数据库错误',502,error.message)
            }else if(error.name == 'SequelizeDatabaseError'){
                ctx.fail('数据库错误',503,error.message)
            }else if(error.name == 'TypeError'){
                ctx.fail('数据库错误',504,error.message)
            }else{
                ctx.fail('系统错误',500,error.message)
            }
        }
    }
}
module.exports = catchError;