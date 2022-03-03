module.exports = (sequelize, DataTypes) => {
  const Page = sequelize.define(
    'Page',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: true,
    }
  );
  return Page;
};
