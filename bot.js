require('dotenv').config();
const tmi = require('tmi.js');
const { Sequelize } = require('sequelize');
const DeathCommand = require('./commands/death.command');
const HeadpatsCommand = require('./commands/headpats.command');
const IQCommand = require('./commands/iq.command');
const SmolCommand = require('./commands/smol.command');
const DelayCommand = require('./commands/delay.command');
const KoiHomeCommand = require('./commands/koihome.command');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './data/db.sqlite',
    logging: false
});

const opts = {
    identity: {
        username: process.env.ACCOUNT,
        password: process.env.OAUTH
    },
    channels: [
    ]
};

const client = new tmi.client(opts);

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

client.connect();

const modelDefiners = [
    require('./models/death.model')
];

for (const modelDefiner of modelDefiners)
    modelDefiner(sequelize);

sequelize.sync();

const commands = {
    '$death': new DeathCommand(client, sequelize),
    '$headpats': new HeadpatsCommand(client),
    '$iq': new IQCommand(client),
    '$smol': new SmolCommand(client),
    '$delay': new DelayCommand(client),
    '$koihome': new KoiHomeCommand(client)
};

function onMessageHandler(target, context, msg, self) {
    if (self) return;
    if (context['username'] !== 'maxattcken') return;

    const commandName = msg.trim();

    if (commandName.charAt(0) === '$') {
        var args = commandName.split(' ');
        if (args[0] in commands)
            commands[args[0]]._handle(target, context, args);
    }
}

function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}

function intervalFunc(){
    for (const key in commands) {
        commands[key]._interval();
    }
}

setInterval(intervalFunc, 1000);
