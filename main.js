const ethers = require("ethers");
const path = require("path");

/// Load config.
const CONFIG = require(path.join(__dirname, "config")); 

/// Load the abis.
const DEPLOYER_ABI = require(path.join(__dirname, "abis", "DeployerABI"));
const PRESALE_ABI  = require(path.join(__dirname, "abis", "PresaleABI"));
const TOKEN_ABI    = require(path.join(__dirname, "abis", "TokenABI"));

/// Ethers stuff.
const Provider = new ethers.providers.WebSocketProvider("wss://bsc-ws-node.nariox.org:443")
const Wallet   = new ethers.Wallet(CONFIG.PrivateKey);
const Account  = Wallet.connect(Provider);

/// Contracts.
const DeployerContract = new ethers.Contract(ethers.utils.getAddress("0xc5fE280422117461af9b953Da413e9627E3b9a40"), DEPLOYER_ABI, Account);

/// Main entry point.
async function main() {
    // Get number of presale owners.
    var numberOfPresaleOwners = await DeployerContract.getNumberOfPresaleOwners();
    console.log(`There are ${numberOfPresaleOwners.toString()} presales in DxLaunch.\n`);

    // Get the last 20 presales.
    for (var i = 1; i < 20 ; i++) {
        var presaleOwnerAddress = await DeployerContract.presaleOwners(numberOfPresaleOwners - i);
        var presaleInfo = await DeployerContract.presales(presaleOwnerAddress);

        var exists = presaleInfo.exists;
        var active = presaleInfo.active;

        if (!exists || !active) continue;

        var presaleAddress = presaleInfo.presaleAddress;
        var tokenAddress = presaleInfo.tokenAddress;

        var tokenContract = new ethers.Contract(ethers.utils.getAddress(tokenAddress), TOKEN_ABI, Account);
        var presaleContract = new ethers.Contract(ethers.utils.getAddress(presaleAddress), PRESALE_ABI, Account);

        var createdOn = new Date(presaleInfo.createdOn * 1000);
        var startTime = new Date(presaleInfo.startTime * 1000);
        var endTime = new Date(presaleInfo.endTime * 1000);
        var timeLeft = endTime - Date.now();

        if (timeLeft <= 0) continue;

        console.log(`┌ Symbol: ${await tokenContract.symbol()}`);
        console.log(`│`);
        console.log(`├ ID: ${numberOfPresaleOwners - i}`);
        console.log(`├ Presale Address: ${presaleAddress}`);
        console.log(`├ Time Left: ${timeLeft / 1000 / 60 / 60} Hours`);
        console.log(`└ Link: https://dxsale.app/app/pages/defipresale?saleID=${numberOfPresaleOwners - i}&chain=BSC\n`);
    }
}

main();