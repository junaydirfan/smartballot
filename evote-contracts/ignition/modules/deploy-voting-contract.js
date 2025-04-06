const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("VotingContractDeployment", (m) => {
  const votingContract = m.contract("VotingContract", [m.getAccount(0)]);

  return { votingContract };
});