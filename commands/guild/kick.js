const { Command } = require('discord.js-commando');

module.exports = class KickCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'kick',
      aliases: ['kick-member', 'throw'],
      memberName: 'kick',
      group: 'guild',
      description: 'Kicks a tagged member',
      guildOnly: true,
      userPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
      args: [
        {
          key: 'userToKick',
          prompt: 'Kickin who, nerd?',
          type: 'string'
        },
        {
          key: 'reason',
          prompt: 'Why Kickin ze user, nerf?',
          type: 'string'
        }
      ]
    });
  }

  run(message, { reason }) {
    const user = message.mentions.members.first();
    user
      .kick(reason)
      .then(() => message.say(`Kicked ${user} for: ${reason}`))
      .catch(e => {
        message.say('Something went wrong when trying to kick this user');
        return console.error(e);
      });
  }
};
