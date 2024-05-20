import { PublicKey } from "@solana/web3.js";

// https://docs.raydium.io/raydium/protocol/developers/addresses
type DevnetRaydiumProgramIds = {
  // (CP-Swap, New)
  Standard_AMM: PublicKey;
  OpenBook_AMM: PublicKey;
  Stable_Swap_AMM: PublicKey;
  // (CLMM)
  Concentrated_Liquidity: PublicKey;
  AMM_Routing: PublicKey;
  Staking: PublicKey;
  Farm_Staking: PublicKey;
};

type MainnetRaydiumProgramIds = DevnetRaydiumProgramIds & {
  Ecosystem_Farms: PublicKey;
  AcceleRaytor: PublicKey;
};

type RaydiumProgramIds = {
  devnet: DevnetRaydiumProgramIds;
  mainnet: MainnetRaydiumProgramIds;
};

export const RAYDIUM_PROGRAM_IDS: RaydiumProgramIds = {
  devnet: {
    Standard_AMM: new PublicKey("CPMDWBwJDtYax9qW7AyRuVC19Cc4L4Vcy4n2BHAbHkCW"),
    OpenBook_AMM: new PublicKey("HWy1jotHpo6UqeQxx49dpYYdQB8wj9Qk9MdxwjLvDHB8"),
    Stable_Swap_AMM: new PublicKey(
      "DDg4VmQaJV9ogWce7LpcjBA9bv22wRp5uaTPa5pGjijF"
    ),
    Concentrated_Liquidity: new PublicKey(
      "devi51mZmdwUJGU9hjN27vEz64Gps7uUefqxg27EAtH"
    ),
    Staking: new PublicKey("85BFyr98MbCUU9MVTEgzx1nbhWACbJqLzho6zd6DZcWL"),
    Farm_Staking: new PublicKey("EcLzTrNg9V7qhcdyXDe2qjtPkiGzDM2UbdRaeaadU5r2"),
    AMM_Routing: new PublicKey("BVChZ3XFEwTMUk1o9i3HAf91H6mFxSwa5X2wFAWhYPhU"),
  },
  mainnet: {
    Standard_AMM: new PublicKey("CPMMoo8L3F4NbTegBCKVNunggL7H1ZpdTHKxQB5qKP1C"),
    OpenBook_AMM: new PublicKey("675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8"),
    Stable_Swap_AMM: new PublicKey(
      "5quBtoiQqxF9Jv6KYKctB59NT3gtJD2Y65kdnB1Uev3h"
    ),
    Concentrated_Liquidity: new PublicKey(
      "CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK"
    ),
    AMM_Routing: new PublicKey("routeUGWgWzqBWFcrCfv8tritsqukccJPu3q5GPP3xS"),
    Staking: new PublicKey("EhhTKczWMGQt46ynNeRX1WfeagwwJd7ufHvCDjRxjo5Q"),
    Farm_Staking: new PublicKey("9KEPoZmtHUrBbhWN1v1KWLMkkvwY6WLtAVUCPRtRjP4z"),
    Ecosystem_Farms: new PublicKey(
      "FarmqiPv5eAj3j1GMdMCMUGXqPUvmquZtMy86QH6rzhG"
    ),
    AcceleRaytor: new PublicKey("9HzJyW1qZsEiSfMUf6L2jo3CcTKAyBmSyKdwQeYisHrC"),
  },
};
