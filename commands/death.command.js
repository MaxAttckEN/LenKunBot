const { Sequelize } = require('sequelize');
const { BaseCommand, CooldownType } = require('./base');
const { Client } = require('tmi.js');

module.exports = class DeathCommand extends BaseCommand {

    /**
     * @param {Client} client 
     * @param {Sequelize} sql 
     */
    constructor(client, sql) {
        super();
        this.modsCanUse = true;
        this.cooldownType = CooldownType.USER;
        this.cooldownInterval = 10;
        this.sql = sql;
        this.client = client;
    }

    /**
     * @param {String} channel 
     * @param {Object} context 
     * @param {Array<String>} args 
     */
    handle(channel, context, args) {
        // Code
        this.sql.models.death.findOrCreate({where: {channel: channel}, defaults: {count: 0}}).then(([result, flag]) => {
            if (args.length == 1) {
                this.client.action(channel, `Death Counter: ${result['count']}`);
            } else if (args.length >= 2) {
                switch(args[1].toLowerCase()) {
                    case 'add':
                        var incr = args.length >= 3 ? ~~args[2] : 1;
                        result.increment('count', { by: incr });
                        this.client.action(channel, `Death Counter: ${result['count'] + incr}`);
                        break;
                    case 'sub':
                        var decr = args.length >= 3 ? ~~args[2] : 1;
                        result.decrement('count', { by: decr });
                        this.client.action(channel, `Death Counter: ${result['count'] - decr}`);
                        break;
                    case "reset":
                        result.update('count', 0);
                        this.client.action(channel, 'Death Counter Has Been Reset');
                    default:
                        break;
                }
            }
        });
    }
}