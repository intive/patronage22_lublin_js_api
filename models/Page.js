module.exports = (sequelize, DataTypes) => {
  const Page = sequelize.define(
    'Page',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      slug: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  );
  return Page;
};
