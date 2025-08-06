import { v4 as uuidv4 } from "uuid";

import { pickOne } from "./array";
import { formatAmount, randInt } from "./number";
import { hexString } from "./string";

/** Allowed values for the row type */
export type RowType = "add" | "remove";

/** Shape of a leaderboard table row */
export interface LeaderboardRow {
  /** Random UUID-v4 ID */
  id: string;
  /** 32‑character random hex string (derived from a UUID) */
  account: string;
  /** Unix‑epoch milliseconds when the row was created */
  timestamp: number;
  /** “add” or “remove” */
  type: RowType;
  amount: string;
}

/**
 * Factory that returns a fresh LeaderboardRow.
 *
 * @returns a new LeaderboardRow object
 */
export function createLeaderboardRow(time?: number): LeaderboardRow {
  const account = "0x" + hexString(40)
  const type = pickOne(["add", "remove"] as const)!;
  const timestamp = (time ? time : Date.now()) - 1000;

  return {
    id: uuidv4(),
    account,
    timestamp,
    type,
    amount: formatAmount(randInt(10, 30000))
  };
}