require("dotenv").config();
const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "ping",
    description: "Pong!",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.CLIENT_TOKEN);

async () => {
  try {
    console.log("Registering Slash Commands");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("Successfully registered Slash Commands");
  } catch (error) {
    console.log(`this is the error: ${error}`);
  }
};
