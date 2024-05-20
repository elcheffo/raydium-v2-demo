import "dotenv/config";

import { Connection, Keypair } from "@solana/web3.js";
import { Cluster, TxVersion } from "@raydium-io/raydium-sdk-v2";

export const cluster = process.env.RAYDIUM_CLUSTER! as Cluster;
export const connection = new Connection(process.env.RPC_URL!);

// Keypair.fromSecretKey(bs58.decode('<YOUR_WALLET_SECRET_KEY>'))

export const owner = Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(process.env.PRIVATE_KEY!))
);

console.log('[info] owner', owner.publicKey.toBase58())

export const txVersion = TxVersion.V0; // or TxVersion.LEGACY
