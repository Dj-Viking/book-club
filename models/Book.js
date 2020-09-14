const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Book extends Model {}

Book.init
(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    book_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // genre: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    //picture (type: datatype.string will be link img = src 'link from api' )
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: "book",
  }
);

module.exports = Book;