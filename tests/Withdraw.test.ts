import {
  assertEquals,
  assertMatch,
} from "https://deno.land/std@0.221.0/assert/mod.ts";
// import { depositTX } from "./Deposit.tsx";
import { withdraw } from "./Withdraw.ts";
import { withdrawFake } from "./Withdraw_fake.ts";

const utxo = Deno.args[0] || "";
// const address = Deno.args[1] || "";
const regex = /^[\da-f]{64}$/;

// Deno.test("Deposit", async () => {
//   const tx = await depositTX();
//   assertMatch(tx, regex);
// });

Deno.test("Withdraw Imposter", async () => {
  const txFake = await withdrawFake(utxo);
  assertEquals(txFake, "Deposit Tx Not Found");
});

Deno.test("Withdraw", async () => {
  const tx = await withdraw(utxo);
  console.log(`Withdraw Transaction: ${tx}`);
  assertMatch(tx, regex);
});
