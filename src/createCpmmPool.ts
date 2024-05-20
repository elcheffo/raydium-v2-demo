import BN from "bn.js";
import { PublicKey } from "@solana/web3.js";
import {
  CREATE_CPMM_POOL_FEE_ACC,
  CREATE_CPMM_POOL_PROGRAM,
  Raydium,
} from "@raydium-io/raydium-sdk-v2";

import { RAYDIUM_PROGRAM_IDS } from "./constants/raydiumProgramIds";
import { cluster, txVersion } from "./config";

// https://github.com/raydium-io/raydium-sdk-V2-demo/blob/master/src/cpmm/createCpmmPool.ts

type CreatePoolPairItem = {
  mint: PublicKey;
  amount: BN;
};

export const createCpmmPool = async (inputs: {
  raydium: Raydium;
  mintA: CreatePoolPairItem;
  mintB: CreatePoolPairItem;
}) => {
  const { raydium } = inputs;

  const mintA = await raydium.token.getTokenInfo(inputs.mintA.mint);
  const mintB = await raydium.token.getTokenInfo(inputs.mintB.mint);

  console.log("[info] program id", {
    cluster,
  });

  const { execute, extInfo, ...rest } = await raydium.cpmm.createPool({
    programId: CREATE_CPMM_POOL_PROGRAM,
    poolFeeAccount: CREATE_CPMM_POOL_FEE_ACC,
    mintA,
    mintB,
    mintAAmount: inputs.mintA.amount,
    mintBAmount: inputs.mintB.amount,
    checkCreateATAOwner: true,
    startTime: new BN(0),
    associatedOnly: false,
    ownerInfo: {
      useSOLBalance: true,
    },
    txVersion,
  });

  console.log("[info] create pool tx", {
    execute,
    extInfo,
    rest,
  });

  const { txId } = await execute();

  return {
    signature: txId,
    info: extInfo,
  };
};
