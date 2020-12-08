const Commando = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const config = require('./config');

const client = new Commando.Client({
    owner: config.owner,
    commandPrefix: config.commandPrefix,
});

client
    .on('error', console.error)
    .on('ready', () => {
        console.log(`Logged in as ${client.user.username}#${client.user.discriminator}`);
        console.log(`Using version ${Commando.version} of Commando (discord.js command framework)`);
    })

client.setProvider(
    sqlite.open({
        filename: path.join(__dirname, 'settings.sqlite3'),
        driver: sqlite3.Database
    }).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);

client.registry
    .registerGroups([
        ['admin', 'Administration'],
        ['moderation', 'Moderation']
    ])
	.registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.login(config.token);