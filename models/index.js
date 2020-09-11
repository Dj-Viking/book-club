const User = require("./User.js");
const Group = require("./Group.js");
const Library = require("./Library.js");
/** keep in mind, until we actually put data
 * into the tables themselves with some post routes
 * and/or seeding - the tables wont be created yet
 * inside the databases. But dont worry! this is
 * completely normal behavior for sequelize.
 */

//all table foreign relationships will go in here

User.belongsToMany(Group, {
    foreignKey: 'user_id'
}); 

Group.belongsToMany(User, {
    foreignKey: 'group_id'
}); 

Library.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Group, Library };
