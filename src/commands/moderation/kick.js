const commando = require('discord.js-commando');

module.exports = class KickCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            aliases: ['boot'],
            group: 'moderation',
            memberName: 'kick',
            description: 'Kick a specified member from the current guild',
            examples: [
                '?kick Kyzegs',
                '?kick @Kyzegs',
                '?kick Kyzegs#7955',
                '?kick 521078823891107861',
                '?kick Kyzegs KABOOM'
            ],
            guildOnly: true,
            clientPermissions: ['KICK_MEMBERS'],
            args: [
                {
                    key: 'member',
                    prompt: 'Choose a member who you want to kick from the guild',
                    error: 'Invalid member! Please provide a valid member',
                    type: 'member|user'
                },
                {
                    key: 'reason',
                    prompt: '',
                    type: 'string',
                    default: '',
                }
            ],
            userPermissions: ['KICK_MEMBERS']
        });
    }
    async run(msg, args) {
        const member = args.member.guild ? args.member : null;
        const user = member ? member.user : args.member

        if (member === null) {
            return msg.channel.send(`**${user.username}#${user.discriminator}** is not in this guild`)
        }

        if (user.bot || member && msg.member.roles.highest.position <= member.roles.highest.position) {
            return msg.channel.send(`You can't kick **${user.username}#${user.discriminator}**`);
        }

        member.kick(user, {'reason': args.reasion})
            .then(() => msg.channel.send(`Successfully kicked **${user.username}#${user.discriminator}**`))
            .catch(console.error);
    }
}