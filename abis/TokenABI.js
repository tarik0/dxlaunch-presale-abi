const ethers = require("ethers");

const TOKEN_ABI = new ethers.utils.Interface([
    "function name() view returns (string)",
    "function symbol() view returns (string)",
]);

module.exports = TOKEN_ABI;