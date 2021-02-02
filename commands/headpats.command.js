const { Client } = require('tmi.js');
const { BaseCommand, CooldownType } = require('./base');

module.exports = class HeadpatsCommand extends BaseCommand{

    /**
     * @param {Client} client 
     */
    constructor(client) {
        super();
        this.client = client;
        this.cooldownType = CooldownType.USER;
        this.cooldownInterval = 10;
    }

    /**
     * @param {String} channel 
     * @param {Object} context 
     * @param {Array<String>} args 
     */
    handle(channel, context, args) {
        this.client.action(channel, `${context['display-name']} sends all the headpats!!`);
    }
}