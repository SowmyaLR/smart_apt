var ATContract = artifacts.require("./ATContract.sol");

module.exports = function(deployer) {
  deployer.deploy(ATContract);
};
