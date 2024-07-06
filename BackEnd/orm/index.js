const { Sequelize, DataTypes } = require('sequelize');
const config = require('config');

//Created a Sequelize instance and passed the appropriate parameters separately,
//database, user and password fields coming from the config files.
const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

//Create and export a db object which holds the sequelize models,
//with the respective associations.

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Client = require('./client.model')(sequelize, DataTypes)
db.Freelance= require('./freelancer.model')(sequelize, DataTypes)
db.Talent = require('./talents.model')(sequelize, DataTypes)

db.Freelance.hasMany(db.Talent, {
    foreignKey: "freelancer_id",
});

db.Talent.belongsTo(db.Freelance, {
    as: "freelancer",
    foreignKey: "freelancer_id",
    onDelete: "CASCADE",
});


db.Client.belongsToMany(db.Talent, { through: 'ClientTalent' });
db.Talent.belongsToMany(db.Client, { through: 'ClientTalent' });

db.sequelize
    .authenticate()
    .then(() => console.log("Connection has been established successfully."))
    .catch((err) => console.error("Unable to connect to the database:", err));
/*sequelize.sync({force: true}).then(()=> {
    console.log('db sync'); })*/




module.exports = db;


