var Migrations = artifacts.require("./Office.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};