use aiken/transaction.{ScriptContext, Spend}
use aiken/transaction/credential.{VerificationKey}
use aiken/hash.{Blake2b_224, Hash}
use aiken/list

type Datum {
  depositor: Hash<Blake2b_224, VerificationKey>,
}//declared Datum types

validator{
    fn  validate(datum: Datum, _redeemer: Void, context: ScriptContext) -> Bool{

    when context.purpose is {
      Spend(_) -> list.has(context.transaction.extra_signatories, datum.depositor) // checking the depositor's verification key
      _ -> error @"You're not depositor"
    }

    }
}