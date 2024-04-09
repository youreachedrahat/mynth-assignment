import { Lucid } from "https://deno.land/x/lucid@0.8.3/mod.ts";
 
const lucid = await Lucid.new(undefined, "Preview");
 
const privateKey = lucid.utils.generatePrivateKey();
await Deno.writeTextFile("./tests/wallets/depositor.sk", privateKey);
 
const address = await lucid
  .selectWalletFromPrivateKey(privateKey)
  .wallet.address();
await Deno.writeTextFile("./tests/wallets/depositor.addr", address);


const privateKey2 = lucid.utils.generatePrivateKey();
await Deno.writeTextFile("./tests/wallets/imposter.sk", privateKey2);
 
const address2 = await lucid
  .selectWalletFromPrivateKey(privateKey)
  .wallet.address();
await Deno.writeTextFile("./tests/wallets/imposter.addr", address2);