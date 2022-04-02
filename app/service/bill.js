'use strict';

const Service = require('egg').Service;

class BillService extends Service {
  async add(params) {
    const { ctx, app } = this;
    try {
      // 往 bill 表中，插入一条账单数据
      const result = await app.mysql.insert('bill', params);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // 获取账单列表
  async list(id) {
    const { ctx, app } = this;
    const QUERY_STR = 'b.id, b.user_id, amount, date, label_id, remarks, name, type';
    let sql = `select ${QUERY_STR} from bill b left join label l on b.label_id = l.id where b.user_id = ${id}`;
    try {
      const result = await app.mysql.query(sql);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async detail(id, user_id) {
    const { ctx, app } = this;
    const QUERY_STR = 'b.id, b.user_id, amount, date, label_id, remarks, name, type';
    let sql = `select ${QUERY_STR} from bill b left join label l on b.label_id = l.id where b.id = ${id}`;
    try {
      //返回对象
      //const result = await app.mysql.get('bill', { id, user_id });
      //返回数组
      const result = await app.mysql.query(sql);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(params) {
    const { ctx, app } = this;
    try {
      let result = await app.mysql.update('bill', {
        ...params,
      }, {
        id: params.id,
        user_id: params.user_id,
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete(id, user_id) {
    const { ctx, app } = this;
    try {
      let result = await app.mysql.delete('bill', {
        id,
        user_id,
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = BillService;
