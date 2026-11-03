---
cmsId: 6
question: Why UTXO?
answer: |-
  UTXO (or Unspent-Transaction Output) has many advantages over the account-based model used by Ethereum. It provides superior:<br/>
  
  - **Privacy**, as UTXOs are one-time objects, makes it possible to formalise privacy leaks.
  - **Scalability**, as parallel transaction processing is more straightforward in UTXO. UTXOs are also more friendly to known stateless client solutions.
  - **Interoperability**, as off-chain and sidechain protocols. One-time objects are more straightforward to work with from an off-chain point of view.
  - **Transaction Cost Predictability**, where the only on-chain action is validating the smart contracts. As a result, the transaction cost is significantly lower, and most importantly, the transaction cost is predictable, eliminating the need for ‘gas.’
  - Ergo uses the `extended-UTXO model`, which implies UTXOs with the ability to contain arbitrary data and sophisticated scripts.  
  <br/>
  Ergo extends Bitcoin's way of writing contracts by attaching a guard script (together with additional custom data) to every coin. In addition to the regular protection offered by an ` m‐of‐n` signature, Ergo allows specifying the possible recipients of these coins, which may be another contract with similar complex conditions. This "chaining" approach allows the implementation of secure and efficient contracts of arbitrary complexity.
order: 6
---
