module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9]+(\s+[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9.!]+(?!@#$%^&*()_+{}|":>?><))*$/,
            msg: 'Product title invalid.',
          },
          len: {
            args: [3, 280],
            msg: `Product title must be between 3 - 280 characters.`,
          },
          notNull: {
            msg: `Product title cannot be empty.`,
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          max: {
            args: 1000000,
            msg: 'Maxiumum price is 1000000.',
          },
          min: {
            args: 1,
            msg: 'Minimum price is 1.',
          },
          notNull: {
            msg: `Product price cannot be empty.`,
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [['Available', 'Unavailable']],
            msg: 'Product status can only be Available or Unavailable.',
          },
          notNull: {
            msg: `Product status cannot be empty.`,
          },
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          max: {
            args: 100,
            msg: 'Maxiumum quantity is 100.',
          },
          min: {
            args: 1,
            msg: 'Minimum quantity is 1.',
          },
          notNull: {
            msg: `Product quantity cannot be empty.`,
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [25, 800],
            msg: `Product description must be between 25 - 800 characters.`,
          },
          notNull: {
            msg: `Product description cannot be empty.`,
          },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      published: {
        type: DataTypes.BOOLEAN,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
    },
    {
      timestamps: true,
    }
  );

  // Product.associate = (models) => {
  //   Product.hasMany(models.Photo, {
  //     foreignKey: 'product_id'
  //   });
  // }

  return Product;
};
