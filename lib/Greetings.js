const { FiletypeFromUrl,parseJid, extractUrlFromMessage } = require("./functions");
const { getStatus, getMessage } = require("./db/greetings");

async function Greetings(data, conn) {
  const metadata = await conn.groupMetadata(data.id);
  const participants = data.participants;
  for (const user of participants) {
    let userpp;
    try {
      userpp = await conn.profilePictureUrl(user, "image");
    } catch {
      userpp = "https://getwallpapers.com/wallpaper/full/3/5/b/530467.jpg";
    }
var ut_sec = require("os").uptime(); 
  var ut_min = ut_sec/60; 
  var ut_hour = ut_min/60; 
  ut_sec = Math.floor(ut_sec); 
  ut_min = Math.floor(ut_min); 
  ut_hour = Math.floor(ut_hour); 
  ut_hour = ut_hour%60; 
  ut_min = ut_min%60; 
  ut_sec = ut_sec%60; 
  var sec_num = parseInt(process.uptime(), 10);
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);
  var uptime_process = (`Runtime: ${ut_hour} Hour  ${ut_min} minute ${ut_sec} second`)  
     var plk_say = new Date().toLocaleString('HI', { timeZone: 'Asia/Kolkata' }).split(' ')[1]
        const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var jsl = new Date().toLocaleDateString(get_localized_date)
	    var asena = '```⏱ Time :' + plk_say + '```\n```📅 Date :' + jsl + '```'

    switch (data.action) {
      case "add": {
        const status = await getStatus(data.id, "welcome");
        if (!status) return;

        const welcomeMessage = await getMessage(data.id, "welcome");
        let msg = welcomeMessage.message
          .replace(/{mention}/gi, `@${user.split("@")[0]}`)
          .replace(/{group-name}/gi, metadata.subject)
          .replace(/{group-owner}/gi, metadata.owner)
          .replace(/{group-desc}/gi, metadata.desc)
          .replace(/{time}/gi, asena)
          .replace(/{runtime}/gi, uptime_process)          
          .replace(/{count}/gi, metadata.participants.length);        const url = extractUrlFromMessage(msg);

        if (url) {
         
          const {type,buffer} = await FiletypeFromUrl(url);
          if (type === "image" || type === "video") {
            const caption = msg.replace(url, "").trim();

            conn.sendMessage(data.id, {
              [type]: buffer,
              caption: caption,
              mentions: parseJid(msg),
            });
          } else {
            conn.sendMessage(data.id, { text: msg, mentions: parseJid(msg) });
          }
        } else {
          conn.sendMessage(data.id, { text: msg, mentions: parseJid(msg) });
        }
        break;
      }

      case "remove": {
        const status = await getStatus(data.id, "goodbye");
        if (!status) return;

        const goodbyeMessage = await getMessage(data.id, "goodbye");
        let msg = goodbyeMessage.message
          .replace(/{mention}/gi, `@${user.split("@")[0]}`)
          .replace(/{group-name}/gi, metadata.subject)
          .replace(/{group-owner}/gi, metadata.owner)
          .replace(/{group-desc}/gi, metadata.desc)
          .replace(/{time}/gi, asena)
          .replace(/{runtime}/gi, uptime_process)          
          .replace(/{count}/gi, metadata.participants.length);       
          
        const url = extractUrlFromMessage(msg);

        if (url) {
          const {type,buffer} = await FiletypeFromUrl(url);

          if (type === "photo" || type === "video") {
            const caption = msg.replace(url, "").trim();

            conn.sendMessage(data.id, {
              [type]: buffer,
              caption: caption,
              mentions: parseJid(msg),
            });
          } else {
            conn.sendMessage(data.id, { text: msg, mentions: parseJid(msg) });
          }
        } else {
          conn.sendMessage(data.id, { text: msg, mentions: parseJid(msg) });
        }
        break;
      }
    }
  }
}

module.exports = Greetings;
