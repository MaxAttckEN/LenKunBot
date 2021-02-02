const { BaseCommand } = require("./base");
const { Client } = require('tmi.js');
const { min } = require("lodash");

module.exports = class DelayCommand extends BaseCommand {

    /**
     * 
     * @param {Client} client 
     */
    constructor(client) {
        super();
        this.client = client;
        this.flag = {};
        this.startTime = {};
        this.modsCanUse = true;
    }

    /**
     * @param {String} channel 
     * @param {Object} context 
     * @param {Array<String>} args 
     */
    handle(channel, context, args) {
        if (channel in this.flag && this.flag[channel]) {
            this.stopTimer(channel);
        } else {
            this.startTimer(channel);
        }
    }

    /**
     * 
     * @param {String} channel 
     */
    startTimer(channel) {
        this.flag[channel] = true;
        this.startTime[channel] = Date.now();
        this.client.action(channel, `Calculating Delay...  HI ${channel.replace('#', '@')}!!`);
    }

    stopTimer(channel) {
        this.flag[channel] = false;
        var delay = Date.now() - this.startTime[channel];
        this.client.action(channel, `Delay Calculated  ${this.convertDelay(delay)}`);
    }

    convertDelay(delay) {
        var totalSeconds = Math.trunc(delay / 1000);
        var minutes = Math.trunc(totalSeconds / 60);
        var seconds = totalSeconds % 60;

        return `${minutes}m ${seconds}s`;
    }
}