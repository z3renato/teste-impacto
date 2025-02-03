const db = require('../db/database');

const User = {
  create: (data) => {
    return db.insert("users", data);
  },

  findAll: () => {
    return db.select("users");
  },

  find: (searchParams) => {
    return db.select("users", searchParams);
  },

  update: (id, data) => {
    return db.update("users", data, { id });
  },

  softDelete: (id) => {
    return db.softDelete("users", { id });
  },

  restore: (id) => {
    return db.softDelete("users", { id }, true);
  }
};

module.exports = User;