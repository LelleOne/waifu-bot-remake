const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ani-find")
    .setDescription("Find An Anime With Api")
    // lägger till där man får bilden
    .addAttachmentOption((option) =>
      option
        .setName("image")
        .setDescription("Upload a file and se what anime it comes from")
        .setRequired(true)
    ),

  async execute(interaction) {
    let results;

    const file = interaction.options.getAttachment("image");

    // sätter så att det finns en fail safe bild även ifall det tekniskt sätt inte skall gå
    const media = file.attachment
      ? file.url
      : "https://images.plurk.com/32B15UXxymfSMwKGTObY5e.jpg";

    // kollar bara hur många gånger api'n har använts så dett finn sen limit på detta
    await fetch("https://api.trace.moe/me")
      .then((e) => e.json())
      .then((data) => {
        console.log(data.quotaUsed);
      });

    await fetch(
      `https://api.trace.moe/search?anilistInfo&url=${encodeURIComponent(
        media
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        results = data;
      });

    // kollar ifall den engelska titeln och den japanska titeln är samma då jag inte vill repetera den ifall dem e det
    if (
      results &&
      results.result.length > 0 &&
      results.result[0].anilist.title.romaji !=
        results.result[0].anilist.title.english
    ) {
      await interaction.reply(
        `This is from episode ${results.result[0].episode} of "${results.result[0].anilist.title.romaji}" aka "${results.result[0].anilist.title.english}" https://anilist.co/anime/${results.result[0].anilist.id}.`
      );
    } else if (
      results &&
      results.result.length > 0 &&
      results.result[0].anilist.title.romaji ===
        results.result[0].anilist.title.english
    ) {
      await interaction.reply(
        `This is from episode ${results.result[0].episode} of "${results.result[0].anilist.title.english}" https://anilist.co/anime/${results.result[0].anilist.id}.`
      );
    } else {
      await interaction.reply("No results found.");
    }
  },
};
