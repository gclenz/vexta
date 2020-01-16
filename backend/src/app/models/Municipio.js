import Sequelize, { Model } from 'sequelize';

class Municipio extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        uf: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Municipio;
