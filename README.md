# How Did I Got That ABI
~~You can get the compiled bytecode from `bscscan.com` and decompile it with tools like `ethervm.io`. After that It's a kinda a guess work. Also this ABI does not support every function in the presale contract. Feel free to contirbute.~~

At first I was decompiling the contract but after I've inspect the DxSale website, I have extracted the ABI's that DxSale contracts use.

# How Can I Get The Dev. Wallet Address of The Token ?
Don't let the name `owner()` fool you, that's the address of the contract that created that presale contract.
The function that you are looking for is the `wallet()` function. It returns the address of the token's developer's wallet.

# DxLaunch Presale Contract ABI

```js
const ethers = require("ethers");
const path = require("path");

/// Load the abis.
const PRESALE_ABI  = require(path.join(__dirname, "abis", "PresaleABI"));

/*
 * Contract Creation Example;
 * let presaleContract = new ethers.Contract(ethers.utils.getAddress("0x..."), PRESALE_ABI, ACCOUNT);
 */
```
