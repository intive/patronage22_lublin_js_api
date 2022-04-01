module.exports = (sequelize, DataTypes) => {
  const Page = sequelize.define(
    'Page',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9]+(\s+[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9.!]+(?!@#$%^&*()_+{}|":>?><))*$/,
            msg: 'Page title is incorrect.',
          },
          len: {
            args: [3, 280],
            msg: `Page title must be between 3 - 280 characters.`,
          },
          notNull: {
            mgs: 'Please provide page title.',
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [25, 800],
            msg: `Page description must be between 25 - 800 characters.`,
          },
          notNull: {
            msg: 'Please provide page description.',
          },
        },
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
