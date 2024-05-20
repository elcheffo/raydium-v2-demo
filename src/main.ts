import BN from "bn.js";
import { PublicKey } from "@solana/web3.js";
import { createCpmmPool } from "./createCpmmPool";
import { createRaydiumClient } from "./createRaydiumClient";

import { createWrappedNativeAccount } from "@solana/spl-token";
import { connection, owner } from "./config";

async function wrapSol() {
  const result = await createWrappedNativeAccount(
    connection,
    owner,
    owner.publicKey,
    100
  );
  console.log("[info] Wrapped SOL", result);
}

async function main() {
  await wrapSol();
  const raydium = await createRaydiumClient();
  console.log("[info] Raydium client created");

  // check token list here: https://api-v3.raydium.io/mint/list
  const SOL = new PublicKey("So11111111111111111111111111111111111111112");
  const USDC = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");

  // Create a new AMM pool (CPMM)
  const results = await createCpmmPool({
    raydium,
    mintA: {
      mint: SOL,
      amount: new BN(100),
    },
    mintB: {
      mint: USDC,
      amount: new BN(100),
    },
  });

  console.log("[info] CPMM Pool created", results);
}

main().catch(console.error);
