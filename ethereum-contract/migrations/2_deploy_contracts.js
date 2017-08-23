var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var Dmarket = artifacts.require("./openmarket_v2.sol");
var event_test = artifacts.require("./eventc.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
  deployer.deploy(Dmarket);
  deployer.deploy(event_test);
};
