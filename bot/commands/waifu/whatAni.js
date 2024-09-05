const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ani-find")
    .setDescription("Find An Anime With Api")
    .addAttachmentOption((option) =>
      option
        .setName("image")
        .setDescription("Upload a file and se what anime it comes from")
        .setRequired(true)
    ),

  async execute(interaction) {
    let results;

    const file = interaction.options.getAttachment("image");

    const media = file.attachment
      ? file.url
      : "https://images.plurk.com/32B15UXxymfSMwKGTObY5e.jpg";

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
