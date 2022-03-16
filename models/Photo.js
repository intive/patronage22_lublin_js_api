const Product = require('./Product');

module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define(
    'Photo',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
      },
      url: {
        type: DataTypes.TEXT,
      },
      active: {
        type: DataTypes.BOOLEAN,
      },
      main_photo: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      timestamps: true,
    }
  );

  // Photo.associate = (models) => {
  //   Product.belongsTo(models.Product, {
  //     foreignKey: 'product_id',
  //   });
  // };

  return Photo;
};
