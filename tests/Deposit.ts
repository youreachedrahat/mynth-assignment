import {
  readValidator,
  lucidConnect,
  depositor,
  depositDatumValue,
} from "./utils.ts";


const lucid = await lucidConnect();


const validator = await readValidator();

export async function depositTX() {
  const scriptAddress = await lucid.utils.validatorToAddress(validator);
  const { address, paymentCredential } = await depositor(lucid);
  const depositDatum = depositDatumValue(paymentCredential!);

  const tx = await lucid
  .newTx()
  .payToContract(scriptAddress, { inline: depositDatum }, {
    lovelace: 20000000n,
  })
  .complete();

const signedTx = await tx.sign().complete();

const txHash = await signedTx.submit();
  return txHash;
}


// const Tx = await depositTX()
// console.log("Transaction Hash",Tx)
