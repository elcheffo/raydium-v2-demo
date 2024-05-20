import { LogLevel, Raydium, setLoggerLevel } from "@raydium-io/raydium-sdk-v2";
import { cluster, connection, owner } from "./config";

export async function createRaydiumClient() {
  setLoggerLevel("Common.Api", LogLevel.Debug);
  // https://www.npmjs.com/package/@raydium-io/raydium-sdk-v2
  // https://github.com/raydium-io/raydium-sdk-V2-demo/blob/master/src/config.ts.template
  const raydium = await Raydium.load({
    connection,
    owner, // key pair or publicKey
    cluster,
    disableFeatureCheck: true,
    disableLoadToken: false,
    // signAllTransactions, // optional - provide sign functions provided by @solana/wallet-adapter-react
    // tokenAccounts, // optional, if dapp handle it by self can provide to sdk
    // tokenAccountRowInfos // optional, if dapp handle it by self can provide to sdk
  });
  return raydium;
}
