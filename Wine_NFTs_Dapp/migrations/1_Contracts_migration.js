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
    "0xD91d7FA166b709adF13e78Ed0Aa8Bd018177bFCe",
    "0x309c07826EE9Fd19e1533b0f279909d8dC850b3E"
  );
};
