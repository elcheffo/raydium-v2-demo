import BN from "bn.js";
import { PublicKey } from "@solana/web3.js";
import { createCpmmPool } from "./createCpmmPool";
import { createRaydiumClient } from "./createRaydiumClient";

import {
  createWrappedNativeAccount,
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from "@solana/spl-token";
import { connection, owner } from "./config";

async function wrapSol(args: { amount: BN }) {
  const result = await createWrappedNativeAccount(
    connection,
    owner,
    owner.publicKey,
    args.amount.toNumber()
  );
  console.log("[info] Wrapped SOL", result);
}

async function createExampleSplToken(args: {
  amount: number;
  decimals: number;
}) {
  // Create a new SPL token
  const mint = await createMint(connection, owner, owner.publicKey, null, args.decimals);
  console.log("[info] Token created", {
    mint: mint.toBase58(),
    decimals: args.decimals,
  });

  // Create an ATA
  const ata = await getOrCreateAssociatedTokenAccount(
    connection,
    owner,
    mint,
    owner.publicKey
  );

  console.log(`[info] Crated token ata is:`, {
    ata: ata.address.toBase58(),
  });

  // Mint to ATA
  const mintAmount = new BN(args.amount).mul(new BN(args.decimals))
  const mintSignature = await mintTo(
    connection,
    owner,
    mint,
    ata.address,
    owner,
    mintAmount
  );

  console.log(`[info] New token minted:`, {
    mint: mint.toBase58(),
    amount: mintAmount.toNumber(),
    signature: mintSignature,
  });

  return {
    mint,
    ata,
  };
}

async function ensureATAExists(mint: PublicKey) {
  console.log('[info] Ensuring ATA exists', { mint: mint.toBase58() });
  const ata = await getOrCreateAssociatedTokenAccount(
    connection,
    owner,
    mint,
    owner.publicKey
  );
  console.log('[info] Ensuring ATA exists results', {
    mint: mint.toBase58(),
    ata: ata.address.toBase58(),
  });
}

async function main() {
  // await wrapSol({ amount: new BN(100) });
  const raydium = await createRaydiumClient();

  console.log("[info] Raydium client created");

  const { mint: mintA } = await createExampleSplToken({
    amount: 100_000_000,
    decimals: 6,
  })

  const { mint: mintB } = await createExampleSplToken({
    amount: 100_000_000,
    decimals: 6,
  })

  // check token list here: https://api-v3.raydium.io/mint/list
  // const WSOL = new PublicKey("So11111111111111111111111111111111111111112");

  // /**
  //  * devnet USDC
  //  * 4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU
  //  */

  // /**
  //  * mainnet USDC
  //  * EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
  //  */
  // const USDC = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU");

  // await ensureATAExists(WSOL);
  // await ensureATAExists(USDC);

  // Create a new AMM pool (CPMM)
  const results = await createCpmmPool({
    raydium,
    mintA: {
      mint: mintA,
      amount: new BN(100),
    },
    mintB: {
      mint: mintB,
      amount: new BN(100),
    },
  });

  console.log("[info] CPMM Pool created", results);
}

main().catch(console.error);
