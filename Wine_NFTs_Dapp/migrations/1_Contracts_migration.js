/*const WineNFTs = artifacts.require("WineNFTs");
const Sensor = artifacts.require("Sensor");

module.exports = function (deployer) {
  deployer.deploy(WineNFTs);
  deployer.deploy(Sensor);

};*/

const Lager = artifacts.require("Lager");

module.exports = function (deployer) {
  deployer.deploy(
    Lager,
    "0x4F6D60e662a3180f9fBa537eAC1d18a1BfA17D82",
    "0x5a30dd8Ba0e31df79616ed3a736986568541F8A8"
  );
};
