const { Client } = require('tmi.js');
const { BaseCommand, CooldownType } = require('./base');

module.exports = class SmolCommand extends BaseCommand{

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
        this.client.action(channel, 'Mei is approximately 4\'6".  Shorter than Gura');
    }
}