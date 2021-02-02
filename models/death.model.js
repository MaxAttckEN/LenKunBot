const { DataTypes, Sequelize } = require('sequelize');

/**
 * Death Table
 * @param {Sequelize} sequelize 
 */
module.exports = (sequelize) => {
    sequelize.define('death', {
        channel: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING
        },
        count: {
            allowNull: false,
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    });
};