const moduleList = require(`../../../LOCATION/TARGET_NAME.json`); //change this to items.json

function findModule(nameKey) {
  for (var i = 0; i < moduleList.length; i++) {
    for (var j = 0; j < moduleList[i].items.length; j++) {
      if (moduleList[i].module[j].title === nameKey) {
        return moduleList[i].module[j];
      }
    }
  }
}

module.exports = findModule
