const WineNFTs = artifacts.require("WineNFTs");

module.exports = function (deployer) {
  deployer.deploy(WineNFTs);
};
