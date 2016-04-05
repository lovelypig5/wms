var BaseDao = require('./baseDao');

class UserDao extends BaseDao {

    checkUser() {
        return this.query({
            sql: 'select * from user where id = ?',
            parse(rows) {
                if (rows && rows.length > 0) {
                    return rows[0].id;
                }

                return {
                    error: '该用户不存在！'
                }
            }
        });
    }

    login(userName, password) {
        return this.query({
            sql: 'select id, name from user where name = ? and password = ?',
            params: [userName, password],
            parse(rows) {
                if (rows && rows.length > 0) {
                    return rows[0];
                }

                return {
                    error: '用户名或者密码错误！'
                }
            }
        });
    }
}

module.exports = new UserDao;