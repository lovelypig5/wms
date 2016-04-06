var BaseDao = require('./baseDao');

class GoodsDao extends BaseDao {

    search(user_id, name) {
        return this.query({
            sql: 'select g.id, g.name from goods g \
                    left join r_user_goods rug on rug.goods_id = g.id \
                    where rug.user_id = ? and g.name like ? ',
            params: [user_id, '%' + name + '%']
        })
    }

    list(user_id) {
        var sql = 'select g.* from goods g \
                    left join r_user_goods r on r.goods_id = g.id \
                    where r.user_id = ?';
        return this.query({
            sql: sql,
            params: user_id,
            parse(rows) {
                return {
                    count: 5,
                    content: rows
                };
            }
        })
    }

    detail(id, user_id) {
        return this.query({
            sql: 'select g.id, g.name, g.count as total from goods g \
                    left join r_user_goods rug on g.id = rug.goods_id \
                    where g.id = ? and rug.user_id = ?',
            params: [id, user_id],
            parse(rows) {
                if (rows && rows.length > 0) {
                    var good = rows[0];
                    var ret = {
                        id: good.id,
                        name: good.name,
                        total: good.total,
                        list: []
                    }
                    return ret;
                } else {
                    return {
                        error: '不存在该商品'
                    };
                }
            }
        }, {
            sql: 'select g_a.attr, g_a.count from goods_attrs g_a \
                left join goods g on g_a.goods_id = g.id \
                left join r_user_goods rug on g.id = rug.goods_id \
                where g.id = ? and rug.user_id = ?',
            params: [id, user_id],
            parse(rows, data) {
                if (rows && rows.length > 0) {
                    data.list = rows;
                }

                return data;
            }
        })
    }

    create(name, attrs, user_id) {
        var querys = [{
            sql: 'select g.id from goods g left join r_user_goods r on r.goods_id = g.id where r.user_id = ? and g.name = ?',
            params: [user_id, name],
            parse(rows) {
                if (rows.length > 0) {
                    return {
                        error: '商品已经存在'
                    }
                }

                return rows
            }
        }, {
            sql: 'insert into goods (`name`) values (?)',
            params: [name]
        }, {
            sql: 'insert into r_user_goods (`user_id`, `goods_id`) values (?, ?)',
            params(result) {
                return [user_id, result.insertId];
            },
            parse(result, data) {
                return data;
            }
        }];

        if (attrs.length > 0) {
            attrs.forEach((attr) => {
                querys.push({
                    sql: 'insert into r_user_goods_attr (`user_id`, `attr`,`goods_id`) values (?, ?, ?)',
                    params(result) {
                        return [user_id, attr, result.insertId];
                    },
                    parse(result, data) {
                        return data
                    }
                })
            })
        }

        return this.queryWithTransaction(...querys);
    }

    inlist(user_id, type) {
        return this.query({
            sql: 'select g_r.*, g.name from goods_records g_r left join goods g on g.id = g_r.goods_id where g_r.user_id = ? and type = ?',
            params: [user_id, type],
            parse(rows) {
                return {
                    count: 5,
                    content: rows
                }
            }
        })
    }

    out(id, amount, price, attr, user_id) {
        var querys = [{
            sql: 'select g.* from goods g left join r_user_goods r on r.goods_id = g.id where r.user_id = ? and g.id = ?',
            params: [user_id, id],
            parse(rows) {
                if (rows && rows.length > 0) {
                    var good = rows[0];
                    if (good.count < amount) {
                        return {
                            error: '库存不足'
                        }
                    }
                    return good;
                }

                return {
                    error: '不存在该商品'
                }
            }
        }, {
            sql: 'update goods set count = count - ? where id = ?',
            params: [amount, id]
        }, {
            sql: 'insert into `goods_records` (`goods_id`, `user_id`, `goods_attr`, `price`, `amount`, `type`) VALUES (?,?,?,?,?,1)',
            params: [id, user_id, attr, price, amount]
        }];

        if (attr) {
            Array.prototype.push.apply(querys, [{
                sql: 'select * from goods_attrs where attr = ? and goods_id = ?',
                params: [attr, id],
                parse(rows) {
                    if (rows && rows.length > 0) {
                        var good = rows[0];
                        if (good.count < amount) {
                            return {
                                error: attr + ':该类商品库存不足'
                            }
                        }
                        return good;
                    }

                    return {
                        error: '不存在该商品属性' + attr
                    }
                }
            }, {
                sql: 'update goods_attrs set count = count - ? where attr = ? and goods_id = ?',
                params: [amount, attr, id],
                parse(result) {
                    if (result) {
                        if (result.changedRows == 1) {
                            return {}
                        } else if (result.changedRows == 0) {
                            return {
                                error: '不存在该商品属性' + attr
                            }
                        } else {
                            return {
                                error: '数据错误，请联系管理员'
                            }
                        }
                    }
                }
            }])
        }

        return this.queryWithTransaction(...querys);
    }

    in(id, amount, price, attr, user_id) {
        var querys = [{
            sql: 'select g.* from goods g left join r_user_goods r on r.goods_id = g.id where r.user_id = ? and g.id = ?',
            params: [user_id, id],
            parse(rows) {
                if (rows && rows.length > 0) {
                    return rows[0];
                }

                return {
                    error: '不存在该商品'
                }
            }
        }, {
            sql: 'update goods set count = ? where id = ?',
            params(good) {
                return [good.count + amount, id]
            }
        }, {
            sql: 'insert into `goods_records` (`goods_id`, `user_id`, `goods_attr`, `price`, `amount`) VALUES (?,?,?,?,?)',
            params: [id, user_id, attr, price, amount]
        }];

        if (attr) {
            Array.prototype.push.apply(querys, [{
                sql: 'update goods_attrs set count = count + ? where attr = ? and goods_id = ?',
                params: [amount, attr, id],
                parse(result) {
                    if (result) {
                        if (result.changedRows == 1) {
                            return {
                                error: true
                            }
                        } else if (result.changedRows == 0) {
                            return {}
                        } else {
                            return {
                                error: '数据错误，请联系管理员'
                            }
                        }
                    }
                }
            }, {
                sql: 'insert into `goods_attrs` (`goods_id`, `count`, `attr`) VALUES (?,?,?)',
                params: [id, amount, attr],
                parse(result) {
                    return {
                        id: result.insertId
                    }
                }
            }])
        }

        return this.queryWithTransaction(...querys);
    }

    attrs(user_id, goods_id) {
        return this.query({
            sql: 'select r.attr from r_user_goods_attr r where user_id = ? and goods_id = ?',
            params: [user_id, goods_id],
            parse(rows) {
                if (rows && rows.length > 0) {
                    return rows;
                } else {
                    return [];
                }
            }
        })
    }

    addAttr(user_id, goods_id, attr) {
        return this.queryWithTransaction({
            sql: 'insert into r_user_goods_attr (`user_id`, `goods_id`, `attr`) values (?, ?, ?)',
            params: [user_id, goods_id, attr],
            parse(rows) {
                return rows;
            }
        });
    }

    attrlist(user_id, goods_id) {
        return this.query({
            sql: 'select ga.attr from goods_attrs ga left join r_user_goods rug on rug.goods_id = ga.goods_id where rug.user_id = ? and ga.goods_id = ?',
            params: [user_id, goods_id],
            parse(rows) {
                if (rows && rows.length > 0) {
                    return rows;
                } else {
                    return [];
                }
            }
        })
    }
}

module.exports = new GoodsDao;