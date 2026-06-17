import { Keypair } from "@stellar/stellar-sdk";

const network = process.env.NEXT_PUBLIC_STELLAR_NETWORK || "testnet";
const isPublic = network === "public";

export const stellar = {
  network,
  networkPassphrase: isPublic
    ? "Public Global Stellar Network ; September 2015"
    : "Test SDF Network ; September 2015",
  horizonUrl: isPublic
    ? "https://horizon.stellar.org"
    : "https://horizon-testnet.stellar.org",
};

export function validateStellarAddress(address: string): boolean {
  try {
    Keypair.fromPublicKey(address);
    return true;
  } catch {
    return false;
  }
}

export function formatAmount(amount: number | string, decimals = 7): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return num.toFixed(decimals).replace(/\.?0+$/, "");
}

export const USDC_CODE = "USDC";
export const USDC_ISSUER = "GBBD47UZQ5SMAZX5VK6MKBQNRYPKH376I6BGZ4SHAMEZVXC6YCKCCTVL"; // testnet issuer
