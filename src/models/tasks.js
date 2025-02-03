const db = require('../db/database');

const Task = {
  create: (data) => {
    return db.insert("tasks", data);
  },

  findAll: () => {
    return db.select("tasks");
  },

  find: (searchParams) => {
    return db.select("tasks", searchParams);
  },

  update: (id, data) => {
    return db.update("tasks", data, { id });
  },

  softDelete: (id) => {
    return db.softDelete("tasks", { id });
  },

  restore: (id) => {
    return db.softDelete("tasks", { id }, true);
  }
};

module.exports = Task;