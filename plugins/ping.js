const { Asena, isPublic } = require("../lib/");

Asena(
  {
    pattern: "ping",
    fromMe: isPublic,
    desc: "Show your bot performance",
    type: "user",
  },
  async (message, match) => {
    const start = new Date().getTime();
    await message.reply("_Testing Bot Ping");
    const end = new Date().getTime();
    return await message.reply(
      "_*Response At" + (end - start) + " ms*_"
    );
  }
);
