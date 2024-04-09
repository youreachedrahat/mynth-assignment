// lucid
// publickey has
// script address
// transaction

import { readValidator, lucidConnect, depositor } from "./utils.ts";
import { Data } from "https://deno.land/x/lucid@0.10.7/mod.ts";

const lucid = await lucidConnect();

const validator = await readValidator();

export async function withdraw(utxo: string) {
  // const utxo: OutRef = { txHash: Deno.args[0], outputIndex: 0 };
  const scriptAddress = await lucid.utils.validatorToAddress(validator);
  const { address, paymentCredential } = await depositor(lucid);
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

// const Tx = await withdraw();
// console.log("Withdrawal Transaction:", Tx);
