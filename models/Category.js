module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9.!?-]+(\s+[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9.!?-]+(?!@#$%^&*()_+{}|":>?><))*$/,
            msg: 'Category title is incorrect.',
          },
          len: {
            args: [3, 280],
            msg: `Category title must be between 3 - 280 characters.`,
          },
          notNull: {
            mgs: 'Please provide category title',
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [25, 800],
            msg: `Category description must be between 25 - 800 characters.`,
          },
          notNull: {
            msg: 'Please provide category description.',
          },
        },
      },
    },
    {
      timestamps: true,
    }
  );
  return Category;
};
