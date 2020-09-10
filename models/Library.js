const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// define table columns and configuration
Library.init(
  {
    // define an id column
    id: {
      // use the special Sequelize DataTypes object provide what type of data it is
      type: DataTypes.INTEGER,
      // this is the equivalent of SQL's `NOT NULL` option
      allowNull: false,
      // instruct that this is the Primary Key
      primaryKey: true,
      // turn on auto increment
      autoIncrement: true,
    },
    //user_id fk
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    //title
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //author
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //genre
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //picture (type: datatype.string will be link img = src 'from api' )
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: "user",
  }
);

module.exports = Library;
