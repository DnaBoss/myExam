const dbConfig = require('../config/db');
const redis = require("redis");
const client = redis.createClient({ port: dbConfig.dev.redis.port, host: dbConfig.dev.redis.host });

module.exports = class RedisDao {

    private static _instance: RedisDao;
    private constructor() {
        console.log('config.get("dev.redis.port") = ', dbConfig.dev.redis.port);
        console.log('config.get("dev.redis.host") = ', dbConfig.dev.redis.host);
    }

    // 取得 redis 單例
    public static getInstance() {
        return this._instance = this._instance || new RedisDao();
    }

    // 對 redis 取得使用者請求次數
    public setUserRequestTime(ip: string, requestTime: number[]) {
        const multi = client.multi();
        const key = `ip:${ip}`;
        multi.del(key)
        multi.rpush(key, requestTime);
        return new Promise((resolve, reject) => {
            multi.exec(function (err, results) {
                if (!err) {
                    resolve(results);
                } else {
                    reject(err);
                }
            })
        });
    }

    // 對 redis 取得使用者請求次數
    async getUserRequesTime(ip: string) {
        return new Promise((resolve, reject) => {
            client.lrange(`ip:${ip}`, 0, -1, (err, results) => {
                if (!err) {
                    resolve(results);
                } else {
                    reject(err);
                }
            })
        });
    }

}