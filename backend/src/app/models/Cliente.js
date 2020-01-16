import Sequelize, { Model } from 'sequelize';

class Cliente extends Model {
  static init(sequelize) {
    super.init(
      {
        documento: Sequelize.STRING,
        nome: Sequelize.STRING,
        endereco: Sequelize.STRING,
        municipio_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Municipio, {
      foreignKey: 'municipio_id',
      as: 'municipio',
    });
  }
}

export default Cliente;
