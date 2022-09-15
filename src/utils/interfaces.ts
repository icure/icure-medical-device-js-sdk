import {Patient} from "../models/Patient";

export  interface SharingStatus {
  success: boolean | null;
  error: Error | null;
  modified: number | null;
}

export interface SharingResult {
  patient: Patient | undefined
  statuses: {
    dataSamples: SharingStatus | undefined,
    healthcareElements: SharingStatus | undefined,
    patient: SharingStatus | undefined
  }
}
