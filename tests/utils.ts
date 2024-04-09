import {
    Blockfrost,
    Constr,
    Credential,
    Data,
    Lucid,
    SpendingValidator,
    TxHash,
    fromHex,
    toHex,
  } from "https://deno.land/x/lucid@0.8.3/mod.ts";
import * as cbor from "https://deno.land/x/cbor@v1.4.1/index.js";


import blueprint from '../plutus.json' assert { type: 'json' };

export async function lucidConnect(): Promise<Lucid> {
  const lucid = await Lucid.new(
    new Blockfrost(
      "https://cardano-preview.blockfrost.io/api/v0",
      Deno.env.get("BLOCKFROST_API_KEY"),
    ),
    "Preview",
);
    return lucid;
}

export async function readValidator(): Promise<SpendingValidator> {
    const validator = blueprint.validators[0];
    return {
        type: "PlutusV2",
        script: toHex(cbor.encode(fromHex(validator.compiledCode))),
    };
}



export async function depositor(lucid: Lucid): Promise<{ address: string; paymentCredential?: Credential }> {
    const privateKey = await Deno.readTextFile("./tests/wallets/depositor.sk");
    const address = await lucid
      .selectWalletFromPrivateKey(privateKey)
      .wallet.address();
    const { paymentCredential } = lucid.utils.getAddressDetails(address);
    return { address, paymentCredential };
  }
  
  export function depositDatumValue(paymentCredential: Credential): string {
    const depositDatum = Data.to(new Constr(0, [paymentCredential.hash]));
    return depositDatum;
  }