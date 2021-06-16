# How Did I Got That ABI
You can get the compiled bytecode from `bscscan.com` and decompile it with tools like `ethervm.io`. After that It's a kinda a guess work.

# How Can I Get The Dev. Wallet Address of The Token ?
Don't let the name `owner()` fool you, that's the address of the contract that created that presale contract.
The function that you are looking for is the `wallet()` function. It returns the address of the token's developer's wallet.

# DxLaunch Presale Contract ABI

```js
const ethers = require("ethers");

var PRESALE_ABI = new ethers.utils.Interface([
        "function owner() view returns (address)",
        "function wallet() view returns (address)",
        "function token() view returns (address)",
        "function vault() view returns (address)",
        "function hasClosed() view returns (bool)",
        "function initialized() view returns (bool)",
        "function cap() view returns (uint256)",
        "function goal() view returns (uint256)",
        "function rate() view returns (uint256)",
        "function weiRaised() view returns (uint256)",
        "function capReached() view returns (bool)",
        "function openingTime() view returns (uint256)",
        "function closingTime() view returns (uint256)",
        "function presaleStartTime() view returns (uint256)",
        "function presaleEndTime() view returns (uint256)",
        "function minEthContribution() view returns (uint256)",
        "function maxEthContribution() view returns (uint256)"
]);

/*
 * Contract Creation Example;
 * let presaleContract = new ethers.Contract(ethers.utils.getAddress("0x..."), PRESALE_ABI, ACCOUNT);
 */
```
