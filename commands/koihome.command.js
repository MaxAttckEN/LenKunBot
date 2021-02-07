const { Client } = require('tmi.js');
const { BaseCommand, CooldownType } = require('./base');

module.exports = class KoiHomeCommand extends BaseCommand{

    /**
     * @param {Client} client 
     */
    constructor(client) {
        super();
        this.client = client;
        this.cooldownType = CooldownType.GLOBAL;
        this.cooldownInterval = 10;
        this.modsCanUse = true;
        this.houses = {
            "swamp": `Keiko's Swamp Home Coordinates: X: 341, Z: 319`,
            "cave": `Keiko's Cave Home Coordinates: X: -208, Z: -264`
        };
    }

    /**
     * @param {String} channel 
     * @param {Object} context 
     * @param {Array<String>} args 
     */
    handle(channel, context, args) {
        this.client.action(channel, (args.length >= 2 && args[1] in this.houses) ? this.houses[args[1]] : this.houses["swamp"] );
    }
}