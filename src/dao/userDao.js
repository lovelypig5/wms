var BaseDao = require('./baseDao'),
    User = require('../model/user');

class UserDao extends BaseDao {

    checkUser(id) {
        return this.model.User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: id
            }
        }).then((user) => {
            if (user) {
                return this.ajaxModel(200, user);
            } else {
                throw new this.ERRORS.NotFound('该用户不存在！');
            }
        });
    }

    login(userName, password) {
        return this.model.User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                name: userName,
                password: password
            }
        }).then((user) => {
            if (user) {
                return this.ajaxModel(200, user);
            } else {
                throw new this.ERRORS.NotFound('用户名或密码错误！');
            }
        });
    }
}

module.exports = new UserDao();
