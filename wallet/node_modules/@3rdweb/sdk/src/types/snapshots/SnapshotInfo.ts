import { Snapshot } from "./Snapshot";

export interface SnapshotInfo {
  merkleRoot: string;
  snapshotUri: string;
  snapshot: Snapshot;
}
