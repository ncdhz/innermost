import NeDB from 'nedb'

export class NeDBOperation {
  db: NeDB | undefined

  constructor(db: NeDB) {
    this.db = db
  }

  /**
   * 给数据库操作方法加入到 Promise 中
   */
  private addPromise(func: Function, ...args: any[]) {
    return new Promise((resolve, reject) => {
      args.push((err: any, data: any) => {
        if (resolve) {
          resolve(data)
        } else {
          reject(err)
        }
      })
      func.apply(this.db, args)
    })
  }

  // 插入数据
  insert(doc: string | number | boolean | Date | null | Array<string | number | boolean | Date | null | object | undefined> | object | undefined) {
    return this.addPromise((this.db?.insert as Function), doc)
  }

  // 找到数据
  find(query: object) {
    return this.addPromise((this.db?.find as Function), query)
  }

  // 找到一条数据
  findOne(query: object) {
    return this.addPromise((this.db?.findOne as Function), query)
  }

  // 更新数据
  update(query: object, update: object, options: object) {
    return this.addPromise((this.db?.update as Function), query, update, options)
  }

  // 删除数据
  remove(query: object, options: object) {
    return this.addPromise((this.db?.remove as Function), query, options)
  }

  // 索引
  ensureIndex(options: object) {
    return this.addPromise((this.db?.ensureIndex as Function), options)
  }

  // 统计
  count(query: object) {
    return this.addPromise((this.db?.count as Function), query)
  }
}
