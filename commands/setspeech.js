exports.run = function (client, message, args) {
    const Discord = require('discord.js');
    var guild = message.guild;
    client.logger.log('info', `startspeech command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${message.guild}`)
    const config = client.config;
    const help = new Discord.MessageEmbed()
        .setColor("#f0ffff")
        .setDescription("**Command: **" + `${config.prefix}setspeech`)
        .addField("**Usage:**", `${config.prefix}setspeech <round name> <speech name>`)
        .addField("**Example:**", `${config.prefix}setspeech AF-v-ND 1NC`)
        .addField("**Expected Result From Example:**", "Bot will set the desired speech name into that round.")
        // .addField('**NOTES**', `If the bot pings you with an unsupported speech warning, that means the ${config.prefix}startspeech command and the speech timing function in that command will no longer work. You are in "manual" mode where you have to update the speech using this command yourself.`)
        .addField('**Nested Commands**', `For a list of supported speeches, type ${config.prefix}speeches`)
    if (args.join(' ') === "") {
        message.channel.send({ embed: help })
        return;
    }
    var allowedSpeeches = ["1AC", "CX1", "1NC", "CX2", "2AC", "CX3", "2NC", "CX4", "1NR", "1AR", "2NR", "2AR", "AC", "CX1", "NC", "CX2", "1AR", "NR", "2AR", "Constructive A", "Constructive B", "Crossfire 1", "Rebuttle A", "Rebuttle B", "Crossfire 2", "Summary A", "Summary B", "Grand crossfire", "Final Focus A", "Final Focus B"]

    var roundInfo = client.rounds.get(guild.id + args[0]);
    if (roundInfo === undefined) {
        message.channel.send({ embed: help })
        return;
    }
    var speechInput = args.splice(1).join(" ")
    let contains = false
    for (var i = 0; i < allowedSpeeches.length; i++) {
        if (allowedSpeeches[i] === speechInput) {
            contains = true;
            break;
        }
    }

    if (contains) {
        client.rounds.setProp(guild.id + args[0], "speech", speechInput)
        message.reply(`Supported Speech! :white_check_mark: Speech successfully set to ${speechInput}`)
    } else {
        client.rounds.setProp(guild.id + args[0], "speech", speechInput)
        message.reply(`:warning: Unsupported Speech! :white_check_mark: Speech successfully set to ${speechInput}`)
    }

}