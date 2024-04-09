import { assertMatch } from "https://deno.land/std@0.221.0/assert/mod.ts";
import { depositTX } from "./Deposit.ts";

const regex = /^[\da-f]{64}$/;

Deno.test("Deposit", async () => {
  const tx = await depositTX();
  console.log("Deposit Transaction: ", tx)
  assertMatch(tx, regex);
});
