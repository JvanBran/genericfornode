const jwt = require('jsonwebtoken');
module.exports = ()=>{
    return async(ctx, next) =>{
        try {
            const authorization = ctx.get('Authorization')
            // 检验 token 是否已过期
            if(authorization!=''){
                const token = authorization.split(' ')[1]
                try {
                    ctx.userInfo =  await jwt.verify(token, 'collateral')
                } catch (err) {
                    ctx.fail('token过期！！',401,{})
                    return
                }
            }
            await next().catch(async(err)=>{
                if (err.status === 401) {
                    ctx.fail('请登录！！',401,{})
                }else {
                    console.log(err)
                    ctx.fail('系统错误',401,err.message)
                }
            })
        } catch (error) {
            console.log(error)
            ctx.fail('系统错误',401,error.message)
        }
    }
}