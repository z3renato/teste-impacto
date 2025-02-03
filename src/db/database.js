// @ts-nocheck
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

class Database {
  constructor() {
    if (!Database.instance) {
      this.dbPath = process.env.DB_PATH;

      this.db = new sqlite3.Database(this.dbPath, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.error("Erro ao conectar ao banco:", err.message);
        } else {
          console.log(`Conectado ao banco: ${this.dbPath}`);
        }
      });

      Database.instance = this;
    }
    return Database.instance;
  }

  query(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  insert(table, data) {
    return new Promise((resolve, reject) => {
      const keys = Object.keys(data);
      const values = Object.values(data);
      const placeholders = keys.map(() => "?").join(", ");

      if (keys.length === 0) {
        return reject(new Error("Nenhum dado para inserir"));
      }

      const sql = `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${placeholders})`;

      this.db.run(sql, values, function (err) {
        if (err) {
          if (err.errno == 19) {
            const match = err.message.match(/users\.(\w+)/);
            let errorMessage = match ? match[1] : '';
            errorMessage = errorMessage + ' já existe.'
            reject({ message: errorMessage, error: "Conflito", statusCode: 409 })
          }
          reject({ statusCode: 500, message: err.message, error: err });
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  update(table, data, where) {
    return new Promise((resolve, reject) => {
      const keys = Object.keys(data);
      const values = Object.values(data);

      if (keys.length === 0) {
        return reject(new Error("Nenhum campo para atualizar"));
      }

      const setClause = keys.map(key => `${key} = ?`).join(", ");
      const whereClause = Object.keys(where).map(key => `${key} = ?`).join(" AND ");

      const sql = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
      const params = [...values, ...Object.values(where)];

      this.db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ changes: this.changes });
        }
      });
    });
  }

  select(table, where = {}, columns = ['*']) {
    return new Promise((resolve, reject) => {
      const whereKeys = Object.keys(where);
      const whereClause = whereKeys.length ? "WHERE " + whereKeys.map(key => `${key} = ?`).join(" AND ") : "WHERE deleted_at is null" ;
      const sql = `SELECT ${columns.join(", ")} FROM ${table} ${whereClause}`;
      const params = whereKeys.length ? Object.values(where) : [];

      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async softDelete(table, where, restore = false) {
    const deletedAt = restore ? null : new Date().toISOString();
    return this.update(table, { deleted_at: deletedAt }, where);
  }

  close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          console.log("Conexão fechada");
          resolve();
        }
      });
    });
  }
}

module.exports = new Database();