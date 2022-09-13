import {Patient} from "../models/Patient";
export  interface SharingStatus {
  success: boolean | null;
  error: Error | null;
  modified: number | null;
}

export interface SharingResult {
  patient: Patient | undefined
  statuses: {
    contacts: SharingStatus | undefined,
    forms: SharingStatus | undefined,
    healthElements: SharingStatus | undefined,
    invoices: SharingStatus | undefined,
    documents: SharingStatus | undefined,
    classifications: SharingStatus | undefined,
    calendarItems: SharingStatus | undefined,
    patient: SharingStatus | undefined
  }
}
