const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Pong"),

  async execute(interaction) {
    try {
      console.log(
        `Executing ping command for interaction ID: ${interaction.id}`
      );
      await interaction.reply("Pong!");
    } catch (error) {
      console.error(`Error executing ping command: ${error.message}`);
      await interaction.reply({
        content: "An error occurred while processing your request.",
        ephemeral: true,
      });
    }
  },
};
