# Mynth Aiken

validator that allow the deposit of ada and can only be withdrawn by the depositor


## Setup
 
Clone  this repository: 
```sh 
git clone https://github.com/youreachedrahat/mynth-assignment
cd mynth-assignment 
```

To build aiken smart contract, run following command.
```sh
aiken Build
```

### testing Validator
You need to have `Blockfrost API`
```sh
export BLOCKFROST_API=your_blockfrost_api_key
```

Generate wallet Credential
```sh
Deno task wallets
```
add test add from `https://docs.cardano.org/cardano-testnets/tools/faucet/` in `depositor.sk`




#### Run Testing
```sh
Deno task test:deposit
```
to check deposit  functionality


```sh
Deno task test:withdraw -- <tx Hash>
```
Replace `<tx Hash>` with your withdraw transaction id



# Learning Experience
the `Datum`, `Redeemer` and `e-utxo` is the key points/components for understanding the cardano ecosystem.

Found this site usefull

[Cardano Developer Hub](https://developers.cardano.org/) understanding  the basics of Cardano and its ecosystem

`https://aiken-lang.org/language-tour/*`
`https://aiken-lang.github.io/stdlib/`
`https://piefayth.github.io/blog/pages/aiken1/`
Understanding how AIken works and the basic standard library


`https://docs.deno.com/runtime/manual/basics/testing/`
How Deno handle testing and different assertions