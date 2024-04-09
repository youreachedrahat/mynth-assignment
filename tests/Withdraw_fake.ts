// lucid
// publickey has
// script address
// transaction

import { readValidator, lucidConnect, depositor, depositDatumValue } from "./utils.ts";
import { Data } from "https://deno.land/x/lucid@0.10.7/mod.ts";

const lucid = await lucidConnect();

const validator = await readValidator();

const privateKey = await Deno.readTextFile("./tests/wallets/imposter.sk");
    const address = await lucid
      .selectWalletFromPrivateKey(privateKey)
      .wallet.address();

export async function withdrawFake(utxo: string) {
  // const utxo: OutRef = { txHash: Deno.args[0], outputIndex: 0 };
  const scriptAddress = await lucid.utils.validatorToAddress(validator);
  // const depositDatum = depositDatumValue(paymentCredential!);
  const scriptUtxo = await lucid.utxosAt(scriptAddress);
  const utxoSearch = scriptUtxo.find((e) => e.txHash == utxo);

  if (utxoSearch) {
    const tx = await lucid
      .newTx()
      .collectFrom([utxoSearch], Data.void())
      .addSigner(address)
      .attachSpendingValidator(validator)
      .complete();

    const signedTx = await tx.sign().complete();

    const txHash = await signedTx.submit();
    return txHash;
  } else {
    return "Deposit Tx Not Found";
  }
};

// const Tx = await withdrawFake("f23968a8bc4bb25e69938e94b4b8b3fc81e51a430bd9a2a81f59d078a514048b");
// console.log("Withdrawal Transaction:", Tx);
