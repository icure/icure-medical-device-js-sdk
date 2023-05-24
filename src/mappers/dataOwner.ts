import { DataOwnerWithType as DataOwnerWithTypeDto, Patient as PatientDto } from '@icure/api'
import { DataOwnerTypeEnum as DataOwnerTypeEnumDto } from '@icure/api/icc-api/model/DataOwnerTypeEnum'
import { DataOwnerTypeEnum, DataOwnerWithType } from '../models/DataOwner'
import { PatientMapper } from './patient'
import { MedicalDeviceMapper } from './medicalDevice'
import { HealthcareProfessionalMapper } from './healthcareProfessional'

export namespace DataOwnerMapper {
  export function toDataOwnerWithType(dto: DataOwnerWithTypeDto): DataOwnerWithType {
    if (dto.type == DataOwnerTypeEnumDto.Patient) {
      return {
        type: DataOwnerTypeEnum.Patient,
        dataOwner: PatientMapper.toEncryptedPatient(dto.dataOwner)!,
      }
    } else if (dto.type == DataOwnerTypeEnumDto.Device) {
      return {
        type: DataOwnerTypeEnum.MedicalDevice,
        dataOwner: MedicalDeviceMapper.toMedicalDevice(dto.dataOwner),
      }
    } else if (dto.type == DataOwnerTypeEnumDto.Hcp) {
      return {
        type: DataOwnerTypeEnum.HealthcareProfessional,
        dataOwner: HealthcareProfessionalMapper.toHealthcareProfessional(dto.dataOwner),
      }
    } else throw new Error(`Unexpected data owner ${JSON.stringify(dto)}`)
  }

  export async function toDataOwnerWithTypeDecryptingPatient(
    dto: DataOwnerWithTypeDto,
    tryDecryptPatient: (patient: PatientDto) => Promise<{ entity: PatientDto; decrypted: boolean }>
  ): Promise<DataOwnerWithType> {
    if (dto.type == DataOwnerTypeEnumDto.Patient) {
      const decryptionInfo = await tryDecryptPatient(dto.dataOwner)
      return {
        type: DataOwnerTypeEnum.Patient,
        dataOwner: decryptionInfo.decrypted
          ? PatientMapper.toPatient(decryptionInfo.entity)!
          : PatientMapper.toEncryptedPatient(decryptionInfo.entity)!,
      }
    } else return toDataOwnerWithType(dto)
  }

  export function toDataOwnerType(dto: DataOwnerTypeEnumDto): DataOwnerTypeEnum {
    if (dto == DataOwnerTypeEnumDto.Patient) {
      return DataOwnerTypeEnum.Patient
    } else if (dto == DataOwnerTypeEnumDto.Device) {
      return DataOwnerTypeEnum.MedicalDevice
    } else if (dto == DataOwnerTypeEnumDto.Hcp) {
      return DataOwnerTypeEnum.HealthcareProfessional
    } else throw new Error(`Unexpected data owner type ${dto}`)
  }
}
