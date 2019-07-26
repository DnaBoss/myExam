const RedisDao = require('../model/redis');
const consts = require('../config/consts');
const redisDao = RedisDao.getInstance();

module.exports = class UserService {
    constructor() {

    }

    // 記錄使用者每分鐘請求次數
    async setUserRequestTime(ip: string, requestTime: number[]) {
        return await redisDao.setUserRequestTime(ip, requestTime);
    }

    // 取得使用者最近一分鐘請求次數
    public getUserRequesTime(ip: string) {
        return redisDao.getUserRequesTime(ip);
    }

    // 把超過最近一分鐘前的記錄過濾掉
    public filterRequestTime(now: number, requestTimes: number[]) {
        return requestTimes.filter(requestTime => now - requestTime < (60 * 1000));
    }
}
