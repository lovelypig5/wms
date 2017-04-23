var logger = require('./logger');

class TokenStore {

    constructor() {
        this.tokens = [];
        this.users = [];
    }

    addToken(token, user) {
        if (this.tokens.length == this.users.length) {
            this.tokens.push(token);
            this.users.push(user);
        } else {
            logger.error('系统发生错误，tokens 和 users 长度不相同');
        }
    }

    deleteToken(token) {
        var index = -1;
        if (token && (index = this.tokens.indexOf(token)) != -1) {
            this.tokens.splice(index, 1);
            this.users.splice(index, 1);
        } else {
            ogger.error('系统发生错误，需要删除的token不存在');
        }
    }

    hasToken(token) {
        return (token && this.tokens.indexOf(token) != -1);
    }

    getUser(token) {
        var index = this.tokens.indexOf(token);
        if (index != -1) {
            return this.users[index];
        }
    }

}

module.exports = new TokenStore();
