module.exports = (sequelize, DataTypes) => {
    const ClientTalent = sequelize.define("clienttalents", {

        clientId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        talentId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    );

    return ClientTalent;
};