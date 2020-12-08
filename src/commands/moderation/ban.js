const commando = require('discord.js-commando');

module.exports = class BanCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            group: 'moderation',
            memberName: 'ban',
            description: 'Ban a specified member/user from the current guild',
            examples: [
                '?ban Kyzegs',
                '?ban @Kyzegs',
                '?ban Kyzegs#7955',
                '?ban 521078823891107861',
                '?ban Kyzegs KABOOM'
            ],
            guildOnly: true,
            clientPermissions: ['BAN_MEMBERS'],
            args: [
                {
                    key: 'user',
                    prompt: 'Choose a member/user who you want to ban from the guild',
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
        const user = member ? args.user.user : args.user

        msg.guild.fetchBan(user)
            .then(({ user }) => msg.channel.send(`**${user.username}#${user.discriminator}** is a previously banned user`))
            .catch(() => {
                if (user.bot || member && msg.member.roles.highest.position <= member.roles.highest.position) {
                    return msg.channel.send(`You can't ban **${user.username}#${user.discriminator}**`);
                }

                msg.guild.members.ban(user, {'reason': args.reason})
                    .then(user => msg.channel.send(`Successfully banned **${user.username}#${user.discriminator}**`))
                    .catch(console.error);
            });
    }
}