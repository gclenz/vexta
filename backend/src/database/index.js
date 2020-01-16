import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

// Import models
import Cliente from '../app/models/Cliente';
import Municipio from '../app/models/Municipio';

const models = [Cliente, Municipio];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
