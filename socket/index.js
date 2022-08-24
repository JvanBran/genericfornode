const IO = require('socket.io')
const redisAdapter = require('@socket.io/redis-adapter')
const {Emitter} = require('@socket.io/redis-emitter')
// console.log(Emitter)
const jwt = require('jsonwebtoken');
let RedisStore = require('@plugins/redis.js')
const redisStore = new RedisStore()
const emitter = new Emitter(redisStore.redis)
const subClient  = redisStore.redis.duplicate()
function creatSocket(app, ctx) {
    ctx.context.collateral = IO(app, {
        origin: "*.*",
        path: '/socket/collateral/',
        transports: ['polling', 'websocket'],
        pingTimeout: 180000,
        pingInterval: 25000,
    })
    ctx.context.collateral.adapter(redisAdapter.createAdapter(redisStore.redis, subClient));

    ctx.context.collateral.on("connection", async (clientSocket) => {
        if(clientSocket.handshake.query.token!=''){
            // let userInfo =  jwt.verify(clientSocket.handshake.query.token, 'collateral')
            console.log(clientSocket.handshake.query.token)
            // await redisStore.redis.set('userforsocket:'+userInfo.organizational_id+':'+userInfo.role_id+':'+userInfo.id,clientSocket.id)
            await redisStore.redis.set('userforsocket:test:1:'+clientSocket.handshake.query.token,clientSocket.id)
        }
        clientSocket.on('chat message', async(msg)=>{
            // console.log(msg)
            // ctx.context.collateral.emit('chat message', msg);
            emitter.emit('chat message', msg);
            // console.log(emitter.commandQueue)
        });
        clientSocket.on('disconnect', async()=>{
            // 删除redis 用户对应的id
            await redisStore.redis.del('userforsocket:'+userInfo.organizational_id+':'+userInfo.role_id+':'+userInfo.id)
            console.log('user disconnected',clientSocket.id);
        });
    })
    
}
module.exports = {
    creatSocket,
    emitter
}