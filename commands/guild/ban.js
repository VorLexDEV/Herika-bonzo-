const { Command } = require('discord.js-commando');

module.exports = class BanCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ban',
      aliases: ['ban-member', 'ban-hammer'],
      memberName: 'ban',
      group: 'guild',
      description: 'Bans a tagged member',
      guildOnly: true,
      userPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
      args: [
        {
          key: 'userToBan',
          prompt: 'What you wanna ban, boi?',
          type: 'string'
        },
        {
          key: 'reason',
          prompt: 'Why are we using the ban hammer again, m8?',
          type: 'string'
        }
      ]
    });
  }

  run(message, { reason }) {
    const user = message.mentions.members.first();
    user
      .ban(reason)
      .then(() => message.say(`Thor just eletrocuted ${user} for: ${reason}`))
      .catch(e => {
        message.say('Something went wrong when trying to ban this user');
        return console.error(e);
      });
  }
};
