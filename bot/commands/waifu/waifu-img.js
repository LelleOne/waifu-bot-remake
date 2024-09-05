const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("waifu-img")
    .setDescription("Replies to you with an image")
    .addStringOption((option) =>
      option
        .setName("tag")
        .setDescription("The tag you want to search for")
        .setRequired(true)
        .addChoices([
          { name: "waifu", value: "waifu" },
          { name: "neko", value: "neko" },
          { name: "shinobu", value: "shinobu" },
          { name: "bully", value: "bully" },
          { name: "cuddle", value: "cuddle" },
          { name: "cry", value: "cry" },
          { name: "hug", value: "hug" },
          { name: "awoo", value: "awoo" },
          { name: "kiss", value: "kiss" },
          { name: "lick", value: "lick" },
          { name: "pat", value: "pat" },
          { name: "smug", value: "smug" },
          { name: "bonk", value: "bonk" },
          { name: "blush", value: "blush" },
          { name: "smile", value: "smile" },
          { name: "wave", value: "wave" },
          { name: "highfive", value: "highfive" },
          { name: "handhold", value: "handhold" },
          { name: "nom", value: "nom" },
          { name: "bite", value: "bite" },
          { name: "kick", value: "kick" },
          { name: "happy", value: "happy" },
          { name: "wink", value: "wink" },
          { name: "poke", value: "poke" },
          { name: "dance", value: "dance" },
        ])
    ),

  async execute(interaction) {
    let info;
    const file = interaction.options.getString("tag");

    await fetch(`https://api.waifu.pics/sfw/${file}`)
      .then((response) => response.json())
      .then((data) => {
        info = data;
        console.log(info);
      });

    const pictureEmbed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("file")
      .setURL(info.url)
      .setAuthor({
        name: `${file}`,
        iconURL: `${info.url}`,
        url: `${info.url}`,
      })
      .setImage(`${info.url}`)
      .setTimestamp()
      .setFooter({
        text: "Ello Team",
        iconURL: `${info.url}`,
      });

    await interaction.reply({ embeds: [pictureEmbed] });
  },
};
