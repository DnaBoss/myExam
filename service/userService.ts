const RedisDao = require('../model/redis');
const consts = require('../config/consts');
const redisDao = RedisDao.getInstance();

module.exports = class UserService {
    constructor() {

    }
    async setUserRequestTime(ip: string, requestTime: number[]) {
        return await redisDao.setUserRequestTime(ip, requestTime);
    }

    getUserRequesTime(ip: string) {
        return redisDao.getUserRequesTime(ip);
    }

    public filterRequestTime(now: number, requestTimes: number[]) {
        console.log('now = ', now);
        console.log('requestTimes befor filter = ', requestTimes);
        requestTimes = requestTimes.filter(requestTime => now - requestTime < (60 * 1000));
        console.log('requestTimes after filter = ', requestTimes);
        console.log('requestTimes = ', requestTimes.length);
        return requestTimes
    }
}
