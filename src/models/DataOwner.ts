import { PotentiallyEncryptedPatient } from './Patient'
import { HealthcareProfessional } from './HealthcareProfessional'
import { MedicalDevice } from './MedicalDevice'

export enum DataOwnerTypeEnum {
  Patient = 'Patient',
  HealthcareProfessional = 'HealthcareProfessional',
  MedicalDevice = 'MedicalDevice',
}
export type DataOwner = PotentiallyEncryptedPatient | HealthcareProfessional | MedicalDevice
export type DataOwnerWithType =
  | { type: DataOwnerTypeEnum.Patient; dataOwner: PotentiallyEncryptedPatient }
  | { type: DataOwnerTypeEnum.HealthcareProfessional; dataOwner: HealthcareProfessional }
  | { type: DataOwnerTypeEnum.MedicalDevice; dataOwner: MedicalDevice }
