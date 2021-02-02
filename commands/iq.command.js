const { Client } = require('tmi.js');
const { BaseCommand, CooldownType } = require('./base');

module.exports = class IQCommand extends BaseCommand{

    /**
     * @param {Client} client 
     */
    constructor(client) {
        super();
        this.client = client;
        this.cooldownType = CooldownType.GLOBAL;
        this.cooldownInterval = 10;
    }

    /**
     * @param {String} channel 
     * @param {Object} context 
     * @param {Array<String>} args 
     */
    handle(channel, context, args) {
        this.client.action(channel, 'Mei has 125 IQ');
    }
}