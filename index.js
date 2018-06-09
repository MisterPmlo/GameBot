const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");


client.on("ready", () => {
    console.log("Je suis en ligne !");
    client.user.setGame("utilisez |help");
    var channel = client.channels.get('455025625359712262');
    channel.sendMessage({embed: {
      color: 16711680,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      description: "Boup Bip Boup **BOT ONLINE** :robot:",
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "Envoyé"
          }
    }
})
});


client.on("guildMemberAdd", member => {
  const channel = client.channels.get('378871620611211276');
  channel.send(`☻ ▬▬▬▬[And Game Community]▬▬▬▬ ☻ \n

Hey ! Souhaitez tous la bienvenue à ${member} \n 
  
N'oublie pas d'aller voir les #:bookmark_tabs:reglement \n
  
☻ ▬▬▬▬[And Game Community]▬▬▬▬ ☻`);
});





client.on("message", (message) => {


let cont = message.content.slice(config.prefix.length).split(" ");
let args = cont.slice(1);

//============================HELP===============================

  if (message.content.startsWith(config.prefix + 'help')) {
      message.channel.send({embed: {
        color: 16711680,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: "__Liste de nos commandes:__",
        description: "**version**  \n **invite** \n **help**",
        fields: [{
          name: "__Commandes Admins:__",
          value: "**kick** \n **mute** \n **clear**",
        },
          {
            name: "__Préfix de base:__",
            value: "Le préfix de base est **|**"
          }],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "Envoyé"
        }
      }
      })
};


//============================VERSION=============================

if (message.content.startsWith(config.prefix + 'version')) {
    message.channel.send({embed: {
      color: 16056064,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: "__Version du bot:__",
      description: "Le bot est en version **1.0.0**, si vous rencontrez des bugs, merci de me les dire en mp.",
      fields: [{
        name: "__Créateur:__",
        value: "<@261827758584365057>",
      }],
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "Envoyé"
      }
    }
    })
  };

  
//============================DISCORD=============================

if (message.content.startsWith(config.prefix + 'invite')) {
  message.channel.send({embed: {
    color: 65295,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "__L'invite de notre discord:__",
    description: "Hey ! Pour **inviter tes amis** c'est très simple, copie juste ce lien https://discord.gg/zmHvSBM et envoie le à tes amis :yum: !",
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "Envoyé"
    }
  }
  })
};


//============================KICK=============================

if (message.content.startsWith(config.prefix + "kick")) {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(":no_entry: Vous n'avez pas la permission de kick");{
     var member= message.mentions.members.first();
      member.kick().then((member) => {
     message.channel.send(":warning: " + member.displayName + " a bien été kick :ok_hand:");
        }).catch(() => {
         message.channel.send(":no_entry: Vous n'avez pas la permission de kick");
       });
    }
};


//============================MUTE=============================

if (message.content.startsWith(config.prefix + "mute")) {
  if (!message.member.roles.find("name", "bot-admin")) return message.author.sendMessage(":no_entry: Vous n'avez pas la permission de mute");{
   var member= message.mentions.members.first();
   message.channel.send(":warning: " + member.displayName + " a bien été mute :ok_hand:");
   member.addRole("454333065624551425")
        message.author.sendMessage(":no_entry: Vous n'avez pas la permission de mute");
     };
};


//============================CLEAR=============================


if (message.content.startsWith(config.prefix + 'clear')) {
  async function purge() {
      message.delete();
      if (!message.member.roles.find("name", "bot-admin")) {
        message.author.sendMessage('Vous avez besoin du rôle \`bot-admin\` pour utiliser cette commande.');
          return;
      }
      if (isNaN(args[0])) {
          message.channel.send('Merci de mettre un chifre. \n Utilisez: **' + config.prefix + 'clear** <chiffre>');
          return;
      }
      const fetched = await message.channel.fetchMessages({limit: args[0]});
      console.log(fetched.size + ' messages found, deleting...');
      message.channel.bulkDelete(fetched)
  }
  purge();
}












});





client.login(process.env.BOT_TOKEN)
