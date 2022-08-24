require('dotenv').config('./env')
const { RD_HOST, RD_FAMILY, RD_PORT, RD_DB, RD_PWD } =  process.env
const Redis = require('ioredis');
const { default: Redlock } = require("redlock");
//集群使用 redlock 
module.exports = class RedisStore {
    constructor() {
        this.redis = new Redis({ 
            port: RD_PORT,
            host: RD_HOST,
            family: RD_FAMILY, // 4 (IPv4) or 6 (IPv6)
            password: RD_PWD,
            db: RD_DB,
            retryStrategy(times) {
                const delay = Math.min(times * 50, 2000);
                return delay;
            },
            reconnectOnError(err) {
                const targetError = "READONLY";
                    if (err.message.includes(targetError)) {
                        return true;
                    }
                }
        });
        this.redlock = new Redlock([this.redis],{
            driftFactor : 0.01 ,  // 乘以 lock ttl 来确定漂移时间
            retryCount: 10,
            retryDelay: 200, // time in ms
            retryJitter: 200, // time in ms
            automaticExtensionThreshold: 500, // time in ms
        })
    }
    async get(sid) {
        let data = await this.redis.get(sid);
        return data;
    }
    async set(sid,obj) {
        let data = await this.redis.set(sid, JSON.stringify(obj));
        return sid;
    }
    async del(sid) {
        let data = await this.redis.del(sid);
        return data;
    }
    async incr(sid) {
        await this.redis.incr(sid)
        return sid;
    }
}
