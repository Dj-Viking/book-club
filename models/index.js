const User = require("./User.js");
const Club = require("./Club.js");
const Library = require("./Library.js");
const Book = require('./Book.js')
const Bulletin = require('./Bulletin.js');
/** keep in mind, until we actually put data
 * into the tables themselves with some post routes
 * and/or manually seeding at server start up - the tables wont be created yet
 * inside the databases. But dont worry! this is
 * completely normal behavior for sequelize.
 */

//all table foreign relationships will go in here

Book.belongsToMany(User, {
    through: Library,
    foreignKey: 'book_id'
});
User.belongsToMany(Book, {
    through: Library,
    foreignKey: 'user_id'
});

Club.hasMany(User, {
    // through: Bulletin,
    foreignKey: 'club_id',
    //constraints: false
});
User.belongsTo(Club, {
    // through: Bulletin,
    foreignKey: 'club_id',
    //constraints: false
});

module.exports = { User, Club, Library, Book, Bulletin };