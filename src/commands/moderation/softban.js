const commando = require('discord.js-commando');

module.exports = class SoftbanCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'softban',
            group: 'moderation',
            memberName: 'softban',
            description: 'Softban a specified member/user from the current guild',
            examples: [
                '?softban Kyzegs',
                '?softban @Kyzegs',
                '?softban Kyzegs#7955',
                '?softban 521078823891107861',
                '?softban Kyzegs KABOOM'
            ],
            guildOnly: true,
            clientPermissions: ['BAN_MEMBERS'],
            args: [
                {
                    key: 'user',
                    prompt: 'Choose a member/user who you want to kick from the guild',
                    error: 'Invalid member/user! Please provide a valid member/user',
                    type: 'member|user'
                },
                {
                    key: 'reason',
                    prompt: '',
                    type: 'string',
                    default: '',
                }
            ],
            userPermissions: ['BAN_MEMBERS']
        });
    }
    async run(msg, args) {
        const member = args.user.guild ? args.user : null;
        const user = member ? member.user : args.user;

        if (user.bot || member && msg.member.roles.highest.position <= member.roles.highest.position) {
            return msg.channel.send(`You can't softban **${user.username}#${user.discriminator}**`);
        }

        msg.guild.members.ban(user, {'reason': args.reason})
            .catch(console.error);
        msg.guild.members.unban(user, {'reason': args.reason})
            .then(() =>  msg.channel.send(`Successfully softbanned **${user.username}#${user.discriminator}**`))
            .catch(console.error);
    }
}