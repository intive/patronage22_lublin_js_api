module.exports = (sequelize, DataTypes) => {

    const Category = sequelize.define('Category', {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
      }
    }, {
        timestamps: true
    });
  
    return Category
     
  }