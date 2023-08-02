var config = require("../config");
var commands = [];
function Asena(info, func) {
  var infos = info;
  infos.function = func;
  infos.pattern = new RegExp(`${config.HANDLERS}( ?${info.pattern})`, `is`);
  if (!infos.dontAddCommandList) infos.dontAddCommandList = false;
  if (!infos.fromMe) infos.dontAddCommandList = false;
  if (!info.type) infos.type = "misc";
  commands.push(infos);
  return infos;
}
module.exports = {
  Asena,
  commands,
};
