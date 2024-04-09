import {
    Constr,
    Credential,
    Data,
    Lucid,
    SpendingValidator,
    TxHash,
    UTxO,
    generatePrivateKey,
    getAddressDetails,
  } from 'https://deno.land/x/lucid@0.10.7/mod.ts';


async function generateRandomAddressDetails(): Promise<{
    address: string;
    paymentCredential?: Credential;
  }> {
    const lucid = await Lucid.new(undefined, 'Preprod');
    const privateKey = await Deno.readTextFile("./wallets/depositor.sk");
    const address = await lucid
      .selectWalletFromPrivateKey(privateKey)
      .wallet.address();
    const { paymentCredential } = getAddressDetails(address);



    
  const depositorPublicKeyHash = lucid.utils.getAddressDetails(
    await lucid.wallet.address()
  ).paymentCredential.hash;


    return { address, paymentCredential };
  }


async function makeDepositDatum() {
    let fn = await generateRandomAddressDetails()
    const depositDatum = Data.to(new Constr(0, [fn.paymentCredential.hash]));
    console.log(depositDatum)
    return depositDatum;
  }


  makeDepositDatum()